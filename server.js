require('dotenv').config();
const app = require('./src/app');
const connectDB = require('./src/db/mongo');

const PORT = process.env.PORT || 4000;

(async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`);
  });
})();