import express from "express";
import { generateChat } from "../controller/chat.js";

const router = express.Router();

router.route("/giverespone").post(generateChat);

export default router;