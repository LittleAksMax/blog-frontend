import { Context, createContext, Dispatch, useContext } from 'react';
// import { SignOutType, SignInType } from './auth/types';
import { UserCredential } from 'firebase/auth';

export type LoginType = (
  email: string,
  password: string
) => Promise<[UserCredential, Error | null]>;

export type LogoutType = () => Promise<boolean>;

export type AuthContextType = {
  user: UserCredential | null;
  setUser: Dispatch<UserCredential | null>;
  login: LoginType;
  logout: LogoutType;
};

export const useAuth = (): AuthContextType => {
  return useContext(AuthContext);
};

export const AuthContext: Context<AuthContextType> =
  createContext<AuthContextType>(null!);
