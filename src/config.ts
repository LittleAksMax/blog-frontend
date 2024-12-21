import { FirebaseConfigType } from './types';

type ApiConfigType = {
  apiKey: string;
  urlBase: string;
};

type S3ConfigType = {
  accessKeyId: string;
  secretAccessKey: string;
  bucketName: string;
  region: string;
  profile: string;
};

type ModeType = 'development' | 'production' | 'test';

const api: ApiConfigType = {
  apiKey: process.env.REACT_APP_API_KEY || '',
  urlBase: process.env.REACT_APP_API_BASE_URL || '',
};

const auth: FirebaseConfigType = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || '',
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || '',
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || '',
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: process.env.REACT_APP_FIREBASE_APP_ID || '',
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID || '',
};

const s3: S3ConfigType = {
  accessKeyId: process.env.REACT_APP_S3_ACCESS_KEY_ID || '',
  secretAccessKey: process.env.REACT_APP_S3_SECRET_ACCESS_KEY || '',
  bucketName: process.env.REACT_APP_S3_BUCKET_NAME || '',
  region: process.env.REACT_APP_S3_REGION || 'eu-west-2',
  profile: process.env.REACT_APP_S3_PROFILE || '',
};

const mode: ModeType = process.env.NODE_ENV;

type ConfigType = {
  api: ApiConfigType;
  auth: FirebaseConfigType;
  s3: S3ConfigType;
  mode: ModeType;
};

const config: ConfigType = {
  api,
  auth,
  s3,
  mode,
};

export default config;
