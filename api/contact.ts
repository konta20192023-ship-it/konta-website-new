import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method Not Allowed' });
  }

  const { name, email, message } = request.body;

  if (!name || !email || !message) {
    return response.status(400).json({ error: 'All fields are required.' });
  }

  try {
    const emailUser = process.env.EMAIL_USER || 'konta20192023@gmail.com';
    const emailPass = process.env.EMAIL_PASS;

    if (!emailPass) {
      console.error('EMAIL_PASS is not set in environment variables.');
      return response.status(500).json({ error: 'Server configuration error: Mail credentials missing.' });
    }

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: emailUser,
        pass: emailPass,
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    const mailOptions = {
      from: emailUser,
      to: process.env.CONTACT_RECEIVER || 'konta20192023@gmail.com',
      replyTo: email,
      subject: `[문의접수] ${name}님 - KONTA Website`,
      text: `신규 문의가 접수되었습니다.\n\n이름: ${name}\n이메일: ${email}\n내용:\n${message}\n\n(발송시각: ${new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Tokyo' })})`,
    };

    await transporter.sendMail(mailOptions);

    console.log("customer email:", email);

    await transporter.sendMail({
      from: `"KONTA Website" <${emailUser}>`,
      to: email,
      subject: "お問い合わせありがとうございます",
      replyTo: process.env.CONTACT_RECEIVER || "konta20192023@gmail.com",
      text: `${name} 様

この度はお問い合わせいただき、誠にありがとうございます。

内容を確認のうえ、担当者より折り返しご連絡いたします。
今しばらくお待ちください。

--------------------------------
KONTA Website
Email: ${process.env.CONTACT_RECEIVER || "konta20192023@gmail.com"}
--------------------------------`
    });

    console.log("auto reply success");

    return response.status(200).json({ success: true });
  } catch (error) {
    console.error('Error sending email:', error);
    return response.status(500).json({ error: 'Failed to send inquiry.' });
  }
}
