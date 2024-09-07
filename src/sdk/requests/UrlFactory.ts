import { VersionType } from '../client';
import QueryBuilder from './QueryBuilder';
import {
  CreateRequest,
  DeleteRequest,
  GetAllRequest,
  GetOneRequest,
  UpdateRequest,
} from './requests';

export interface IUrlFactory {
  setVersion(version: VersionType): void;
  createGetOneUrl(req: GetOneRequest): string;
  createGetAllUrl(req: GetAllRequest): string;
  createCreateUrl(req: CreateRequest): string;
  createUpdateUrl(req: UpdateRequest): string;
  createDeleteUrl(req: DeleteRequest): string;
}

class UrlFactory implements IUrlFactory {
  private baseUrl: string = '';
  private version: VersionType = null!;

  constructor(apiBaseUrl: string) {
    this.baseUrl = apiBaseUrl;
  }

  public setVersion(version: VersionType) {
    this.version = version;
  }

  public createGetAllUrl(req: GetAllRequest) {
    const queryBuilder = new QueryBuilder(
      `${this.baseUrl}/api/${this.version}/posts/`
    );

    if (req.paginationFilter.pageSize) {
      queryBuilder.add('page_size', req.paginationFilter.pageSize);
    }
    if (req.paginationFilter.pageNum) {
      queryBuilder.add('page_num', req.paginationFilter.pageNum);
    }
    if (req.title && req.title.length > 0) {
      queryBuilder.add('title', req.title);
    }
    if (req.tags && req.tags.length > 0) {
      queryBuilder.addMany('tags', req.tags);
    }
    if (req.collections && req.collections.length > 0) {
      queryBuilder.addMany('collections', req.collections);
    }
    if (req.featured) {
      queryBuilder.add('featured', req.featured);
    }
    return queryBuilder.build();
  }

  public createGetOneUrl(req: GetOneRequest) {
    return `${this.baseUrl}/api/${this.version}/posts/${req.idOrSlug}`;
  }

  public createCreateUrl(_: CreateRequest) {
    return `${this.baseUrl}/api/${this.version}/posts/`;
  }

  public createUpdateUrl(req: UpdateRequest) {
    return `${this.baseUrl}/api/${this.version}/posts/${req.id}`;
  }

  public createDeleteUrl(req: DeleteRequest) {
    return `${this.baseUrl}/api/${this.version}/posts/${req.id}`;
  }
}

export default UrlFactory;
