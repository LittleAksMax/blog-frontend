import { FC, ReactNode, useState } from 'react';
import { AuthContext, LoginType, LogoutType } from '../contexts';
import {
  Auth as FirebaseAuth,
  signInWithEmailAndPassword,
  signOut,
  UserCredential,
} from 'firebase/auth';

interface AuthProviderProps {
  children?: ReactNode;
  auth: FirebaseAuth;
}

const AuthProvider: FC<AuthProviderProps> = ({ children, auth }) => {
  const [user, setUser] = useState<UserCredential | null>(null);

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

  const value = { login, user, setUser, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
