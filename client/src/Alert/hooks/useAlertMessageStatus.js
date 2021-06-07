import React, { useState, useEffect } from 'react';

const useAlertMessageStatus = (initialState, alert) => {
    const [alertState, setAlertState] = useState(initialState);

    useEffect(() => {
        setAlertState({
            alertShow: alert.show,
            alertMessage: alert.alertMessage,
            alertType: alert.alertType
        });
    }, [alert]);

    return [alertState];
}

export default useAlertMessageStatus;