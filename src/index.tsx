import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { initialiseFirebase } from './firebase';
import { createBlogClient } from './sdk/api/client';
import config from './config';
import { createS3Client } from './sdk/s3/client';
import { config as awsConfig, Credentials } from 'aws-sdk';
import './index.css';

// import { getAnalytics } from 'firebase/analytics';

// DOM root element
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// Firebase
const { /* app, */ auth } = initialiseFirebase();

// API SDK
const blogClient = createBlogClient(config.api.urlBase, auth);

// S3 SDK
// set AWS shared credentials file if in development
if (config.mode === 'development') {
  var credentials = new Credentials({
    accessKeyId: config.s3.accessKeyId,
    secretAccessKey: config.s3.secretAccessKey,
  });
  awsConfig.credentials = credentials;
}
const s3Client = createS3Client(config.s3.region, config.s3.bucketName);

root.render(
  <React.StrictMode>
    <App
      auth={auth}
      client={blogClient}
      s3Client={s3Client}
      bucketName={config.s3.bucketName}
    />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
