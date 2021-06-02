import React, { useState } from 'react';
import Form from '../../components/Form';
// import Alert from '@material-ui/lab/Alert';
import { useDispatch, useSelector, connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { signUpRequest } from '../../AuthActions';

const RegisterPage = ({ user }) => {
    let history = useHistory();
    const [usernameInput, setUsernameInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const dispatch = useDispatch();

    const onChange = ({ target }, input) => {
        if (input === 'username') {
            setUsernameInput(target.value);
        } else if (input === 'password') {
            setPasswordInput(target.value);
        } else if (input === 'confirmPassword') {
            setConfirmPassword(target.value);
        }
    }

    console.log(user);

    const onSubmit = () => {
        if (usernameInput !== '' && passwordInput !== '' && confirmPassword !== '') {
            const user = {
                username: usernameInput,
                password: passwordInput,
                confirmPassword: confirmPassword
            };
            dispatch(signUpRequest(user)).then(res => {
                console.log('Super here', res);
            });
        }
    }

    const handleClick = () => {
        history.push('/login')
    }

    return (
        <div className="container">
            <div className="login-page">
                <div className="title">
                    <h1>Create account</h1>
                </div>
                <Form
                    username={usernameInput}
                    password={passwordInput}
                    onChange={onChange}
                    onSubmit={onSubmit}
                    page="register"
                />
                <div>
                    <p>Have already an account ?</p>
                    <a onClick={handleClick}>Log in</a>
                </div>
                {
                    user.failure && (
                        // <Alert severity="error">{ user.message }</Alert>
                        <div>{user.message}</div>
                    )
                }
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    user: state.user.data
});

export default connect(mapStateToProps)(RegisterPage);
