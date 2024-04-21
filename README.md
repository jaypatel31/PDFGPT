# 💬 PDFGPT

PDFGPT is a ChatGPT-like application that allows users to upload their PDF documents and ask relevant questions about the content. It leverages the power of natural language processing and information retrieval techniques to provide accurate and contextual responses.

## Features

- **PDF Upload**: Users can upload their PDF files, including large documents.
- **Conversational Interface**: The application provides a conversational interface where users can ask questions and receive responses based on the uploaded PDF content.
- **Context Awareness**: PDFGPT takes into consideration the previous chat history to provide more relevant and contextual answers.
- **Retrieval Augmented Generation (RAG) Technique**: The application uses the RAG technique to extract relevant information from the PDF documents based on the user's question [code](https://github.com/jaypatel31/PDFGPT/blob/0313849fe22d9ab891c33574accee62415afc206/server/controller/chat.js#L57-L61).

## PDFGPT Architecture

### PDF Processing

When a user uploads a PDF file, the application first uses the `PDFLoader` from LangChain to parse the file and extract its content. The content is then split into smaller chunks of data for efficient processing. Then the application creates a vector store (HNSWLib) from the chunked documents (docs). The OpenAIEmbeddings model is used to generate embeddings for each document chunk, which are then stored in the vector store. The vector store is saved locally as 'data' for future use.

### Question Answering

When a user initiates a chat session and poses a question, the application employs the RunnableSequence from LangChain to orchestrate the question-answering process. The RunnableSequence is a chain of steps that includes accepting the user's question and optional chat history as inputs. Subsequently, the Retrieval Augmented Generation (RAG) technique is utilized to retrieve relevant documents from the vector store based on the user's question. The retriever.getRelevantDocuments function retrieves these relevant documents, which are then formatted as a string.

A question prompt is then employed to format the question and context for the language model. The OpenAI language model (chatgpt-3.5-turbo) is utilized to generate a response based on the question and context. Finally, the generated response is parsed and returned as a string.

The chain.invoke function executes this sequence, passing the user's question and chat history as inputs. The resulting response and updated chat history are then sent back to the client.

This architecture leverages LangChain's capabilities for document processing, vector storage, context retrieval, and language model integration. The RAG technique ensures that the language model generates responses based on the most relevant information from the uploaded PDF documents, while taking into account the conversation history for context-aware responses.

## Tech Stack

 - ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
 - ![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
 - ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
 - ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
 - ![OpenAI](https://img.shields.io/badge/OpenAI-412991.svg?style=for-the-badge&logo=OpenAI&logoColor=white)
 - [🦜️🔗 LangChain](https://js.langchain.com/docs/get_started/introduction)

## Online Demo

You can try out PDFGPT online at [https://pdfchatinfinitus.netlify.app](https://pdfchatinfinitus.netlify.app). <br/>
**IMP Note**: As this is hosted on free tier backend service the sever get's turned off after 50 seconds of inactivity so first request might fail or take longer amount of time to load.

## ScreenShots
<img width="1840" alt="Screenshot 2024-04-20 at 10 42 58 PM" src="https://github.com/jaypatel31/PDFGPT/assets/59785863/6daa2ac0-c6c4-4ba4-9d4f-4e42183e48d0">
<img width="1840" alt="Screenshot 2024-04-20 at 10 45 05 PM" src="https://github.com/jaypatel31/PDFGPT/assets/59785863/d91e17b6-ae3a-4e33-aa0f-f021accb0fd3">
<img width="1840" alt="Screenshot 2024-04-20 at 10 46 18 PM" src="https://github.com/jaypatel31/PDFGPT/assets/59785863/259baadf-b660-4d65-828b-348be1ab5cd1">
<img width="1840" alt="Screenshot 2024-04-20 at 10 45 22 PM" src="https://github.com/jaypatel31/PDFGPT/assets/59785863/50ed27d7-773f-4306-b85c-568672bb6a0b">

## API Endpoints

If you want to use the PDFGPT API directly, you can make requests to the following endpoints:

### PDF Upload

**Path**: `https://pdfgpt-ud15.onrender.com/api/pdf/pdfupload` <br/>
**Request Type**: `POST`<br/>
**Description**: Upload a PDF file. <br/>
**Payload Type**: `Form Data` <br/>
**Payload**: 
```json
{
    "file": "binary File",
    "fileName": "String"
}
```

### Ask Question

**Path**: `https://pdfgpt-ud15.onrender.com/api/chat/giverespone` <br/>
**Request Type**: `POST` <br/>
**Description**: Interact with the model by asking questions. <br/>
**Payload Type**: `JSON` <br/>
**Payload**:
```json
{
    "question": "String",
    "chatHistory": "String (optional)"
}
```
## Local Setup

To set up PDFGPT locally, follow these steps:

1. Clone the repository: `git clone https://github.com/jaypatel31/PDFGPT.git`
2. Navigate to the project directory: `cd PDFGPT`

### Frontend Setup
1. Navigate to the frontend directory: `cd frontend`
```
npm install
npm start
```

### Backend Setup
1. Navigate to the server directory: `cd server`
2. Create a .env file and insert your `OPENAI_API_KEY`
```
npm install
npm start
```

Now you can interact with PDFGPT locally and enjoy the PDF question-answering experience.
