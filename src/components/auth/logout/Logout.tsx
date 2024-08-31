import { FC, useEffect, useState } from 'react';
import { useAuth } from '../../../contexts/auth';
import { Navigate } from 'react-router-dom';
import Spinner from '../../common/spinner/Spinner';
import logger from '../../../logging';

const NAMESPACE: string = 'components/auth/logout/Logout.tsx';

const Logout: FC = () => {
  const { user, logout } = useAuth();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    logout()
      .then((result: boolean) => {
        if (!result) {
          throw new Error('False result when logging out.');
        }
      })
      .catch((e) => {
        if (e instanceof Error) {
          logger.error(NAMESPACE, e.message);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [user, logout]);

  return !loading ? <Navigate to="/" /> : <Spinner />;
};

export default Logout;
