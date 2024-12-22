import { Router } from "express";
import { receivedMessage, verifyToken } from "./whatsapp.controller.js";

const router = Router();

router.get("/", verifyToken);
router.post("/", receivedMessage);
export default router;
