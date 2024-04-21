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
dotenv.config()

import promptSync from "prompt-sync"
import path from "node:path"


const formatChatHistory = (human, ai, previousChatHistory) => {
    const newInteraction = `Human: ${human}\nAI: ${ai}`;
    if (!previousChatHistory) {
      return newInteraction;
    }
    return `${previousChatHistory}\n\n${newInteraction}`;
  };

export const generateChat = async (req, res, next) => {

    // Model Define
    const llm  = new ChatOpenAI({model:"gpt-3.5-turbo"})
    const dir = path.resolve(process.cwd(), "data")

    // Load Data from Vector Store
    const vectorStores = await HNSWLib.load(dir, new OpenAIEmbeddings())
    const retriever = vectorStores.asRetriever();

    const question = req.body.question;

    const questionPrompt = PromptTemplate.fromTemplate(
        `Use the following pieces of context to answer the question at the end. If you don't know the answer, just say that you don't know, don't try to make up an answer.
        ----------------
        CONTEXT: {context}
        ----------------
        CHAT HISTORY: {chatHistory}
        ----------------
        QUESTION: {question}
        ----------------
        Helpful Answer:`
      );

    const chain = RunnableSequence.from([
        {
          question: (input) =>
            input.question,
          chatHistory: (input) =>
            input.chatHistory ?? "",
          context: async (input) => {
            // Using RAG to provide relevent context
            const relevantDocs = await retriever.getRelevantDocuments(input.question);
            const serialized = formatDocumentsAsString(relevantDocs);
            return serialized;
          },
        },
        questionPrompt,
        llm,
        new StringOutputParser(),
      ]);

    try{

        const resultOne = await chain.invoke({
            chatHistory:req.body.chatHistory,
            question: question,
          });
          
          res.status(200).json({resultOne,chatHistory:formatChatHistory(question,resultOne,req.body.chatHistory)})
    }catch(e){
        console.log(e)
        const err = new Error(e);
        err.status = 409;
        next(err);
        return;
    }
}