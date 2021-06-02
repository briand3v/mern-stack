import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const Form = props => {

    return (

        <form className="form-content" noValidate autoComplete="off">
            <div>
                <TextField 
                    id="standard-helperText" 
                    label="Username" 
                    defaultValue="" 
                    onChange={(event) => { props.onChange(event, 'username'); }}
                />
                <TextField
                    id="standard-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    onChange={(event) => { props.onChange(event, 'password'); }}
                />
                {
                    props.page === 'register' && (
                        <TextField
                            id="standard-password-input"
                            label="Confirm password"
                            type="password"
                            autoComplete="current-password"
                            onChange={(event) => { props.onChange(event, 'confirmPassword'); }}
                        />
                    ) 
                }
            </div>

            <div className="button-content">
                <Button
                    className="submit-form"
                    variant='contained'
                    color='secondary'
                    onClick={props.onSubmit}
                >
                    {
                        props.page === 'login' ? ('log in') : ('Register')
                    }
                </Button>
            </div>
        </form>
    );
}

export default Form;