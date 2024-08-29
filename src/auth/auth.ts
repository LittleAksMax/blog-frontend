import { FirebaseApp, initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  Auth as FirebaseAuth,
  User,
  NextOrObserver,
} from 'firebase/auth';
import config from '../config';
import logger from '../logging';

const NAMESPACE: string = 'auth/auth.ts';

/**
 * This is a facade for all Firebase authentication stuffs.
 */
class Auth {
  private loggedIn: boolean;
  private app!: FirebaseApp;
  private auth!: FirebaseAuth;

  constructor() {
    this.app = initializeApp(config.auth);
    this.auth = getAuth(this.app);
    this.loggedIn = this.auth.currentUser != null;

    this.auth.beforeAuthStateChanged((user: User | null) => {
      if (user !== null) {
        this.loggedIn = true;
      } else {
        this.loggedIn = false;
      }
    });
  }

  public setOnAuthStateChanged = (fn: NextOrObserver<User | null>) => {
    this.auth.onAuthStateChanged(fn);
  };

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

  public signOut = async (): Promise<boolean> => {
    // can't log out if not logged in in the first place
    if (!this.loggedIn) {
      return false;
    }
    logger.debug(NAMESPACE, 'Logged in?', { logged: this.loggedIn });

    await signOut(this.auth);
    return true;
  };

  public isLoggedIn = (): boolean => {
    return this.loggedIn;
  };
}

export default Auth;
