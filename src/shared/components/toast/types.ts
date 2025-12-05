export type ToastType = 'info' | 'warning' | 'success' | 'alert';

export type Toast = {
    id: string;
    type: ToastType;
    message: string;
    duration?: number;
};

export type ToastContextType = {
    toasts: Toast[];
    addToast: (toast: Omit<Toast, 'id'>) => void;
    removeToast: (id: string) => void;
};

