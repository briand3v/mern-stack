import React, { useEffect, useState } from 'react';

//components
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Switch from '@material-ui/core/Switch';

//actions
import { useDispatch, useSelector } from 'react-redux';
import { logOutRequest, saveTokenRequest } from '../../Auth/AuthActions';
import { showAlertAction } from '../../Alert/AlertActions';
import useToken from '../../useToken';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    logOut: {
        color: theme.palette.text.primary
    }
}));

function Navbar({ setThemeType, themType }) {
    const user = useSelector(state => state.user.data);
    const [token] = useToken(user);
    
    const classes = useStyles();
    const dispatch = useDispatch();
    const [checked, setChecked] = useState(themType === 'light' ? false : true);
    const [showLogOut, setShowLogOut] = useState(false);
    const toggle = () => {
        setChecked((prevState) => (!prevState));
        setThemeType(checked ? 'light' : 'dark');
    };

    useEffect(() => {
        if (!user.token && token) {
            dispatch(saveTokenRequest(token));
            setShowLogOut(true);
        }
    }, []);

    useEffect(() => {
        if (token) {
            setShowLogOut(true);
        } else { setShowLogOut(false); }
    }, [token]);
    
    const logOut = () => {
        dispatch(logOutRequest()).then((res) => {
            let alert = { alertType: res.type, message: res.message };
            dispatch(showAlertAction(alert));
            sessionStorage.removeItem('token');
        });
    };

    return (
        <AppBar position="fixed">
            <Toolbar>
                <Typography variant="h6" >
                    <Link href="/" className="text-white">Home</Link>
                </Typography>
                <div className="w-100 d-flex flex-row align-items-center justify-content-end">
                    {
                        showLogOut && (
                            <button className={`${classes.logOut} button-primary m-r-10`} onClick={logOut}>
                                Logout
                            </button>
                        )
                    }
                    <span className="font-weight-bold" style={{ marginRight: 10 }}>Dark</span>
                    <Switch
                        size="small"
                        checked={checked}
                        onChange={toggle}
                        color={"default"}
                    />
                </div>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
