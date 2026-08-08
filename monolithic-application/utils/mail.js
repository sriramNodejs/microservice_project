const nodemailer = require("nodemailer");
const ejs = require("ejs");
const fs = require("fs/promises");
const path = require("path");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const compileTemplate = async (templateName, data) => {
  const filePath = path.join(__dirname, "mailTemplates", `${templateName}.ejs`);
  const compiledTemplate = await ejs.renderFile(filePath, data, {
    cache: true,
  });

  return compiledTemplate;
};

const sendMail = async ({ to, subject, templateName, data }) => {
  const template = await compileTemplate(templateName, data);

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    html: template,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error("error in mail sending", err);
      return;
    }

    console.log("email sent successfully");
    console.log("message id ", info.messageId);
  });
};

/*

sendMail({
        to: email,
        subject: 'Welcome to our application',
        // text: 'Welcome to our application',
        html: `<!DOCTYPE html>
                    <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>Document</title>
                    </head>
                    <body>
                        <h1 style="color: red;">this is from HTML</h1>
                        <h2 style="color: blue;">From Nodemailer NPM</h2>
                        <h3 style="color: rgb(169, 17, 206);">From Gmail SMTP</h3>
                        <h1 style="color: aqua;">Hello ${name}</h1>
                    </body>
                    </html>`
    })

*/

module.exports = {
  sendMail,
};
