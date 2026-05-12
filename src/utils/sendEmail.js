import nodemailer from "nodemailer";
import config from "../config/index.js";

export const sendEmail = async ({ to, subject, html }) => {
  const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false,
    auth: {
      user: config.BrevoStempLogin,
      pass: config.BrevoStempKey,
    },
  });

  await transporter.sendMail({
    from: `"${config.EmailFromName}" <${config.EmailFrom}>`,
    to,
    subject,
    html,
  });
};
