import { stringList } from 'aws-sdk/clients/datapipeline';

export type GetAllRequest = {
  title: string;
  tags: string[];
  collections: string[];
  featured: boolean | null;
};

export type PaginationFilter = {
  pageNum: number;
  pageSize: number;
};

export type GetOneRequest = {
  idOrSlug: string;
};

export type CreateRequest = {
  title: string;
  content: string;
  collections: string[];
  tags: string[];
  featured: boolean;
};

export type UpdateRequest = {
  id: string;
  title: string;
  content: string;
  collections: string[];
  tags: string[];
  status: 'Draft' | 'Published' | 'Archived' | 'Removed';
  featured: boolean;
};

export type DeleteRequest = {
  id: string;
};
