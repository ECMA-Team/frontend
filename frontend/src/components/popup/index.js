import React from "react";
import { useState } from "react";


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




import "./style.css";

export const Popup = function (props) {
  return props.trigger ? (
    <div className="popup">
      <div className="popup-inner">
        <button
          className="close-btn"
          onClick={() => {
            props.setTrigger(false);
          }}
        >
          close
        </button>
        <button >yes</button>
        {props.children}
      </div>
    </div>
  ) : (
    ""
  );
};

export const New = function () {
  const [test, setTest] = useState(false);
  const [time , setTime]= useState(false)


//   setTimeout(()=>{
//     setTime(true)
//   } , 300)
//   setTimeout(()=>{
//     setTime(false)
//   } , 8000)
  return (
    <div>
      <button
        onClick={() => {
          setTest(true);
        }}
      >
        OPEN POPUP
      </button>
      <Popup trigger={test} setTrigger={setTest}>
        <h3>my popup</h3>
        <p>This is my button </p>
      </Popup>
      <Popup trigger={time} setTrigger={setTime}>
        <h3>my popup</h3>
        <p>time </p>
      </Popup>
    </div>
  );
};
//!=============================================




export function Appppp(){
  const notify = () => toast("Edited successfully");

  return (
    <div>
      <button onClick={notify}>Notify!</button>
      <ToastContainer />
    </div>
  );
}
