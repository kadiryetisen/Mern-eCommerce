const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'localhost',
  port: 8587,
  tls: {
    rejectUnauthorized: false,
  },
});

exports.sendTestMail = async (email, activationToken) => {
  await transporter.sendMail({
    from: 'My app <info@YETİŞENLER.com>',
    to: email,
    subject: 'Account Activation',
    html: `Token is ${activationToken}`,
  });
};
