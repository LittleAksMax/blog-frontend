import { FC, useEffect, useState } from 'react';
import { ChildrenProp } from '../components/props';
import { S3Context, S3ContextType } from '../contexts/s3';
import Spinner from '../components/common/spinner/Spinner';
import S3Client from '../sdk/s3/client';

interface S3ProviderProps extends ChildrenProp {
  s3Client: S3Client;
  bucketName: string;
}

const S3Provider: FC<S3ProviderProps> = (props: S3ProviderProps) => {
  const { children } = props;
  const [loading, setLoading] = useState<boolean>(true);
  const [s3Client] = useState<S3Client>(props.s3Client);

  useEffect(() => {
    setLoading(false);
  }, []);

  const value: S3ContextType = {
    s3Client: s3Client,
  };

  return (
    <S3Context.Provider value={value}>
      {!loading ? children : <Spinner />}
    </S3Context.Provider>
  );
};

export default S3Provider;
