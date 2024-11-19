import nodemailer from "nodemailer";

export const mailConfig = {
  transporter: nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  }),
  defaultMailOptions: {
    from: process.env.EMAIL_USER,
    to: process.env.RECIPIENT_EMAIL,
  },
};
