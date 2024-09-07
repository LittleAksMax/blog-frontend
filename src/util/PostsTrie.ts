import { Post } from '../sdk/types';

/**
 * Linked objects used in the PostsCollection underlying
 * Trie data structure.
 */
class CharNode {
  private char: string;
  private post: Post | null;
  private children: { [char: string]: CharNode };

  constructor(c: string) {
    if (c.length !== 1) {
      throw new Error('`char` parameter must have length 1');
    }
    this.char = c;
    this.post = null;
    this.children = {};
  }

  public getCharacter() {
    return this.char;
  }

  public getPost(): Post | null {
    return this.post;
  }

  public setPost(post: Post | null) {
    this.post = post;
  }

  public getChild(char: string): CharNode | null {
    if (char.length !== 1) {
      throw new Error('`char` parameter must have length 1');
    }
    return this.children[char] ?? null;
  }

  public addChild(char: string) {
    if (char.length !== 1) {
      throw new Error('`char` parameter must have length 1');
    }
    if (char in this.children) {
      throw new Error('cannot add child that is already present');
    }

    this.children[char] = new CharNode(char);
  }

  public forEachChild(callback: (c: CharNode) => void) {
    for (const child in this.children) {
      callback(this.children[child]);
    }
  }
}

/**
 * A Trie implemented with the search key as the slug
 * of the Post objects it stores.
 */
export class PostsCollection {
  private root: CharNode;

  constructor() {
    this.root = new CharNode('\0');
  }

  /**
   * Adds an entry to the PostsCollection.
   * @param post post object to add or update existing post to
   */
  public put(post: Post) {
    const postSlug: string = post.slug;
    let idx: number = 0;
    let tmp: CharNode = this.root;
    while (idx !== postSlug.length) {
      const char = postSlug.charAt(idx);
      if (!tmp.getChild(char)) {
        tmp.addChild(char);
      }

      // `!` because we can assert it's non-null nature
      tmp = tmp.getChild(char)!;
      idx++;
    }

    tmp.setPost(post);
  }

  /**
   * Remove a Post by its slug from the PostsCollection.
   * @param slug slug of post to remove
   * @returns true if successfully removed and false if not present.
   */
  public remove(slug: string): boolean {
    let idx: number = 0;
    let tmp: CharNode = this.root;
    while (idx !== slug.length) {
      const char = slug.charAt(idx);
      if (!tmp.getChild(char)) {
        return false;
      }

      // `!` because we can assert it's non-null nature
      tmp = tmp.getChild(char)!;
      idx++;
    }

    tmp.setPost(null);

    return true;
  }

  /**
   * Fetch a single Post object from the PostsCollection.
   * @param slug the slug to search for
   * @returns the Post with the given slug, null if it is not found.
   */
  public get(slug: string): Post | null {
    let idx: number = 0;
    let tmp: CharNode = this.root;
    while (idx !== slug.length) {
      const char = slug.charAt(idx);
      if (!tmp.getChild(char)) {
        return null;
      }

      // `!` because we can assert it's non-null nature
      tmp = tmp.getChild(char)!;
      idx++;
    }

    return tmp.getPost();
  }

  /**
   * Returns all entries that start from this node
   * in the Trie that are valid entries.
   * @param root current CharNode in recursion.
   * @param posts passed state to modify through recursion
   */
  private getAllFromNode(root: CharNode | null, posts: Post[]) {
    if (!root) {
      return;
    }

    const post: Post | null = root.getPost();
    if (post) {
      posts.push(post);
    }

    root.forEachChild((c) => this.getAllFromNode(c, posts));
  }

  /**
   * Fetch a list of stored Post objects that have a specific
   * prefix in their slug.
   * @param slugPrefix slug prefix to use as search term
   * @returns list of matching Post objects
   */
  public getAllWithPrefix(slugPrefix: string): Post[] {
    let idx: number = 0;
    let tmp: CharNode = this.root;
    while (idx !== slugPrefix.length) {
      const char = slugPrefix.charAt(idx);
      if (!tmp.getChild(char)) {
        return [];
      }

      // `!` because we can assert it's non-null nature
      tmp = tmp.getChild(char)!;
      idx++;
    }

    const results: Post[] = [];
    this.getAllFromNode(tmp, results);
    return results;
  }
}

export default PostsCollection;
