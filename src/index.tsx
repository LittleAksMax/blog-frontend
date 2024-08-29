import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { initialiseFirebase } from './firebase';
// import { getAnalytics } from 'firebase/analytics';

// DOM root element
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// Firebase
const { /* app, */ auth } = initialiseFirebase();

root.render(
  <React.StrictMode>
    <App auth={auth} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
