import { toast } from 'react-toastify';

const toastOptions = {
  containerId: 'global',
};

export const toastSuccess = (message) => {
  toast.success(message, toastOptions);
};

export const toastError = (message) => {
  toast.error(message, toastOptions);
};