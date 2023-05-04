import { toast } from 'react-toastify';

export const handleError = (message) => {
  toast.error(message, {
    autoClose: 9000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
  return null;
};

export const handleSuccess = (message) => {
  toast.success(message, {
    autoClose: 9000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
  return true;
};

// specifc function to handle graphql errors
export const handleGraphQLError = (err) => {
  if (err?.message) {
    toast.error(err.message, {
      autoClose: 9000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    return null;
  }

  if (err?.response?.status === 500) {
    toast.error('Internal server error', {
      autoClose: 9000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    return null;
  }

  toast.error('Unexpected error occurred. Please try again.', {
    autoClose: 9000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });

  return null;
};
