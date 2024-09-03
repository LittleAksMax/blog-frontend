import logger from '../logging';
import { TokenAuth } from './requests/auth';
import {
  CreateRequest,
  DeleteRequest,
  GetAllRequest,
  GetOneRequest,
  UpdateRequest,
} from './requests/requests';
import { IUrlFactory } from './requests/UrlFactory';
import { DELETE, GET, makeRequest } from './requests/util';
import { Post } from './types';

const NAMESPACE: string = 'sdk/client.ts';

export type VersionType = 'v1';

const newestClientVersion = (): VersionType => {
  return 'v1';
};

export interface IBlogClient {
  getAll: (
    req: GetAllRequest,
    auth?: TokenAuth
  ) => Promise<[Post[], Error | null]>;
  getOne: (
    req: GetOneRequest,
    auth?: TokenAuth
  ) => Promise<[Post, Error | null]>;
  create: (
    req: CreateRequest,
    auth?: TokenAuth
  ) => Promise<[Post, Error | null]>;
  update: (req: UpdateRequest, auth?: TokenAuth) => Promise<boolean>;
  delete: (req: DeleteRequest, auth?: TokenAuth) => Promise<boolean>;
}

class BlogClient implements IBlogClient {
  private urlFactory: IUrlFactory = null!;
  private version: VersionType = newestClientVersion();

  constructor(urlFactory: IUrlFactory, version?: VersionType) {
    this.urlFactory = urlFactory;
    if (version) {
      this.version = version;
    }
    this.urlFactory.setVersion(this.version);
  }

  public getAll = async (
    req: GetAllRequest,
    auth?: TokenAuth
  ): Promise<[Post[], Error | null]> => {
    return [[], null];
  };

  public getOne = async (
    req: GetOneRequest,
    auth?: TokenAuth
  ): Promise<[Post, Error | null]> => {
    const url: string = this.urlFactory.createGetOneUrl(req);
    const [data, err] = await makeRequest(GET, url, auth?.token);
    if (err != null) {
      return [null!, err];
    }

    const post: Post = {
      id: data._id,
      title: data.title,
      slug: data.slug,
      content: data.content,
      media: data.media,
      tags: data.tags,
      collections: data.collections,
      status: data.status,
      published: new Date(data.published),
      lastUpdated: new Date(data.last_updated),
      featured: data.featured,
    };

    logger.debug(NAMESPACE, 'Data obtained from request:', post);

    return [post, null];
  };

  public create = async (
    req: CreateRequest,
    auth?: TokenAuth
  ): Promise<[Post, Error | null]> => {
    return [null!, null];
  };

  public update = async (
    req: UpdateRequest,
    auth?: TokenAuth
  ): Promise<boolean> => {
    return false;
  };

  public delete = async (
    req: DeleteRequest,
    auth?: TokenAuth
  ): Promise<boolean> => {
    const url: string = this.urlFactory.createDeleteUrl(req);
    const data = await makeRequest(DELETE, url, auth?.token);
    const success = data ? true : false;
    logger.debug(NAMESPACE, 'Success', success);
    return success;
  };
}

export const createBlogClient = (
  urlFactory: IUrlFactory,
  version?: VersionType
): IBlogClient => {
  return new BlogClient(urlFactory, version);
};

export default BlogClient;
