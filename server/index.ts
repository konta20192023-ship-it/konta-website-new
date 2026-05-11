import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import nodemailer from "nodemailer";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);

  app.use(express.json());

  // Contact Form API
  app.post("/api/contact", async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "All fields are required." });
    }

    try {
      const emailUser = process.env.EMAIL_USER || "konta20192023@gmail.com";
      const emailPass = process.env.EMAIL_PASS;

      if (!emailPass) {
        console.error("EMAIL_PASS is not set in environment variables.");
        return res.status(500).json({ error: "Server configuration error: Mail credentials missing." });
      }

      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
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
        to: process.env.CONTACT_RECEIVER || "konta20192023@gmail.com",
        replyTo: email,
        subject: `[문의접수] ${name}님 - KONTA Website`,
        text: `신규 문의가 접수되었습니다.\n\n이름: ${name}\n이메일: ${email}\n내용:\n${message}\n\n(발송시각: ${new Date().toLocaleString("ko-KR", { timeZone: "Asia/Tokyo" })})`,
      };

      await transporter.sendMail(mailOptions);
      await transporter.sendMail({
        from: emailUser,
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
      console.log(`Email sent from ${email}`);

      res.status(200).json({ success: true });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ error: "Failed to send inquiry." });
    }
  });

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.static(staticPath));

  // Handle client-side routing - serve index.html for all routes
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);

