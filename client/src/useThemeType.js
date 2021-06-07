import { useState } from 'react';

export default function useThemeType() {
    const getTheme = () => {
        let theme = sessionStorage.getItem('appTheme');
        if (JSON.parse(theme)) {
            return JSON.parse(theme);
        }
        return 'light';
    };

    const [themeColor, setThemeColor] = useState(getTheme());
    const setTheme = (themeValue) => {
        sessionStorage.setItem('appTheme', JSON.stringify(themeValue));
        setThemeColor(themeValue);
    };
    return [themeColor, setTheme];
}