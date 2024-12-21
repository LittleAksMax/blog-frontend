import { Context, createContext, useContext } from 'react';
import S3Client from '../sdk/s3/client';

export type S3ContextType = {
  s3Client: S3Client;
};

export const useS3 = (): S3ContextType => {
  return useContext(S3Context);
};

export const S3Context: Context<S3ContextType> = createContext<S3ContextType>(
  null!
);
