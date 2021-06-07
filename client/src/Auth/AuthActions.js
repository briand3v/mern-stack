import callApi from '../util/apiCaller';

export const LOG_IN = 'LOG_IN';
export const SIGN_UP = 'SIGN_UP';
export const LOG_OUT = 'LOG_OUT';
export const SAVE_TOKEN = 'SAVE_TOKEN';

const saveToken = (token) => {
    return {
        type: SAVE_TOKEN,
        token
    }
};

export const saveTokenRequest = (token) => {
    return (dispatch) => {
        return dispatch(saveToken(token));
    }
}

const logIn = (user) => {
    return {
        type: LOG_IN,
        user
    };
};

export const logInRequest = (user) => {
    return (dispatch) => {
        return callApi('auth/login', 'post', {}, JSON.stringify({
            username: user.username,
            password: user.password
        })).then(res => {
            const data = {
                user: null,
                token: null,
                message: ''
            };
            if (res.status === 200) {
                dispatch(logIn(res.data));
                data.user = res.data.user;
                data.token = res.data.token;
                // or use key of dictionary as future feature
                data.message = 'Logged in successfully';
            } else if (res.status === 404) {
                // or use key of dictionary as future feature
                data.message = `${user.username} doesn't exist. Please try again`;
            }
            return data;
        });
    };
};

const signUp = (user) => {
    return {
        type: SIGN_UP,
        user
    };
};

export const signUpRequest = (user) => {
    return (dispatch) => {
        return callApi('auth/signup', 'post', {}, JSON.stringify({
            username: user.username,
            password: user.password,
            confirmPassword: user.confirmPassword
        }))
        .then(res => {
            const data = {
                user: null,
                message: '',
                type: 'info'
            };
            if (res.status === 201) {
                // or use key of dictionary as future feature
                data.message = 'Account created successfully';
                data.user = res.data.user;
                data.type = 'success';
                dispatch(signUp(res.data.user));
            } else if (res.status === 400) {
                // or use key of dictionary as future feature
                data.message = 'Account already exist';
                data.type = 'error';
            }
            return data;
        })
    };
};

const logOut = () => {
    return {
        type: LOG_OUT
    }
};

export const logOutRequest = () => {
    return (dispatch) => {
        return callApi('auth/logout', 'post').then((res) => {
            if (res.status === 200) {
                dispatch(logOut());
                return { type: 'success', message: 'Log out successfully' };
            }
        });
    }
};
