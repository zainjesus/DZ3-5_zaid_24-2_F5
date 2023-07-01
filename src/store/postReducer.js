import axios from 'axios';

const initialState = {
  posts: [],
};

const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';
const TOGGLE_COMMENTS = 'TOGGLE_COMMENTS';
const COMMENTS_LOADED = 'COMMENTS_LOADED';

export const fetchPostsSuccess = (posts) => ({
  type: FETCH_POSTS_SUCCESS,
  payload: posts,
});

export const toggleComments = (postId) => ({
  type: TOGGLE_COMMENTS,
  payload: postId,
});

export const commentsLoaded = (postId, comments) => ({
  type: COMMENTS_LOADED,
  payload: { postId, comments },
});

export const fetchPosts = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get('https://dummyjson.com/posts?limit=10');
      const posts = response.data.data;

      dispatch(fetchPostsSuccess(posts));
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    }
  };
};

export const fetchCommentsByPostId = (postId) => {
  return async (dispatch) => {
      const response = await axios.get(`https://dummyjson.com/comments/post/${postId}`);
      const comments = response.data;

      dispatch(commentsLoaded(postId, comments));
  };
};

export const postReducer = (state = initialState, action) => {
  {
    const { posts } = state;
    let updatedPosts;

    switch (action.type) {
      case FETCH_POSTS_SUCCESS:
        updatedPosts = action.payload.map((post) => ({
          ...post,
          showComments: false,
          comments: [],
        }));
        return { ...state, posts: updatedPosts };
      case TOGGLE_COMMENTS:
        updatedPosts = posts.map((post) => {
          if (post.id === action.payload) {
            const showComments = !post.showComments;

            if (showComments && post.comments.length === 0) {
              dispatch(fetchCommentsByPostId(post.id));
            }

            return { ...post, showComments };
          }
          return post;
        });
        return { ...state, posts: updatedPosts };
      case COMMENTS_LOADED:
        const { postId, comments } = action.payload;
        const updatedPostsWithComments = posts.map((post) => {
          if (post.id === postId) {
            return { ...post, comments };
          }
          return post;
        });
        return { ...state, posts: updatedPostsWithComments };
      default:
        return state;
    }
  }
};
