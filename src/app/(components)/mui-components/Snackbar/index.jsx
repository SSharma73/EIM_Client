// ToastComponent.tsx
import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const ToastComponent = () => {
  return (
    <div>
      <ToastContainer autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover/>
    </div>
  );
};

export const notifyError = (message) => toast.error(message);
export const notifySuccess = (message) => toast.success(message);

export default ToastComponent;
