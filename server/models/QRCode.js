import mongoose from "mongoose";

const qrCodeSchema = new mongoose.Schema({
  text: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  generatedAt: { type: Date, default: Date.now },
});

export default mongoose.model("QRCode", qrCodeSchema);
