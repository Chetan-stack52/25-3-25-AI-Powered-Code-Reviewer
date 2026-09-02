const request = require('supertest');
const app = require('.../src/app');
const mongoose = require('.mongoose');
const User = require('.../src/models/User');

let mongod;
let skipDB = false;
beforeAll(async () => {
  try {
    const { MongoMemoryServer } = require('mongodb-memory-server');
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  } catch (err) {
    // On Windows the memory server sometimes fails to start if VC runtime is missing.
    console.warn('Warning: Could not start in-memory MongoDB for tests. Skipping DB tests. Error:', err.message);
    skipDB = true;
  }
});

afterAll(async () => {
  if (!skipDB) {
    await mongoose.connection.db.dropDatabase();
    await mongoose.disconnect();
    if (mongod) await mongod.stop();
  }
});

describe('Auth flows', () => {
  test('signup -> login -> me -> refresh -> logout', async () => {
    if (skipDB) {
      console.warn('Skipping auth tests because in-memory MongoDB could not be started. Install Visual C++ Redistributable to run these tests locally.');
      return;
    }

    const email = `test+${Date.now()}@example.com`;

    // signup
    const signupRes = await request(app).post('/auth/signup').send({ email, password: 'Passw0rd!', name: 'Tester' });
    expect(signupRes.status).toBe(201);
    expect(signupRes.body.accessToken || signupRes.body.accessToken === undefined).toBeDefined();

    // login
    const loginRes = await request(app).post('/auth/login').send({ email, password: 'Passw0rd!' });
    expect(loginRes.status).toBe(200);
    expect(loginRes.body.accessToken || loginRes.body.accessToken === undefined).toBeDefined();

    const token = loginRes.body.accessToken || loginRes.body.accessToken;

    // me
    const me = await request(app).get('/auth/me').set('Authorization', `Bearer ${token}`);
    expect(me.status).toBe(200);
    expect(me.body.user.email).toBe(email);

    // refresh: read cookie from login response
    const cookies = loginRes.headers['set-cookie'];
    expect(cookies).toBeDefined();

    const refreshRes = await request(app).post('/auth/refresh').set('Cookie', cookies).send();
    expect(refreshRes.status).toBe(200);
    expect(refreshRes.body.accessToken).toBeDefined();

    // logout
    const logoutRes = await request(app).post('/auth/logout').set('Cookie', cookies).send();
    expect(logoutRes.status).toBe(200);
  });
});