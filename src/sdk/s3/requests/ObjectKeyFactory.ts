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
        // TODO: figure out standard for banner,
        // NOTE: might be easier to put banner as a field into Post
        return `${post.slug}/shityourself.jpg`
    }
}

export default ObjectKeyFactory;
