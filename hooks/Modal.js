import React, { useState } from "react";

const ModalContext = React.createContext();

export function ModalProvider(props) {
    const [loadingModal, setLoadingModal] = useState(false)
    const [open, setOpen] = useState(false)

    return (
        <ModalContext.Provider
            value={{
                loadingModal,
                setLoadingModal, 
                open,
                setOpen                
            }}
            {...props}
        />
    );
}

export function useModal() {
    const context = React.useContext(ModalContext);
    if (!context) {
        throw new Error("useSendMoney debe estar dentro del proveedor ModalContext");
    }
    return context;
}
