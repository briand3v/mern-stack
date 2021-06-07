import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    input: {
        '& > *': {
            color: theme.palette.text.secondary,
            fontWeight: 700,
            fontFamily: 'Montserrat'
        },
        '& > .Mui-focused': {
            color: theme.palette.text.secondary
        },
        width: '100%'
    }
}));

const Form = props => {
    const classes = useStyles();

    return (
        <form className="form" noValidate autoComplete="off">
            <div>
                <TextField 
                    required
                    id="standard-helperText" 
                    className={classes.input}
                    label="Username" 
                    value={props.username}
                    onChange={(event) => { props.onChange(event, 'username'); }}
                />
                <TextField
                    required
                    id="standard-password-input"
                    className={classes.input}
                    label="Password"
                    type="password"
                    value={props.password}
                    autoComplete="current-password"
                    onChange={(event) => { props.onChange(event, 'password'); }}
                />
                {
                    props.page === 'register' && (
                        <TextField
                            required
                            id="standard-confirm-password-input"
                            className={classes.input}
                            label="Confirm password"
                            type="password"
                            value={props.confirmPassword}
                            autoComplete="current-password"
                            onChange={(event) => { props.onChange(event, 'confirmPassword'); }}
                        />
                    ) 
                }
            </div>
        </form>
    );
}

export default Form;