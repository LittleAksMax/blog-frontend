type PaginationFilter = {
  pageSize?: number;
  pageNum?: number;
};

export const PostStatus = {
  Draft: 'Draft',
  Published: 'Published',
  Archived: 'Archived',
  Removed: 'Removed',
};

export type PostStatusType = 'Draft' | 'Published' | 'Archived' | 'Removed';

export type GetAllRequest = {
  title?: string;
  tags?: string[];
  collections?: string[];
  featured?: boolean;
  paginationFilter: PaginationFilter;
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
  status: PostStatusType;
  featured: boolean;
};

export type ArchiveRequest = {
  id: string;
};

export type DeleteRequest = {
  id: string;
};
