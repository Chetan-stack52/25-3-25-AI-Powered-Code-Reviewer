const express = require('express');
const aiRoutes = require('./routes/ai.routes');
const authRoutes = require('./routes/auth.routes');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

const app = express();

// CORS: allow frontend origin and credentials for cookies
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:5000', methods: ['GET', 'POST'], credentials: true }));
app.use(cookieParser());

// Health endpoint for DB and service checks
app.get('/', (req, res) => {
  const state = mongoose.connection.readyState; // 0 disconnected, 1 connected
  res.send({ status: 'ok', mongoReadyState: state });
});

app.use(express.json());

app.get('/', (req, res) => {
res.json('API is running....');
});

app.use('/auth', authRoutes);
app.use('/api/ai', aiRoutes);
app.use('/billing', require('./routes/billing.routes'));
app.use('/pilot', require('./routes/pilot.routes'));
app.use('/admin', require('./routes/admin.routes'));

// Informational warnings for missing third-party service keys
if (!process.env.MAILGUN_API_KEY || !process.env.MAILGUN_DOMAIN) {
  console.warn('Warning: Mailgun not configured. Emails will use console fallback. Set MAILGUN_API_KEY and MAILGUN_DOMAIN in .env to enable real emails.');
}
if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
  console.warn('Warning: Razorpay not configured. Billing features will be disabled until RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET are set.');
}

module.exports = app;