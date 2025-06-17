export type PostStatusType = 'Draft' | 'Published' | 'Archived' | 'Deleted';

export type Post = {
  id: string;
  title: string;
  slug: string;
  content: string;
  media: string[];
  banner: string; // object key from root of banner image, empty if none exists
  tags: string[];
  collections: string[];
  status: PostStatusType;
  published: Date;
  lastUpdated: Date;
  featured: boolean;
};
