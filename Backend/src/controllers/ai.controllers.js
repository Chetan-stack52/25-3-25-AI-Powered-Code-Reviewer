const aiService = require('../services/ai.service');

module.exports.getReview = async (req, res) => {
  try {
    const code = req.body.code;
    if (!code) {
      return res.status(400).send('code is required');
    }

    const response = await aiService(code);
    res.send(response);
  } catch (err) {
    console.error('AI review error:', err);
    res.status(500).send({ error: 'Failed to get review', details: err.message });
  }
};

