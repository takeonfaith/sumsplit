import type { ToastType } from './types';

let toastContext: {
    addToast: (toast: Omit<{ id: string; type: ToastType; message: string; duration?: number }, 'id'>) => void;
} | null = null;

export const setToastContext = (context: {
    addToast: (toast: Omit<{ id: string; type: ToastType; message: string; duration?: number }, 'id'>) => void;
}) => {
    toastContext = context;
};

export const toast = (
    type: ToastType,
    message: string,
    options?: {
        duration?: number;
    }
) => {
    if (!toastContext) {
        console.warn('Toast context is not initialized. Make sure ToastProvider is mounted.');
        return;
    }

    toastContext.addToast({
        type,
        message,
        duration: options?.duration,
    });
};

// Удобные функции для каждого типа
export const toastInfo = (message: string, options?: { duration?: number }) => {
    toast('info', message, options);
};

export const toastSuccess = (message: string, options?: { duration?: number }) => {
    toast('success', message, options);
};

export const toastWarning = (message: string, options?: { duration?: number }) => {
    toast('warning', message, options);
};

export const toastAlert = (message: string, options?: { duration?: number }) => {
    toast('alert', message, options);
};

