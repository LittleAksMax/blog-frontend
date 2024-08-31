import { FC, ReactNode, useEffect, useState } from 'react';
import { AuthContext, LoginType, LogoutType } from '../contexts/auth';
import {
  Auth as FirebaseAuth,
  signInWithEmailAndPassword,
  signOut,
  User,
  UserCredential,
} from 'firebase/auth';
import Spinner from '../components/common/spinner/Spinner';

interface AuthProviderProps {
  children?: ReactNode;
  auth: FirebaseAuth;
}

// resources: https://github.com/WebDevSimplified/React-Firebase-Auth.git
const AuthProvider: FC<AuthProviderProps> = ({ children, auth }) => {
  const [user, setUser] = useState<User | null>(auth.currentUser);
  const [loading, setLoading] = useState<boolean>(true);

  const login: LoginType = async (email: string, password: string) => {
    try {
      const userCred: UserCredential | null = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      return [userCred, null];
    } catch (e) {
      if (e instanceof Error) {
        return [null!, e];
      } else {
        return [null!, null];
      }
    }
  };

  const logout: LogoutType = async () => {
    try {
      await signOut(auth);
      return true;
    } catch (e) {
      return false;
    }
  };

  useEffect(
    () => {
      const unsubscribe = auth.onAuthStateChanged((user: User | null) => {
        setUser(user);
        setLoading(false);
      });

      return unsubscribe;
    },
    // eslint-disable-next-line
    []
  );

  const value = { login, user, setUser, logout };

  return (
    <AuthContext.Provider value={value}>
      {!loading ? children : <Spinner />}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
