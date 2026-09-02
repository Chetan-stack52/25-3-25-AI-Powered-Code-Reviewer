const express = require('express');
const router = express.Router();
const billingController = require('../controllers/billing.controllers');
const { requireAuth } = require('../middleware/auth.middleware');

// create order requires authenticated user
router.post('/create-order', requireAuth, billingController.createOrder);
router.post('/confirm', requireAuth, billingController.confirmPayment);
// webhook from razorpay (raw body)
router.post('/webhook', express.raw({ type: '*/*' }), billingController.webhook);

module.exports = router;