import express from "express";

import { invokeServer, pdfFileUpload } from "../controller/pdfUpload.js";

const router = express.Router();

router.route("/pdfupload").post(pdfFileUpload);
router.route("/invoke").get(invokeServer);

export default router;