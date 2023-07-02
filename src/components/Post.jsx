import React, { useEffect, useState } from 'react';
import { fetchPosts, fetchComments } from '../store/postReducer';
import { useDispatch, useSelector } from 'react-redux';

const Posts = () => {
  const posts = useSelector((state) => state.posts.items);
  const comments = useSelector((state) => state.posts.comments);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const [expandedPostId, setExpandedPostId] = useState(null);

  const handlePostClick = (postId) => {
    if (expandedPostId === postId) {
      setExpandedPostId(null);
    } else {
      setExpandedPostId(postId);
      if (!comments[postId]) {
        dispatch(fetchComments(postId));
      }
    }
  };

  return (
    <div>
      <h4>Posts</h4>
      <ul>
        {posts.map((post) => (
          <li key={post.id} onClick={() => handlePostClick(post.id)}>
            {post.title}
            {expandedPostId === post.id && (
              <ul>
                {comments[post.id] &&
                  comments[post.id].map((comment) => <li key={comment.id}>{comment.body}</li>)}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Posts;
