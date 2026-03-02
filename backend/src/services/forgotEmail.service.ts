import nodemailer from "nodemailer";

export const sendResetPasswordEmail = async (
  name: string,
  email: string,
  token: string
) => {

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Password Reset",
    html: `
      <p>Hello ${name}</p>
      <p>Reset Password:</p>
      <a href="${process.env.BASE_URL}/resetPassword?token=${token}">
      Reset Password
      </a>
    `
  });
};