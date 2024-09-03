import { VersionType } from '../client';
import {
  CreateRequest,
  DeleteRequest,
  GetAllRequest,
  GetOneRequest,
  UpdateRequest,
} from './requests';

export interface IUrlFactory {
  setVersion: (version: VersionType) => void;
  createGetOneUrl: (request: GetOneRequest) => string;
  createGetAllUrl: (request: GetAllRequest) => string;
  createCreateUrl: (request: CreateRequest) => string;
  createUpdateUrl: (request: UpdateRequest) => string;
  createDeleteUrl: (request: DeleteRequest) => string;
}

class UrlFactory implements IUrlFactory {
  private baseUrl: string = '';
  private version: VersionType = null!;

  constructor(apiBaseUrl: string) {
    this.baseUrl = apiBaseUrl;
  }

  public setVersion = (version: VersionType) => {
    this.version = version;
  };

  public createGetAllUrl = (req: GetAllRequest) => {
    // TODO: add query parameters
    return `${this.baseUrl}/api/${this.version}/posts/`;
  };

  public createGetOneUrl = (req: GetOneRequest) => {
    return `${this.baseUrl}/api/${this.version}/posts/${req.idOrSlug}`;
  };

  public createCreateUrl = (_: CreateRequest) => {
    return `${this.baseUrl}/api/${this.version}/posts/`;
  };

  public createUpdateUrl = (req: UpdateRequest) => {
    return `${this.baseUrl}/api/${this.version}/posts/${req.id}`;
  };

  public createDeleteUrl = (req: DeleteRequest) => {
    return `${this.baseUrl}/api/${this.version}/posts/${req.id}`;
  };
}

export default UrlFactory;
