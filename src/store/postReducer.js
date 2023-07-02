import axios from 'axios';

const initialState = {
  items: [],
  comments: {},
};

export const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_POSTS':
      return { ...state, items: action.payload };
    case 'SET_COMMENTS':
      return {
        ...state,
        comments: {
          ...state.comments,
          [action.payload.postId]: action.payload.comments,
        },
      };
    default:
      return state;
  }
};

export const fetchPosts = () => {
  return (dispatch) => {
    axios.get('https://dummyjson.com/posts?limit=10').then((res) => {
      dispatch({ type: 'SET_POSTS', payload: res.data.posts });
    });
  };
};

export const fetchComments = (postId) => {
  return (dispatch) => {
    axios.get(`https://dummyjson.com/comments/post/${postId}`).then((res) => {
      dispatch({ type: 'SET_COMMENTS', payload: { postId, comments: res.data.comments } });
    });
  };
};

