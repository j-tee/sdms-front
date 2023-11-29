import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useContext } from 'react';
import { ToastContext } from './ToastContext';

export const showToastify = (message: string, type: string) => {
    if(message && type){
      switch (type) {
        case 'success':
          toast.success(message);
          break;
        case 'error':
          toast.error(message);
          break;
        case 'warning':
          toast.warning(message);
          break;
        default:
          toast(message);
      }
    }
  };
  

const Toast = () => {
  const { showToast } = useContext(ToastContext);
  return showToast ? (
    <ToastContainer
      position="top-center"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  ) : null;
};

export default Toast;
