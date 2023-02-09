const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: "parth.limbad@mobiosolutions.com",
    subject: "This is Welcome mail from Node Task App",
    text: `Hello ${name} this is testtesttestesttest from Node Task App..!`,
  });
};

const sendCancallationEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: "parth.limbad@mobiosolutions.com",
    subject: "This is Cancellation mail from Node Task App",
    text: `Hello ${name} why are you cancalling the account. We would love to hear from you..!`,
  });
};

module.exports = {
  sendWelcomeEmail,
  sendCancallationEmail,
};
