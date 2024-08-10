import Auth from '../../../auth/auth';
import logger from '../../../logging';

const NAMESPACE: string = 'components/auth/login/util.ts';

export const handleLogin = async (
  auth: Auth,
  email: string,
  password: string
): Promise<boolean> => {
  logger.debug(NAMESPACE, 'Login Attempt', { email });

  return await auth.signIn(email, password);
};
