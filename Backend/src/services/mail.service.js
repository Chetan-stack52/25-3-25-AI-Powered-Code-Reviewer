let mg;
if (process.env.MAILGUN_API_KEY && process.env.MAILGUN_DOMAIN) {
  const mailgun = require('mailgun-js');
  mg = mailgun({ apiKey: process.env.MAILGUN_API_KEY, domain: process.env.MAILGUN_DOMAIN });
}

async function sendEmail(to, subject, text, html) {
  if (mg) {
    const data = {
      from: `AI Reviewer <mailgun@${process.env.MAILGUN_DOMAIN}>`,
      to,
      subject,
      text,
      html,
    };
    return mg.messages().send(data);
  }
  // fallback for dev
  console.log('sendEmail fallback', { to, subject, text, html });
  return Promise.resolve();
}

module.exports = { sendEmail };
