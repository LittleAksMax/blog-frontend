import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Auth from './auth/auth';

// DOM root element
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// Firebase facade object
const auth = new Auth();

root.render(
  <React.StrictMode>
    <App auth={auth} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
