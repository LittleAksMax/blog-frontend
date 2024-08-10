import { FirebaseApp, initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  Auth as FirebaseAuth,
} from 'firebase/auth';
import config from '../config';

// const NAMESPACE: string = 'auth/auth.ts';

/**
 * This is a facade for all Firebase authentication stuffs.
 */
class Auth {
  private app!: FirebaseApp;
  private auth!: FirebaseAuth;

  constructor() {
    this.app = initializeApp(config.auth);
    this.auth = getAuth(this.app);
  }

  public signIn = async (email: string, password: string): Promise<boolean> => {
    try {
      await signInWithEmailAndPassword(this.auth, email, password);
      return true;
    } catch (err: any) {
      // logger.debug(NAMESPACE, 'Failed to sign in');
      switch (err.code) {
        case 'auth/invalid-credential':
          alert('Invalid credentials.');
          break;
        default:
          alert('Something went wrong. Try again later.');
      }
      return false;
    }
  };
}

export default Auth;
