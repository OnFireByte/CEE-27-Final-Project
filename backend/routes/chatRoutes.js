import { Router } from "express";
import * as chatController from "../controller/chatController.js";
import auth from "../middleware/auth.js";
const router = Router();

router.get("/:chat_id", auth, chatController.getChat);
router.get("/:chat_id/:timestamp", auth, chatController.getChatByTime);
router.post("/", auth, chatController.addMessage);

export default router;
