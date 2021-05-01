import {
  POST_LIST_FAIL,
  POST_LIST_REQUEST,
  POST_LIST_SUCCESS,
  POST_CREATE_FAIL,
  POST_CREATE_REQUEST,
  POST_CREATE_SUCCESS,
  POST_DELETE_FAIL,
  POST_DELETE_REQUEST,
  POST_DELETE_SUCCESS,
  POST_LIKE_FAIL,
  POST_LIKE_REQUEST,
  POST_LIKE_SUCCESS,
  POST_COMMENT_CREATE_FAIL,
  POST_COMMENT_CREATE_REQUEST,
  POST_COMMENT_CREATE_SUCCESS,
  POST_COMMENT_DELETE_FAIL,
  POST_COMMENT_DELETE_REQUEST,
  POST_COMMENT_DELETE_SUCCESS,
  POST_DELETE_BY_USER_FAIL,
  POST_DELETE_BY_USER_REQUEST,
  POST_DELETE_BY_USER_SUCCESS,
} from "../constans/postConstans";

export const postListReducer = (state = {}, action) => {
  switch (action.type) {
    case POST_LIST_REQUEST:
      return { loading: true, ...state };
    case POST_LIST_SUCCESS:
      return { loading: false, posts: action.payload };
    case POST_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const postCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case POST_CREATE_REQUEST:
      return { loading: true };
    case POST_CREATE_SUCCESS:
      return { loading: false, postCreated: action.payload };
    case POST_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const postDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case POST_DELETE_REQUEST:
      return { loading: true };
    case POST_DELETE_SUCCESS:
      return { loading: false, message: action.payload };
    case POST_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const postLikeReducer = (state = {}, action) => {
  switch (action.type) {
    case POST_LIKE_REQUEST:
      return { loading: true };
    case POST_LIKE_SUCCESS:
      return { loading: false, message: action.payload };
    case POST_LIKE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const postCreateCommentReducer = (state = {}, action) => {
  switch (action.type) {
    case POST_COMMENT_CREATE_REQUEST:
      return { loading: true };
    case POST_COMMENT_CREATE_SUCCESS:
      return { loading: false, created: action.payload };
    case POST_COMMENT_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const postDeleteCommentReducer = (state = {}, action) => {
  switch (action.type) {
    case POST_COMMENT_DELETE_REQUEST:
      return { loading: true };
    case POST_COMMENT_DELETE_SUCCESS:
      return { loading: false, post: action.payload };
    case POST_COMMENT_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const postDeleteByUserReducer = (state = {}, action) => {
  switch (action.type) {
    case POST_DELETE_BY_USER_REQUEST:
      return { loading: true };
    case POST_DELETE_BY_USER_SUCCESS:
      return { loading: false, post: action.payload };
    case POST_DELETE_BY_USER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
