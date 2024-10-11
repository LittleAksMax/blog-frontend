import { FC } from 'react';
import PostListContainer from '../../components/post/list/PostList';
import Page from '../../components/common/page/Page';

const Posts: FC = () => {
  return (
    <Page>
      <PostListContainer />
    </Page>
  );
};

export default Posts;
