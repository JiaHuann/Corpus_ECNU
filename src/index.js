import React from 'react';
import ReactDOM from 'react-dom';
import SignInSide from './SigninSide';
window.onload = () => {
    ReactDOM.render(<SignInSide/>, document.getElementById('app'));
};