import express from "express";
import nodemailer from "nodemailer";
import { db } from "../db.js";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

router.post("/", async (req, res) => {
  const { title, namalengkap, nomorhp, email, pesan } = req.body;

  const query = `
    INSERT INTO kontak_messages (title, namalengkap, nomorhp, email, pesan)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(query, [title, namalengkap, nomorhp, email, pesan], async (err) => {
    if (err) {
      console.error("❌ DB Error:", err);
      return res.status(500).json({ message: "Gagal menyimpan pesan." });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"${namalengkap}" <${email}>`,
      to: process.env.EMAIL_USER,
      subject: `Pesan dari ${namalengkap} (${title})`,
      text: `
Pesan: ${pesan}

Nama: ${namalengkap}
Nomor HP: ${nomorhp}
Email: ${email}
      `,
    };

    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: "Pesan berhasil dikirim dan disimpan!" });
    } catch (err) {
      console.error("❌ Email Error:", err);
      res.status(500).json({ message: "Pesan tersimpan, tapi gagal mengirim email." });
    }
  });
});

export default router;
