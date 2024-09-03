export type Post = {
  id: string;
  title: string;
  slug: string;
  content: string;
  media: string[];
  tags: string[];
  collections: string[];
  status: 'Draft' | 'Published' | 'Archived' | 'Deleted';
  published: Date;
  lastUpdated: Date;
  featured: boolean;
};
