import React from 'react';
import PropTypes from 'prop-types';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import './App.css';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import PostListPage from './Post/pages/PostListPage/PostListPage';
import PostDetailPage from './Post/pages/PostDetailPage/PostDetailPage';
import LogInPage from './Auth/pages/LogInPage/LogInPage';
import RegisterPage from './Auth/pages/RegisterPage/RegisterPage';
import { Provider } from 'react-redux';
import useThemeType from './useThemeType';

import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Nav/components/Navbar';

function App(props) {  
    const [themeColor, setTheme] = useThemeType();
    const themeMui = createMuiTheme({
        palette: {
            primary: {
                main: themeColor === 'light' ? '#1ecde2' : '#1d2533'
            },
            secondary: {
                main: themeColor === 'light' ? '#fff' : '#1d2533'
            },
            background: {
                default: themeColor === 'light' ? '#fff' : '#1d2533'
            },
            text: {
                primary: themeColor === 'light' ? '#1d2533' : '#fff',
                secondary: themeColor === 'light' ? '#3b4352' : '#c1c1c1'
            }
        },
    });

    return (
        <ThemeProvider theme={themeMui}>
            <div className="w-100">
                <div className="w-100 pt-5 mt-5" style={{ position: 'relative', backgroundColor: themeMui.palette.background.default, minHeight: '95vh' }}>
                    <Provider store={props.store}>
                        <Navbar themType={themeColor} setThemeType={setTheme} />
                        <BrowserRouter>
                            <Switch>
                                <Route exact path="/login" component={LogInPage} />
                                <Route exact path="/register" component={RegisterPage} />
                                <Route exact path="/" render={() => <PostListPage />} />
                                <Route exact path="/posts/:cuid/:slug" component={PostDetailPage} />
                            </Switch>
                        </BrowserRouter>
                    </Provider>
                </div>
            </div>
        </ThemeProvider>
    );
}

App.propTypes = {
    store: PropTypes.object.isRequired,
};

export default App;
