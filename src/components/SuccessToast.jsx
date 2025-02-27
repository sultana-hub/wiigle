import React from 'react'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const SuccessToast = () => {

    const showSuccessToast = () => {
        toast.success("Success! Your action was completed.", {
          position: "top-right",
          autoClose: 3000, // Closes after 3 seconds
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      };


  return (
    <div>
         <button onClick={showSuccessToast} className="p-2 bg-green-500 text-white rounded">
        Show Success Toast
      </button>
      <ToastContainer />
    </div>
  )
}

export default SuccessToast