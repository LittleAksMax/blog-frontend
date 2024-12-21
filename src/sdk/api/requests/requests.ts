type PaginationFilter = {
  pageSize?: number;
  pageNum?: number;
};

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
  status: 'Draft' | 'Published' | 'Archived' | 'Removed';
  featured: boolean;
};

export type DeleteRequest = {
  id: string;
};
