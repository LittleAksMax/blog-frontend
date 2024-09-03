import { FirebaseConfig } from './types';

type ApiConfigType = {
  apiKey: string;
  urlBase: string;
};

const api: ApiConfigType = {
  apiKey: process.env.REACT_APP_API_KEY || '',
  urlBase: process.env.REACT_APP_API_BASE_URL || '',
};

const auth: FirebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || '',
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || '',
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || '',
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: process.env.REACT_APP_FIREBASE_APP_ID || '',
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID || '',
};

type ConfigType = {
  api: ApiConfigType;
  auth: FirebaseConfig;
};

const config: ConfigType = {
  api,
  auth,
};

export default config;
