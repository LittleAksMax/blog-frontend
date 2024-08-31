export type VersionType = 'v1';

const newestClientVersion = (): VersionType => {
  return 'v1';
};

export interface IBlogClient {}

class BlogClient {
  private version: VersionType = newestClientVersion();

  constructor(version?: VersionType) {
    if (version) {
      this.version = version;
    }
  }
}

export const createBlogClient = (version?: VersionType): IBlogClient => {
  return new BlogClient(version);
};

export default BlogClient;
