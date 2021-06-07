import { SIGN_UP, LOG_IN, LOG_OUT, SAVE_TOKEN } from './AuthActions';

const initialState = { data: {} }

const AuthReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOG_IN:
            return {
                data: action.user
            }
        case SIGN_UP:
            return {
                data: action.user
            }
        case LOG_OUT:
            return {
                data: {}
            }
        case SAVE_TOKEN:
            return {
                data: {
                    ...state.data,
                    token: action.token
                }
            }
        default:
            return state;
    }
}

export default AuthReducer;
