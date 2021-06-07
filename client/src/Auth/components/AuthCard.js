import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Form from './Form';
import Logo from '../../logo.svg';
import LoginImage from '../../login.jpg';

const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 275,
        width: 700,
        height: 500,
        backgroundColor: theme.palette.primary.main
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 20,
        color: theme.palette.text.primary,
        fontWeight: 'bold'
    },
    pos: {
        marginBottom: 12,
    },
    text: {
        color: theme.palette.text.primary,
        fontFamily: 'Montserrat'
    },
    link: {
        color: theme.palette.text.primary
    }
}));

const AuthCard = ({ inputs, onChange, onSubmit, page }) => {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <div className="row h-100">
                <div className="col-6">
                    <div className="h-100">
                        <div className="h-70 d-flex">
                            <CardContent className="d-flex flex-column align-items-center justify-content-end">
                                <div className="d-flex flex-column w-100 h-100 align-items-center">
                                    <div className="d-flex align-items-center justify-content-center">
                                        <img className="mx-3" src={Logo} alt="Logo" style={{ height: '72px' }} />
                                        <Typography className={`${classes.text} ${classes.title}`}>
                                            Alaya
                                        </Typography>
                                    </div>

                                    <Typography variant="h5" component="h2" className={classes.text}>
                                        Welcome back
                                    </Typography>
                                </div>

                                <Form
                                    username={inputs.usernameInput}
                                    password={inputs.passwordInput}
                                    confirmPassword={inputs.confirmPassword}
                                    onChange={onChange}
                                    onSubmit={onSubmit}
                                    page={page}
                                />
                            </CardContent>
                        </div>
                        <div className="h-30 d-flex justify-content-end">
                            <CardActions className="d-flex flex-column justify-content-end align-items-center w-100 h-100">
                                <Button
                                    className="submit-form"
                                    variant='contained'
                                    color='secondary'
                                    onClick={onSubmit}
                                >
                                    {
                                        page === 'login' ? ('Log in') : ('Register')
                                    }
                                </Button>

                                <div className="d-flex flex-row m-t-10">
                                    {
                                        page === 'login' ? (
                                            <>
                                                <p>Don't have an account yet ?</p>
                                                <a className={classes.link} style={{ marginLeft: 10 }} href="/register">Register</a>
                                            </>
                                        ) : (
                                            <>
                                                <p>Already have an account ?</p>
                                                <a className={classes.link} style={{ marginLeft: 10 }} href="/login">Log in</a>
                                            </>
                                        )
                                    }
                                </div>
                            </CardActions>
                        </div>
                    </div>
                </div>

                <div className="col-6 content-info" style={{ backgroundColor: '#fff' }}>
                    <img className="mx-3" src={LoginImage} alt="login" style={{ height: '300px' }} />
                    <Typography style={{ color: '#827979', fontWeight: 'bold', fontFamily: 'Montserrat' }}>
                        Sign in or create a new account and enjoy this blog
                    </Typography>
                </div>
            </div>
        </Card>
    );
}

AuthCard.propTypes = {
    inputs: PropTypes.object.isRequired,
    page: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
};

export default AuthCard;
