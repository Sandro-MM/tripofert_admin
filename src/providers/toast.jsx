import React, { createContext, useRef } from 'react';
import { Toast } from 'primereact/toast';

const ToastContext = createContext();

export function ToastProvider({ children }) {
    const toastRef = useRef(null);

    return (
        <ToastContext.Provider value={toastRef}>
            <Toast ref={toastRef} />
            {children}
        </ToastContext.Provider>
    );
}

export const useToast = () => {
    return React.useContext(ToastContext);
};