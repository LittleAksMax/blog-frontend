import { Context, createContext, useContext } from 'react';
import { IBlogClient } from '../sdk/api/client';

export type ApiContextType = IBlogClient;

export const useApiClient = (): ApiContextType => {
  return useContext(ApiContext);
};

export const ApiContext: Context<ApiContextType> =
  createContext<ApiContextType>(null!);
