import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Alert from '@material-ui/lab/Alert';
import { useDispatch } from 'react-redux';
import { hideAlertAction } from '../AlertActions';

const AlertMessage = ({ data }) => {
    const timer = useRef();
    const dispatch = useDispatch();

    useEffect(() => {
        return (() => {
            clearInterval(timer.current);
        })
    }, []);

    useEffect(() => {
        if (data.show) {
            const time = data.timer ? data.timer : 1500;
            timer.current = setTimeout(() => {
                dispatch(hideAlertAction({
                    type: 'info',
                    message: ''
                }));
            }, time);
        }
    }, [data]);

    return (
        <div style={{ position: 'absolute', bottom: 15, width: '80%', justifyContent: 'center' }}>
            {
                data.show && (
                    <Alert severity={data.type} >{data.message}</Alert>
                )
            }
        </div>
    );
};

AlertMessage.propTypes = {
    data: PropTypes.object.isRequired
};

export default AlertMessage;