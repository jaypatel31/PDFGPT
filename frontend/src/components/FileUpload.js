import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { reset, uploadPDF } from "../stateSlice/pdfUploadSlice";
import { toast } from "react-toastify";

const FileUpload = () => {
    const [file, setFile] = useState();
    const [fileName, setFileName] = useState("");
    const [loading, setLoading] = useState(false)

    const {pdfInfo, pdfError} = useSelector(state => state.pdf);

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
            setLoading(true)
            dispatch(uploadPDF(formData))
        }else{
            toast.error("Please select a file to upload.")
        }
    }

    useEffect(()=>{
        if(pdfError){
            setLoading(false)
            toast.error(pdfError)
            dispatch(reset())
        }
    },[pdfError])

    return (
        <div>
            <div class="font-[sans-serif] max-w-md mx-auto">
            <label class="text-sm text-black mb-2 block text-left">Upload the file to Continue</label>
            <input type="file"
                class="w-full text-black text-sm bg-white border file:cursor-pointer cursor-pointer file:border-0 file:py-2.5 file:px-4 file:bg-gray-100 file:hover:bg-gray-200 file:text-black rounded" onChange={saveFile}/>
            <p class="text-xs text-gray-400 mt-2">Only PDF is Allowed.</p>
            <button className="text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  mt-3 w-full flex justify-center" onClick={handleFileUpload} disabled={loading}>
                {
                                loading && (
                                    <svg className="animate-spin h-5 w-5 mr-3" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="#FFF" d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z" opacity=".25"/><path fill="#FFF"  d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z" class="spinner_ajPY"/></svg>
                                )
                            }
                Upload</button>
            </div>
        </div>
    );
}

export default FileUpload;
