import React, { useEffect, useState } from "react";

const generalContext = React.createContext();

export function GeneralProvider(props) {
    const [loading, setLoading] = useState(false)
    const [showForm, setShowForm] = useState(false)
    const [acumShowForm, setAcumShowForm] = useState(0)

    useEffect(() => {
        if (acumShowForm === 3) {
            setShowForm(true)
        }
    }, [acumShowForm]);

    return (
        <generalContext.Provider
            value={{
                showForm,
                setShowForm,
                acumShowForm,
                setAcumShowForm
            }}
            {...props}
        />
    );
}

export function useGeneral() {
    const context = React.useContext(generalContext);
    if (!context) {
        throw new Error("useGeneral debe estar dentro del proveedor generalContext");
    }
    return context;
}