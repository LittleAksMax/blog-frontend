import logger from '../logging';
import {
  CreateRequest,
  DeleteRequest,
  GetAllRequest,
  GetOneRequest,
  UpdateRequest,
} from './requests/requests';
import { IUrlFactory } from './requests/UrlFactory';
import { DELETE, GET, makeRequest, POST, PUT } from './requests/util';
import { Post, PostStatusType } from './types';
import { Auth as FirebaseAuth } from 'firebase/auth';

const NAMESPACE: string = 'sdk/client.ts';

export type VersionType = 'v1';

const newestClientVersion = (): VersionType => {
  return 'v1';
};

export interface IBlogClient {
  getAll(
    req: GetAllRequest,
    useAuth?: boolean
  ): Promise<[Post[], number, string | null, string | null, Error | null]>;
  getOne(req: GetOneRequest, useAuth?: boolean): Promise<[Post, Error | null]>;
  create(req: CreateRequest): Promise<[Post, Error | null]>;
  update(req: UpdateRequest): Promise<boolean>;
  delete(req: DeleteRequest): Promise<boolean>;
}

class BlogClient implements IBlogClient {
  private static PaginationTotalCountHeader: string = 'X-Total-Count';
  private urlFactory: IUrlFactory = null!;
  private firebaseAuth: FirebaseAuth = null!;
  private version: VersionType = newestClientVersion();

  constructor(
    urlFactory: IUrlFactory,
    firebaseAuth: FirebaseAuth,
    version?: VersionType
  ) {
    this.urlFactory = urlFactory;
    this.firebaseAuth = firebaseAuth;
    if (version) {
      this.version = version;
    }
    this.urlFactory.setVersion(this.version);
  }

  public async getAll(
    req: GetAllRequest,
    useAuth: boolean = true
  ): Promise<[Post[], number, string | null, string | null, Error | null]> {
    const url: string = this.urlFactory.createGetAllUrl(req);
    let token: string | undefined;
    if (useAuth) {
      token = await this.firebaseAuth.currentUser?.getIdToken();
    }

    const [data, err] = await makeRequest(GET, url, token);

    if (err) {
      return [null!, null!, null, null, err];
    }

    try {
      if (
        [
          '_id',
          'title',
          'slug',
          'content',
          'media',
          'tags',
          'collections',
          'status',
          'published',
          'last_updated',
          'featured',
          'total_count',
        ].reduce<boolean>((prev, cur) => prev && cur in data, true)
      ) {
        throw new Error('some fields are missing from response body');
      }
      const totalCount: number = data.total_count;

      const prev: string | null = data.prev;
      const next: string | null = data.next;

      const posts: Post[] = data.data.map((x: any) => ({
        id: x._id as string,
        title: x.title as string,
        slug: x.slug as string,
        content: x.content as string,
        media: x.media as string[],
        tags: x.tags as string[],
        collections: x.collections as string[],
        status: x.status as PostStatusType,
        published: new Date(x.published),
        lastUpdated: new Date(x.last_updated),
        featured: x.featured as boolean,
      }));

      return [posts, totalCount, prev, next, null];
    } catch (e) {
      throw new Error('Result data field is not in expected format.');
    }
  }

  public async getOne(
    req: GetOneRequest,
    useAuth: boolean = true
  ): Promise<[Post, Error | null]> {
    const url: string = this.urlFactory.createGetOneUrl(req);

    let token: string | undefined;
    if (useAuth) {
      token = await this.firebaseAuth.currentUser?.getIdToken();
    }
    const [data, err] = await makeRequest(GET, url, token);
    if (err) {
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
  }

  public async create(req: CreateRequest): Promise<[Post, Error | null]> {
    const url: string = this.urlFactory.createCreateUrl(req);
    const token = await this.firebaseAuth.currentUser?.getIdToken();
    const [data, err] = await makeRequest(POST, url, token, req);
    logger.debug(NAMESPACE, 'Create result', { data, err });
    if (err) {
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

    return [post, null];
  }

  public async update(req: UpdateRequest): Promise<boolean> {
    const url: string = this.urlFactory.createUpdateUrl(req);
    const token = await this.firebaseAuth.currentUser?.getIdToken();
    const [data, err] = await makeRequest(PUT, url, token, req);

    logger.debug(NAMESPACE, 'Update result', { data, err });

    if (err) {
      return false;
    }

    return true;
  }

  public async delete(req: DeleteRequest): Promise<boolean> {
    const url: string = this.urlFactory.createDeleteUrl(req);
    const token = await this.firebaseAuth.currentUser?.getIdToken();
    const [data, err] = await makeRequest(DELETE, url, token);

    if (err) {
      logger.debug(NAMESPACE, 'Error', err);
      return false;
    }

    const success: boolean = data;
    logger.debug(NAMESPACE, success ? 'true' : 'false');
    return success;
  }
}

export const createBlogClient = (
  urlFactory: IUrlFactory,
  firebaseAuth: FirebaseAuth,
  version?: VersionType
): IBlogClient => {
  return new BlogClient(urlFactory, firebaseAuth, version);
};

export default BlogClient;
