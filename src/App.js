
import React from 'react'
import Routing from './routing/Routing'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <div>
    <ToastContainer position="top-right" autoClose={3000} />
  
    <Routing/>
    
    </div>
  )
}

export default App
