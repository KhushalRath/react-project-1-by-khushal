import React from 'react';
import {Router} from "./config"
import { ToastContainer } from "react-toastify";

const App = () => {
  return(
   <div>
     <Router/>
     <ToastContainer />
   </div>
   
  )
};
export default App;