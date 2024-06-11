const nodemailer = require("nodemailer");
const sendgrid = require("nodemailer-sendgrid-transport");

module.exports = async (email, subject, text) => {
  try {
    const transport = nodemailer.createTransport(
      sendgrid({
        auth: {
          api_key:
            process.env.SENDGRID_API,
            email: 'altinmusahu6@gmail.com'
        },
      })
    );

    await transport.sendMail({
      from: "altinmusahu6@gmail.com",
      to: email,
      subject,
      html: `<p>Verification link: <strong>${text}<strong><p>`,
    });
    console.log("sent successfully");
  } catch (err) {
    console.log("Not sent!");
    console.error(err);
  }
};