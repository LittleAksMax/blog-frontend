import { ReactNode } from 'react';
import Auth from '../auth/auth';

export interface ChildrenProp {
  children?: ReactNode;
}

export interface AuthProp {
  auth: Auth;
}
