import React from 'react';
import * as ReactDOM from 'react-dom';
import { combineReducers, createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import posts from './Post/PostReducer';
import user from './Auth/AuthReducer';
import alert from './Alert/AlertReducer';
import './index.css';
import App from './App';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Middleware and store enhancers
const enhancers = [
    applyMiddleware(thunk),
];

const initialStore = createStore(combineReducers({ posts, user, alert }), {}, composeEnhancers(...enhancers));

ReactDOM.render(<App store={initialStore}/>, document.getElementById('root'));
