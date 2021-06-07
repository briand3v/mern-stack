import { useEffect, useState } from 'react';

export default function useToken(user) {
    const getToken = () => {
        const tokenString = sessionStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        return userToken;
    };
    const [token, setToken] = useState(getToken());

    const saveTokenUser = userToken => {
        sessionStorage.setItem('token', JSON.stringify(userToken));
        setToken(userToken);
    };

    useEffect(() => {
        if (user.token) {
            setToken(user.token);
        } else {
            setToken(null);
        }
    }, [user]);

    return [token, saveTokenUser];
}