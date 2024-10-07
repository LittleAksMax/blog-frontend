import { FC } from 'react';
import PostListContainer from '../../components/post/list/PostList';
import Navbar from '../../components/common/navbar/Navbar';

const Posts: FC = () => {
  return (
    <div>
      <Navbar />
      <PostListContainer />
    </div>
  );
};

export default Posts;
