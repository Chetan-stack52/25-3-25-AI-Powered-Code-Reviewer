const request = require('supertest');
const app = require('../src/app');
const mongoose = require('mongoose');
const User = require('../src/models/User');

let mongod;
let skipDB = false;
beforeAll(async () => {
  try {
    const { MongoMemoryServer } = require('mongodb-memory-server');
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  } catch (err) {
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

describe('Billing and pilot', () => {
  let cookies;
  test('create-order (free) and pilot request', async () => {
    if (skipDB) {
      console.warn('Skipping billing tests because in-memory MongoDB could not be started.');
      return;
    }

    const email = `bill+${Date.now()}@example.com`;
    // create user
    await request(app).post('/auth/signup').send({ email, password: 'Passw0rd!', name: 'BillTester' });
    const loginRes = await request(app).post('/auth/login').send({ email, password: 'Passw0rd!' });
    cookies = loginRes.headers['set-cookie'];

    // create-order free
    const orderRes = await request(app).post('/billing/create-order').set('Cookie', cookies).send({ planId: 'free' });
    expect(orderRes.status).toBe(200);
    expect(orderRes.body.plan.id).toBe('free');

    // pilot request
    const pilotRes = await request(app).post('/pilot/request').send({ name: 'Pilot', email: 'pilot@example.com', company: 'ACME' });
    expect(pilotRes.status).toBe(200);
    expect(pilotRes.body.success).toBe(true);
  });

  test('create-order (paid) and confirm payment', async () => {
    if (skipDB) {
      console.warn('Skipping billing tests because in-memory MongoDB could not be started.');
      return;
    }

    // create user
    const email = `paid+${Date.now()}@example.com`;
    await request(app).post('/auth/signup').send({ email, password: 'Passw0rd!', name: 'PaidTester' });
    const loginRes = await request(app).post('/auth/login').send({ email, password: 'Passw0rd!' });
    const cookiesPaid = loginRes.headers['set-cookie'];

    // set a test secret so verifySignature works
    process.env.RAZORPAY_KEY_SECRET = 'testsecret'

    // create paid order
    const orderRes = await request(app).post('/billing/create-order').set('Cookie', cookiesPaid).send({ planId: 'pro_monthly' });
    expect(orderRes.status).toBe(200);
    const { order, plan } = orderRes.body;
    expect(order).toBeDefined();

    // simulate payment and signature
    const crypto = require('crypto');
    const payload = { order_id: order.id, payment_id: 'pay_mock_123' };
    const signature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET).update(JSON.stringify(payload)).digest('hex');

    const confirmRes = await request(app).post('/billing/confirm').set('Cookie', cookiesPaid).send({
      order_id: order.id,
      payment_id: payload.payment_id,
      signature,
      planId: plan.id,
      amount: order.amount,
      currency: order.currency
    });

    expect(confirmRes.status).toBe(200);
    expect(confirmRes.body.success).toBe(true);
    expect(confirmRes.body.subscription).toBeDefined();
    expect(confirmRes.body.subscription.planId).toBe(plan.id);
  });
});