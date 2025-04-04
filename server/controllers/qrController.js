import QRCode from "../models/QRCode.js";
import nodemailer from "nodemailer";

export const createQRCode = async (req, res) => {
  const { text } = req.body;
  const qrCode = new QRCode({ text, userId: req.user.id });
  await qrCode.save();
  res.json(qrCode);
};

export const getQRCodes = async (req, res) => {
  const { page = 1, limit = 5, startDate, endDate } = req.query;
  const query = { userId: req.user.id };

  if (startDate && endDate) {
    query.generatedAt = {
      $gte: new Date(startDate),
      $lte: new Date(endDate),
    };
  }

  const codes = await QRCode.find(query)
    .sort({ generatedAt: -1 })
    .limit(limit)
    .skip((page - 1) * limit);

  const total = await QRCode.countDocuments(query);

  res.json({ codes, total });
};

export const deleteQRCode = async (req, res) => {
  const { id } = req.params;
  await QRCode.findByIdAndDelete(id);
  res.json({ message: "Deleted" });
};

export const shareQRCode = async (req, res) => {
  const { to, subject, text, qrUrl } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_ID,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_ID,
    to,
    subject,
    html: `<p>${text}</p><img src="${qrUrl}" alt="QR Code" />`,
  });

  res.json({ message: "Email sent" });
};
