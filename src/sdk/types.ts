export type PostStatusType = 'Draft' | 'Published' | 'Archived' | 'Deleted';

export type Post = {
  id: string;
  title: string;
  slug: string;
  content: string;
  media: string[];
  tags: string[];
  collections: string[];
  status: PostStatusType;
  published: Date;
  lastUpdated: Date;
  featured: boolean;
};
