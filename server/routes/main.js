import express from "express";
import fileupload from 'express-fileupload'

import chatRoute from "./chat.js";
import pdfRoute from "./pdf.js";

const app = express();

// Chat Route
app.use("/chat", chatRoute);

app.use(fileupload());
app.use(express.static("files"));
//PDF Route
app.use("/pdf", pdfRoute);

export default app;
