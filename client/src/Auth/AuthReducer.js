import { SIGN_UP, LOG_IN, SIGN_UP_FAILURE } from './AuthActions';

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
        case SIGN_UP_FAILURE:
            return {
                data: {
                    failure: true,
                    message: action.user.message
                }
            }
        default:
            return state;
    }
}

export default AuthReducer;
