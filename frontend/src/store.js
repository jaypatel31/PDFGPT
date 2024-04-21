import { configureStore } from "@reduxjs/toolkit";
import pdfUploadReducer from "./stateSlice/pdfUploadSlice";
import chatReducer from "./stateSlice/chatSlice";

export default configureStore({
    reducer: {
        pdf:pdfUploadReducer,
        chat: chatReducer
    },
});