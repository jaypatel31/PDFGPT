import express from "express";

import { pdfFileUpload } from "../controller/pdfUpload.js";

const router = express.Router();

router.route("/pdfupload").post(pdfFileUpload);

export default router;