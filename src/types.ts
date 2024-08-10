export type ThemeType = 'light' | 'dark';

export type PostType = any; // TODO: more specific

export interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId: string;
}
