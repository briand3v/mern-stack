export const ALERT_SHOW = 'ALERT_SHOW';
export const ALERT_HIDE = 'ALERT_HIDE';

const showAlert = (data) => {
    return {
        type: ALERT_SHOW,
        data
    };
};

const hideAlert = (data) => {
    return {
        type: ALERT_HIDE,
        data
    };
};

export const showAlertAction = (data) => {
    return (dispatch) => {
        return dispatch(showAlert(data));
    }
}

export const hideAlertAction = (data) => {
    return (dispatch) => {
        return dispatch(hideAlert(data));
    }
}
