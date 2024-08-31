import { FC, ReactNode } from 'react';
import { ApiContext } from '../contexts/api';
import { IBlogClient } from '../sdk/client';

interface ApiProviderProps {
  children?: ReactNode;
  client: IBlogClient;
}

const ApiProvider: FC<ApiProviderProps> = ({ children, client }) => {
  const value = client;
  return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
};

export default ApiProvider;
