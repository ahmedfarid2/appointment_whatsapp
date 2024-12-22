import { Router } from "express";
import { handleIncomingMessages, verifyToken } from "./whatsapp.controller.js";

const router = Router();

router.get("/", verifyToken);
router.post("/", handleIncomingMessages);
export default router;
