import { FC, useEffect, useState } from 'react';
import { useAuth } from '../../../contexts';
import { Navigate } from 'react-router-dom';
import Spinner from '../../common/spinner/Spinner';
import logger from '../../../logging';

const NAMESPACE: string = 'components/auth/logout/Logout.tsx';

const Logout: FC = () => {
  const { user, logout } = useAuth();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!user) {
      logout()
        .catch((err) => {
          logger.error(NAMESPACE, err.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [user, logout]);

  return !loading ? <Navigate to="/" /> : <Spinner />;
};

export default Logout;
