import { useState, useEffect } from 'react';

const useToast = () => {
    const [toasts, setToasts] = useState([]);

    const addToast = (message, type = 'info') => {
        const id = Math.random().toString(36).substr(2, 9);
        setToasts((prev) => [...prev, { id, message, type }]);
    };

    const removeToast = (id) => {
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