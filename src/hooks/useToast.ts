import { useState, useEffect } from 'react';

type ToastType = 'info' | 'success' | 'error';
interface Toast {
    id: string;
    message: string;
    type: ToastType;
}

const useToast = () => {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const addToast = (message: string, type: ToastType = 'info') => {
        const id = Math.random().toString(36).substr(2, 9);
        setToasts((prev) => [...prev, { id, message, type }]);
    };

    const removeToast = (id: string) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            if (toasts.length > 0) {
                removeToast(toasts[0].id);
            }
        }, 3000);

        return () => clearTimeout(timer);
    }, [toasts]);

    return { toasts, addToast, removeToast };
};

export default useToast;