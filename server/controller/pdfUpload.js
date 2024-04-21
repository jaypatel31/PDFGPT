import path from "node:path"
import {RecursiveCharacterTextSplitter} from "langchain/text_splitter"
import {PDFLoader} from 'langchain/document_loaders/fs/pdf'
import { HNSWLib } from "@langchain/community/vectorstores/hnswlib";
import {OpenAIEmbeddings} from "@langchain/openai"


export const pdfFileUpload = async (req, res, next) => {

    const rootDir = path.resolve(process.cwd());
    
    const newpath = rootDir+"/files/";
    const file = req.files.file;
    const filename = file.name;
    
    // Saving File
    file.mv(`${newpath}${filename}`, async (err) => {
      if (err) {
        console.error(err);
        const error = new Error(err);
        error.status = 500;
        next(error);
        return;
      }
        const loader = new PDFLoader(`${newpath}${filename}`)
        const rawDocs = await loader.load()

        //  Text splitting and tokenization
        const text_splitter = new RecursiveCharacterTextSplitter({
            chunkSize: 1000,
            chunkOverlap: 200
        })

        const docs = await text_splitter.splitDocuments(rawDocs)
        
        const vectorStores = await HNSWLib.fromDocuments(docs,new OpenAIEmbeddings({model:"text-embedding-3-small"}))
        await vectorStores.save('data')
        res.status(200).json({
            message: "File Uploaded Successfully",
            data: filename
        });
    });
}