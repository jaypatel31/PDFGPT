import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  pdfStatus: "idle",
  pdfInfo: null,
  pdfError: null,
};

export const uploadPDF = createAsyncThunk(
    "pdf/uploadPDF",
    async (payload , { rejectWithValue }) => {
      try {
        const { data } = await axios.post(`/api/pdf/pdfupload`, payload);
        return data;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  );


export const pdfUploadSlice = createSlice({
  name: "pdf",
  initialState,
  reducers: {
    reset(state, action) {
      state.pdfError = null;
      state.pdfInfo = null;
    },
    resetStatus(state,action){
      state.pdfStatus="idle"
      state.taskCreationStatus=null
    }
  },
  extraReducers: builder => {
    builder
      .addCase(uploadPDF.pending, (state) => {
        state.pdfStatus = "loading";
        state.pdfError = null;
      })
      .addCase(uploadPDF.fulfilled, (state, action) => {
        state.pdfStatus = "succeeded";
        state.pdfError = null;
        state.pdfInfo = action.payload.data;
      })
      .addCase(uploadPDF.rejected, (state, action) => {
        state.pdfStatus = "failed";
        state.pdfError = action.payload.message;
      });
  }
});

export const { reset,resetStatus } = pdfUploadSlice.actions;
export default pdfUploadSlice.reducer;
