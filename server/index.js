import {RecursiveCharacterTextSplitter} from "langchain/text_splitter"
import {PDFLoader} from 'langchain/document_loaders/fs/pdf'
import { HNSWLib } from "@langchain/community/vectorstores/hnswlib";
import {OpenAIEmbeddings} from "@langchain/openai"
import { ChatOpenAI } from "@langchain/openai";
import {ConversationalRetrievalQAChain} from "langchain/chains"
import {SystemMessage} from "langchain/schema"
import { RunnableSequence } from "@langchain/core/runnables";
import { formatDocumentsAsString } from "langchain/util/document";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { PromptTemplate } from "@langchain/core/prompts";

import dotenv from "dotenv"
import promptSync from "prompt-sync"
import path from "node:path"

import express from "express"
import cors from "cors"
import router from "./routes/main.js"
import globalErrorHandler from "./middlewares/errorMiddleware.js"

dotenv.config()

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api", router);

app.use(globalErrorHandler);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Listening on Port ${PORT}`);
});