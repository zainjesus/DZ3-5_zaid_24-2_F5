import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, toggleComments } from '../store/postReducer';

const Post = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const handleToggleComments = (postId) => {
    dispatch(toggleComments(postId));
  };

  return (
    <div>
      <h1>Posts</h1>
      {posts.map((post) => (
        <div key={post.id}>
          <h3 onClick={() => handleToggleComments(post.id)}>{post.title}</h3>
          {post.showComments && (
            <ul>
              {post.comments.map((comment) => (
                <li key={comment.id}>{comment.body}</li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

export default Post;
