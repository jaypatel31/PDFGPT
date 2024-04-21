import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { uploadPDF } from "../stateSlice/pdfUploadSlice";
import { toast } from "react-toastify";

const FileUpload = () => {
    const [file, setFile] = useState();
    const [fileName, setFileName] = useState("");

    let dispatch = useDispatch();

    const saveFile = (e) => {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
      };

    const handleFileUpload = (e) => {
        if(fileName){
            const formData = new FormData();
            formData.append("file", file);
            formData.append("fileName", fileName);
            dispatch(uploadPDF(formData))
        }else{
            toast.error("Please select a file to upload.")
        }
    }
    return (
        <div>
            <div class="font-[sans-serif] max-w-md mx-auto">
            <label class="text-sm text-black mb-2 block text-left">Upload the file to Continue</label>
            <input type="file"
                class="w-full text-black text-sm bg-white border file:cursor-pointer cursor-pointer file:border-0 file:py-2.5 file:px-4 file:bg-gray-100 file:hover:bg-gray-200 file:text-black rounded" onChange={saveFile}/>
            <p class="text-xs text-gray-400 mt-2">Only PDF is Allowed.</p>
            <button className="text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  mt-3 w-full" onClick={handleFileUpload}>Upload</button>
            </div>
        </div>
    );
}

export default FileUpload;
