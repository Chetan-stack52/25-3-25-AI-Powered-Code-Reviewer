const razorpayService = require('../services/razorpay.service');
const Subscription = require('../models/Subscription');

// Plans defined in INR paise (i.e., amount in paisa)
const PLANS = {
  free: { id: 'free', name: 'Free', amount: 0, currency: 'INR' },
  pro_monthly: { id: 'pro_monthly', name: 'Pro Monthly', amount: 99900, currency: 'INR' }, // ₹999.00
  pro_yearly: { id: 'pro_yearly', name: 'Pro Yearly', amount: 999000, currency: 'INR' }, // ₹9,990
  team_monthly: { id: 'team_monthly', name: 'Team Monthly', amount: 499900, currency: 'INR' }
};

module.exports.createOrder = async (req, res) => {
  try {
    const { planId } = req.body;
    const plan = PLANS[planId];
    if (!plan) return res.status(400).send({ error: 'Unknown plan' });

    if (plan.amount === 0) {
      return res.send({ order: null, plan });
    }

    const order = await razorpayService.createOrder({ amount: plan.amount, currency: plan.currency, receipt: `rcpt_${Date.now()}`, notes: { plan: plan.id } });

    // include public key id so client can use it with Razorpay checkout
    const key = process.env.RAZORPAY_KEY_ID || null;
    res.send({ order, plan, key });
  } catch (err) {
    console.error('Create order error:', err);
    res.status(500).send({ error: err.message });
  }
};

// Confirm payment called from client after Razorpay checkout handler
module.exports.confirmPayment = async (req, res) => {
  try {
    const { order_id, payment_id, signature, planId, userId, amount, currency } = req.body;

    // verify signature using Razorpay key secret
    // In dev, if the Razorpay secret is not set, accept confirmation for local testing
    let ok = false;
    if (!process.env.RAZORPAY_KEY_SECRET) {
      console.warn('Warning: RAZORPAY_KEY_SECRET not set — accepting payment confirmation in dev mode.');
      ok = true;
    } else {
      ok = razorpayService.verifySignature({ order_id, payment_id }, signature);
    }
    if (!ok) return res.status(400).send({ error: 'Invalid signature' });

    // create subscription record
    const subscription = await Subscription.create({
      userId: userId || null,
      planId,
      razorpayOrderId: order_id,
      razorpayPaymentId: payment_id,
      razorpaySignature: signature,
      amount: amount || null,
      currency: currency || 'INR',
      status: 'active',
      meta: { verifiedAt: new Date() }
    });

    res.send({ success: true, subscription });
  } catch (err) {
    console.error('Confirm payment error:', err);
    res.status(500).send({ error: err.message });
  }
};

// Webhook endpoint for Razorpay events
module.exports.webhook = async (req, res) => {
  try {
    const payload = req.body;
    const signature = req.headers['x-razorpay-signature'] || req.headers['x-razorpay-signature'.toLowerCase()];

    if (!razorpayService.verifyWebhook(payload, signature)) {
      console.warn('Webhook verification failed');
      return res.status(400).send('invalid signature');
    }

    const event = payload.event;
    // handle payment.captured or subscription.charged etc.
    if (event === 'payment.captured') {
      const payment = payload.payload.payment.entity;
      // find subscription by order id and mark payment
      await Subscription.create({
        planId: payment.notes?.plan || 'unknown',
        razorpayOrderId: payment.order_id,
        razorpayPaymentId: payment.id,
        amount: payment.amount,
        currency: payment.currency,
        status: 'active',
        meta: payment
      });
    }

    // acknowledge
    res.send({ status: 'ok' });
  } catch (err) {
    console.error('Webhook processing error:', err);
    res.status(500).send({ error: err.message });
  }
};