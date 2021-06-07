import { ALERT_SHOW, ALERT_HIDE } from './AlertActions';

const initialState = { alert: { show: false, message: '', type: 'info' }}

const AlertReducer = (state = initialState, action) => {
    switch (action.type) {
        case ALERT_SHOW:
            return {
                show: true,
                message: action.data.message,
                type: action.data.alertType,
                timer: action.data.timer ? action.data.timer : null
            }
        case ALERT_HIDE:
            return {
                show: false,
                message: action.data.message,
                type: action.data.alertType,
                timer: null
            }
        default:
            return state;
    }
}

export default AlertReducer;
