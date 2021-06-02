import callApi from '../util/apiCaller';

export const LOG_IN = 'LOG_IN';
export const SIGN_UP = 'SIGN_UP';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

const logIn = (user) => {
    return {
        type: LOG_IN,
        user
    };
};

export const logInRequest = (user) => {
    return (dispatch) => {
        return callApi('auth/login', 'post', {
            username: user.username,
            password: user.password
        }).then(res => dispatch(logIn(res.data.user)));
    };
};

const signUp = (user) => {
    return {
        type: SIGN_UP,
        user
    };
};

const signUpFailure = (user) => {
    return {
        type: SIGN_UP_FAILURE,
        user
    };
}

export const signUpRequest = (user) => {
    return (dispatch) => {
        return callApi('auth/signup', 'post', {
            username: user.username,
            password: user.password,
            confirmPassword: user.confirmPassword
        })
        .then(res => {
            if (res.status === 200) {
                return dispatch(signUp(res.data.user));
            } else if (res.status === 400) {
                return dispatch(signUpFailure(res));
            }
        })
    };
};