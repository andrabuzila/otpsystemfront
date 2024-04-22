import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const notificationAppearance = {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
}

export const infoNotify = (message) => 
    toast.info(message, notificationAppearance);

export const successNotify = (message) =>  
    toast.success(message, {...notificationAppearance,
    autoClose: 50000});

export const warningNotify = (message) =>
    toast.warn(message, notificationAppearance);

export const errorNotify = (message) => 
    toast.error(message, notificationAppearance);