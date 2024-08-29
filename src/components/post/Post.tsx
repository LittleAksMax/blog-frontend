import { FC } from 'react';
import Page from '../common/page/Page';
import PostBanner from './banner/PostBanner';
import PostContent from './content/PostContent';
import { useParams } from 'react-router-dom';
import NotFound from '../../routes/status/NotFound';

interface PostProps {}

const Post: FC<PostProps> = () => {
  const { id } = useParams();

  // if slug parameter not found, there is an issue
  if (!id) {
    alert('Invalid post label. Cannot identify post.');
    return <NotFound />;
  }

  // TODO: proper Post object and fetching data
  return (
    <Page>
      <PostBanner
        tags={['REST', 'Go', 'Docker', 'Kubernetes', 'Cloud', 'AWS']}
        title={'SAMPLE TITLE'}
        published={new Date()}
        lastModified={new Date()}
        author={'David Rosental'}
      />
      <PostContent content={'Some text'} />
    </Page>
  );
};

export default Post;
