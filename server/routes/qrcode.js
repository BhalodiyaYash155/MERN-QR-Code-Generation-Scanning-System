import express from "express";
import {
  createQRCode,
  getQRCodes,
  deleteQRCode,
  shareQRCode,
} from "../controllers/qrController.js";
import auth from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", auth, createQRCode);
router.get("/", auth, getQRCodes);
router.delete("/:id", auth, deleteQRCode);
router.post("/share", auth, shareQRCode);

export default router;
