import { Post } from "../../api/types";

export interface IObjectKeyFactory {
    createObjectKey(post: Post, filename: string): string;
    createBannerObjectKey(post: Post): string;
}

class ObjectKeyFactory {
    public createObjectKey(post: Post, filename: string): string {
        return `${post.slug}/${filename}`
    }

    public createBannerObjectKey(post: Post): string {
        // NOTE: might be easier to put banner as a field into Post
        return `${post.slug}/${post.banner}`
    }
}

export default ObjectKeyFactory;
