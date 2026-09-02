const Razorpay = require('razorpay');

let instance = null;
if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
  instance = new Razorpay({ key_id: process.env.RAZORPAY_KEY_ID, key_secret: process.env.RAZORPAY_KEY_SECRET });
}

module.exports = {
  createSubscription: async (opts) => {
    if (!instance) throw new Error('Razorpay not configured');
    return instance.subscriptions.create(opts);
  },
  createOrder: async ({ amount, currency = 'INR', receipt = undefined, notes = {} }) => {
    if (!instance) {
      // Dev fallback: return mock order
      return {
        id: `order_mock_${Date.now()}`,
        amount,
        currency,
        receipt,
        notes,
        status: 'created',
      };
    }
    return instance.orders.create({ amount, currency, receipt, notes });
  },
  // Verify signatures for webhooks and payment confirmations
  verifySignature: (payload, signature) => {
    // payload should be a string (raw body) or JSON object
    const secret = process.env.RAZORPAY_KEY_SECRET;
    if (!secret) return false;

    const crypto = require('crypto');
    const body = typeof payload === 'string' ? payload : JSON.stringify(payload);
    const expected = crypto.createHmac('sha256', secret).update(body).digest('hex');
    return expected === signature;
  },
  verifyWebhook: (payload, signature) => {
    // For now, use verifySignature as a generic check (webhook secret may differ in Razorpay setup)
    return module.exports.verifySignature(payload, signature);
  }
};