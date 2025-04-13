import { toast } from 'react-toastify';

const error = (msg: string) => {
    toast.error(msg, {
        // toastId: msg,
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
    });
};

const info = (msg: string) => {
    toast.info(msg, {
        // toastId: msg,
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
    });
};

const success = (msg: string) => {
    toast.success(msg, {
        // toastId: msg,
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
    });
};

export default {
    error,
    info,
    success,
};
