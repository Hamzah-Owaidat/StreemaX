import toast from 'react-hot-toast';

export const useToast = () => {
  return {
    success: (message: string) => {
      toast.success(message, {
        style: {
          background: '#22c55e', // green
          color: '#ffffff',
        },
      });
    },

    error: (message: string) => {
      toast.error(message, {
        style: {
          background: '#ef4444', // red
          color: '#ffffff',
        },
      });
    },

    info: (message: string) => {
      toast(message, {
        style: {
          background: '#3b82f6', // blue
          color: '#ffffff',
        },
      });
    },

    warning: (message: string) => {
      toast(message, {
        style: {
          background: '#f59e0b', // yellow/orange
          color: '#000000',
        },
      });
    },
  };
};
