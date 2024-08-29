import { FirebaseApp, initializeApp } from 'firebase/app';
import { getAuth, Auth as FirebaseAuth } from 'firebase/auth';
import config from './config';

export const initialiseFirebase = (): {
  app: FirebaseApp;
  auth: FirebaseAuth;
} => {
  const app = initializeApp(config.auth);
  const auth = getAuth(app);
  return { app, auth };
};
