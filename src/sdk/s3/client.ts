import { S3 } from 'aws-sdk';
import logger from '../../logging';
import ObjectKeyFactory, {
  IObjectKeyFactory,
} from './requests/ObjectKeyFactory';
import { GetObjectRequest } from 'aws-sdk/clients/s3';
import { Post } from '../api/types';

const NAMESPACE: string = 'sdk/s3/client.ts';

class S3Client {
  private s3: S3;
  private bucketName: string;
  private objKeyFactory: IObjectKeyFactory;

  constructor(s3: S3, bucketName: string, objKeyFactory: IObjectKeyFactory) {
    this.s3 = s3;
    this.bucketName = bucketName;
    this.objKeyFactory = objKeyFactory;
  }

  public getPostBannerUrl = (post: Post): string => {
    // logger.debug(NAMESPACE, this.bucketName);
    const getParams: GetObjectRequest = {
      Bucket: this.bucketName,
      Key: this.objKeyFactory.createBannerObjectKey(post),
    };

    return this.s3.getSignedUrl('getObject', getParams);
  };

  public getMediaUrl = (post: Post, mediaUrl: string): string => {
    const getParams: GetObjectRequest = {
      Bucket: this.bucketName,
      Key: this.objKeyFactory.createObjectKey(post, mediaUrl),
    };

    return this.s3.getSignedUrl('getObject', getParams);
  }
}

export const createS3Client = (
  region: string,
  bucketName: string
): S3Client => {
  const s3 = new S3({
    region: region,
  });
  const objKeyFactory: IObjectKeyFactory = new ObjectKeyFactory();
  return new S3Client(s3, bucketName, objKeyFactory);
};

export default S3Client;
