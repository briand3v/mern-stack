import React, { useState } from 'react';
import Form from '../../components/Form';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logInRequest } from '../../AuthActions';

const LogInPage = (props) => {
    let history = useHistory();
    const [usernameInput, setUsernameInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const dispatch = useDispatch();

    const onChange = ({ target }, input) => {
        if (input === 'username') {
            setUsernameInput(target.value);
        } else if (input === 'password') {
            setPasswordInput(target.value);
        }
    }

    const onSubmit = () => {
        if (usernameInput !== '' && passwordInput !== '') {
            const user = {
                username: usernameInput,
                password: passwordInput
            };
            dispatch(logInRequest(user)).then(res => console.log('---------',res));
        }
    }

    const handleClick = () => {
        history.push("/register");
    }

    return (
        <div className="container">
            <div className="login-page">
                <div className="title">
                    <h1>Log In</h1>
                </div>
                <Form 
                    username={usernameInput} 
                    password={passwordInput} 
                    onChange={onChange}
                    onSubmit={onSubmit}
                    page="login"
                />
                <div>
                    <p>Have account yet ?</p>
                    <a onClick={handleClick}>Register</a>
                </div>
            </div>
        </div>
    );
}
export default LogInPage;