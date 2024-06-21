import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Notification() {
  return (
    <div>
      <ToastContainer position="top-right" />
    </div>
  );
}

export default Notification;
