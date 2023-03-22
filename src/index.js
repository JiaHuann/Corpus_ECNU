import React from 'react';
import ReactDOM from 'react-dom';
import MainPage from './MainPage';
window.onload = () => {
    ReactDOM.render(<MainPage/>, document.getElementById('app'));
};