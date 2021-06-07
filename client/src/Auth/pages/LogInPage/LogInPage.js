import React, { useState, useEffect, useRef } from 'react';

//components
import AuthCard from '../../components/AuthCard';
import AlertMessage from '../../../Alert/components/AlertMessage';

//actions
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logInRequest } from '../../AuthActions';
import useToken from '../../../useToken';
import { showAlertAction } from '../../../Alert/AlertActions';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    loginPage: {
        color: theme.palette.text.primary
    }
}));

const LogInPage = () => {
    const defaults = {
        usernameInput: '',
        passwordInput: '',
    };
    const history = useHistory();
    const classes = useStyles();
    const alert = useSelector(state => state.alert);
    const user = useSelector(state => state.user.data);
    const dispatch = useDispatch();
    const timer = useRef(null);
    const [state, setState] = useState(defaults);
    const [token, saveTokenUser] = useToken(user);

    useEffect(() => {
        return (() => {
            clearInterval(timer.current);
        });
    }, []);

    const onChange = ({ target }, input) => {
        const targetInputs = {
            username: 'usernameInput',
            password: 'passwordInput'
        }

        setState({
            ...state,
            [targetInputs[input]]: target.value
        });
    }

    const resetInputsValues = () => setState(defaults);

    const onSubmit = () => {
        if (state.usernameInput !== '' && state.passwordInput !== '') {
            dispatch(logInRequest({
                username: state.usernameInput,
                password: state.passwordInput
            })).then((res) => {
                let alert = { alertType: 'info', message: res.message };
                if (res.token) {
                    saveTokenUser(res.token);
                    alert.alertType = 'success';
                    timer.current = setTimeout(() => {  history.push('/') }, 1800);
                } else {
                    alert.alertType = 'error';
                    resetInputsValues();
                }
                dispatch(showAlertAction(alert));
            });
        } else {
           // dispatch alert show 
            dispatch(showAlertAction({
                alertType: 'error',
                message: 'Fields required'
            }));
        }
    }

    return (
        <div className="container">
            <div className={`${classes.loginPage} d-flex flex-column align-items-center justify-content-center`}>
                <div className="title" style={{ marginBottom: 20 }}>
                    <h1>Log In</h1>
                </div>
                
                <AuthCard inputs={state} onChange={onChange} onSubmit={onSubmit} page={'login'} />

                <AlertMessage data={alert} />
            </div>
        </div>
    );
}

export default LogInPage;
