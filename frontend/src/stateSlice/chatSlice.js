import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  chatStatus: "idle",
  chatInfo: null,
  chatError: null,
  chatHistory: null,
};

export const generateChat = createAsyncThunk(
    "chat/generateChat",
    async (payload , { rejectWithValue }) => {
      try {
        const { data } = await axios.post(`/api/chat/giverespone`, payload);
        return data;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  );


export const pdfUploadSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    resetChat(state, action) {
      state.chatError = null;
      state.chatInfo = null;
      state.chatStatus="idle"
    },
    resetStatus(state,action){
      state.chatStatus="idle"
    }
  },
  extraReducers: builder => {
    builder
      .addCase(generateChat.pending, (state) => {
        state.chatStatus = "loading";
        state.chatError = null;
      })
      .addCase(generateChat.fulfilled, (state, action) => {
        state.chatStatus = "succeeded";
        state.chatError = null;
        state.chatInfo = action.payload.resultOne;
        state.chatHistory = action.payload.chatHistory;
      })
      .addCase(generateChat.rejected, (state, action) => {
        state.chatStatus = "failed";
        state.chatError = action.payload.message;
      });
  }
});

export const { resetChat,resetStatus } = pdfUploadSlice.actions;
export default pdfUploadSlice.reducer;
