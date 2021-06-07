import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
//components
import AuthCard from '../../components/AuthCard';
import AlertMessage from '../../../Alert/components/AlertMessage';
//actions
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { signUpRequest } from '../../AuthActions';
import { showAlertAction } from '../../../Alert/AlertActions';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    loginPage: {
        color: theme.palette.text.primary
    }
}));

const RegisterPage = () => {
    const defaults = {
        usernameInput: '',
        passwordInput: '',
        confirmPassword: ''
    };
    const history = useHistory();
    const alert = useSelector(state => state.alert);
    const classes = useStyles();
    const dispatch = useDispatch();
    const timer = useRef(null);
    const [state, setState] = useState(defaults);

    useEffect(() => {
        return (() => {
            clearInterval(timer.current);
        });
    }, []);

    const onChange = ({ target }, input) => {
        const targetInputs = {
            username: 'usernameInput',
            password: 'passwordInput',
            confirmPassword: 'confirmPassword'
        };
        
        setState({
            ...state,
            [targetInputs[input]]: target.value
        });
    };

    const resetInputsValues = () => setState(defaults);
    const validatePassword = (password) => {
        return new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})").test(password);
    }

    const onSubmit = () => {
        if (state.usernameInput !== '' && state.passwordInput !== '' && state.confirmPassword !== '') {
            if (state.passwordInput !== state.confirmPassword) {
                dispatch(showAlertAction({
                    alertType: 'error',
                    message: 'Password does not match'
                }));
                return;
            }
            if (!validatePassword()) {
                dispatch(showAlertAction({
                    alertType: 'error',
                    message: 'Password must have 1 lowercase, 1 uppercase, 1 numeric, at least one special character, and at least 8 characters',
                    timer: 2500
                }));
                return;
            }
            dispatch(signUpRequest({
                username: state.usernameInput,
                password: state.passwordInput,
                confirmPassword: state.confirmPassword
            })).then((res) => {
                let alert = { alertType: res.type, message: res.message };
                dispatch(showAlertAction(alert));
                if (res.user) return timer.current = setTimeout(() => { history.push('/login') }, 1500);
                resetInputsValues();
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
                    <h1>Create account</h1>
                </div>
                
                <AuthCard inputs={state} onChange={onChange} onSubmit={onSubmit} page={'register'} />

                <AlertMessage data={alert} />
            </div>
        </div>
    );
}

RegisterPage.propTypes = {
    alert: PropTypes.object.isRequired
};

export default RegisterPage;
