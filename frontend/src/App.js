import logo from './logo.svg';
import './output.css';
import './App.css';
import FileUpload from './components/FileUpload.js';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from 'react-redux';
import Chat from './components/Chat.js';

function App() {

  const {pdfInfo} = useSelector(state => state.pdf);

  return (
    <>
    <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    <div className="App pt-16 w-9/12 m-auto h-screen">
      <div className="lg:flex lg:items-center lg:justify-between">
      <div className="min-w-0 flex-1">
        <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-4xl sm:tracking-tight">
          Chat PDF
        </h1>
        {
          pdfInfo && (
            <h4 className="text-lg text-semibold leading-7 text-gray-900 sm:truncate sm:text-xl sm:tracking-tight mt-2">
              File: {pdfInfo}
            </h4>
          )
        }
        {
          !pdfInfo?(
            <div className='w-full mt-10'>
              <FileUpload/>
            </div>
          ):(
            <div className='w-full mt-10'>
              
              <Chat/>
            </div>
          )
        }
      </div>
    </div>
    </div>
    </>
  );
}

export default App;
