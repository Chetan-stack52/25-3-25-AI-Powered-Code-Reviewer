const mailService = require('../services/mail.service');

module.exports.requestPilot = async (req, res) => {
  try {
    const { name, email, company, message } = req.body;
    const receiver = process.env.PILOT_RECEIVER_EMAIL || 'you@example.com';

    const subject = `Pilot request from ${name} (${company || 'no company'})`;
    const text = `Pilot request details:\n\nName: ${name}\nEmail: ${email}\nCompany: ${company}\nMessage: ${message || '(none)'}\n\nPlease follow up to schedule a demo.`;

    await mailService.sendEmail(receiver, subject, text);

    res.send({ success: true });
  } catch (err) {
    console.error('Pilot request error:', err);
    res.status(500).send({ error: err.message });
  }
};