import { ApiKeyAuth } from './auth';
import {
  CreateRequest,
  DeleteRequest,
  GetAllRequest,
  GetOneRequest,
  UpdateRequest,
} from './requests';
import { Post } from './types';

export type VersionType = 'v1';

const newestClientVersion = (): VersionType => {
  return 'v1';
};

export interface IBlogClient {
  getAll: (
    auth: ApiKeyAuth,
    request: GetAllRequest
  ) => Promise<[Post[], Error | null]>;
  getOne: (
    auth: ApiKeyAuth,
    request: GetOneRequest
  ) => Promise<[Post, Error | null]>;
  create: (
    auth: ApiKeyAuth,
    request: CreateRequest
  ) => Promise<[Post, Error | null]>;
  update: (auth: ApiKeyAuth, request: UpdateRequest) => Promise<boolean>;
  delete: (auth: ApiKeyAuth, request: DeleteRequest) => Promise<boolean>;
}

class BlogClient implements IBlogClient {
  private version: VersionType = newestClientVersion();

  constructor(version?: VersionType) {
    if (version) {
      this.version = version;
    }
  }

  public getAll = async (
    auth: ApiKeyAuth,
    request: GetAllRequest
  ): Promise<[Post[], Error | null]> => {
    return [[], null];
  };

  public getOne = async (
    auth: ApiKeyAuth,
    request: GetOneRequest
  ): Promise<[Post, Error | null]> => {
    return [null!, null];
  };

  public create = async (
    auth: ApiKeyAuth,
    request: CreateRequest
  ): Promise<[Post, Error | null]> => {
    return [null!, null];
  };

  public update = async (
    auth: ApiKeyAuth,
    request: UpdateRequest
  ): Promise<boolean> => {
    return false;
  };

  public delete = async (
    auth: ApiKeyAuth,
    request: DeleteRequest
  ): Promise<boolean> => {
    return false;
  };
}

export const createBlogClient = (version?: VersionType): IBlogClient => {
  return new BlogClient(version);
};

export default BlogClient;
