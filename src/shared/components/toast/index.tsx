import {
    IconAlertCircle,
    IconAlertCircleFilled,
    IconCheck,
    IconInfoCircle,
    IconX,
} from '@tabler/icons-react';
import React, {
    createContext,
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react';
import ReactDOM from 'react-dom';
import { TOAST_DURATION } from './constants';
import {
    ToastCloseButtonStyled,
    ToastContainerStyled,
    ToastContentStyled,
    ToastIconStyled,
    ToastItemStyled,
    ToastMessageStyled,
} from './styles';
import { setToastContext } from './toast';
import type { Toast, ToastContextType, ToastType } from './types';

const ToastContext = createContext<ToastContextType | null>(null);

const getToastIcon = (type: ToastType) => {
    switch (type) {
        case 'success':
            return <IconCheck size={20} />;
        case 'warning':
            return <IconAlertCircle size={20} />;
        case 'alert':
            return <IconAlertCircleFilled size={20} />;
        case 'info':
        default:
            return <IconInfoCircle size={20} />;
    }
};

type ToastItemProps = {
    toast: Toast;
    onRemove: (id: string) => void;
};

const ToastItem = ({ toast, onRemove }: ToastItemProps) => {
    const [isRemoving, setIsRemoving] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleRemove = useCallback(() => {
        setIsRemoving(true);
        setTimeout(() => {
            onRemove(toast.id);
        }, 300); // Время анимации
    }, [toast.id, onRemove]);

    useEffect(() => {
        if (toast.duration !== 0) {
            const duration = toast.duration ?? TOAST_DURATION;
            timeoutRef.current = setTimeout(() => {
                handleRemove();
            }, duration);
        }

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [toast.duration, handleRemove]);

    return (
        <ToastItemStyled $type={toast.type} $isRemoving={isRemoving}>
            <ToastIconStyled $type={toast.type}>
                {getToastIcon(toast.type)}
            </ToastIconStyled>
            <ToastContentStyled>
                <ToastMessageStyled $type={toast.type}>
                    {toast.message}
                </ToastMessageStyled>
            </ToastContentStyled>
            <ToastCloseButtonStyled onClick={handleRemove} aria-label="Закрыть">
                <IconX size={16} />
            </ToastCloseButtonStyled>
        </ToastItemStyled>
    );
};

type ToastProviderProps = {
    children: React.ReactNode;
};

export const ToastProvider = ({ children }: ToastProviderProps) => {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const addToast = (toast: Omit<Toast, 'id'>) => {
        const id = `toast-${Date.now()}-${Math.random()}`;
        const newToast: Toast = {
            ...toast,
            id,
        };
        setToasts((prev) => [...prev, newToast]);
    };

    const removeToast = (id: string) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    };

    // Устанавливаем контекст для функции toast
    useEffect(() => {
        setToastContext({ addToast });
    }, []);

    return (
        <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
            {children}
            {toasts.length > 0 &&
                ReactDOM.createPortal(
                    <ToastContainerStyled>
                        {toasts.map((toast) => (
                            <ToastItem
                                key={toast.id}
                                toast={toast}
                                onRemove={removeToast}
                            />
                        ))}
                    </ToastContainerStyled>,
                    document.body
                )}
        </ToastContext.Provider>
    );
};
