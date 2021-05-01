import {
  POST_LIST_SUCCESS,
  POST_LIST_REQUEST,
  POST_LIST_FAIL,
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
import axios from "axios";

export const getPostList = (pageNumber = "") => async (dispatch) => {
  try {
    dispatch({ type: POST_LIST_REQUEST });

    const { data } = await axios.get(`/api/posts/?pageNumber=${pageNumber}`);

    dispatch({ type: POST_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: POST_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createPost = (text) => async (dispatch, getState) => {
  try {
    dispatch({ type: POST_CREATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: userInfo.token,
      },
    };

    const { data } = await axios.post("/api/posts", { text }, config);

    dispatch({ type: POST_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: POST_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deletePost = (postId) => async (dispatch, getState) => {
  try {
    dispatch({ type: POST_DELETE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: userInfo.token,
      },
    };

    const { data } = await axios.delete(`/api/posts/${postId}`, config);

    dispatch({ type: POST_DELETE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: POST_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const likePost = (postId) => async (dispatch, getState) => {
  try {
    dispatch({ type: POST_LIKE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: userInfo.token,
      },
    };

    const { data } = await axios.put(`/api/posts/${postId}`, {}, config);

    dispatch({ type: POST_LIKE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: POST_LIKE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteCommentPost = (postId, commentId, commentPostById) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: POST_COMMENT_DELETE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const { data } = await axios.delete(`/api/posts/${postId}/comment`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: userInfo.token,
      },
      data: {
        commentId,
        commentPostById,
      },
    });

    dispatch({ type: POST_COMMENT_DELETE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: POST_COMMENT_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createCommentPost = (postId, text) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: POST_COMMENT_CREATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: userInfo.token,
      },
    };

    const { data } = await axios.post(`/api/posts/${postId}`, { text }, config);

    dispatch({ type: POST_COMMENT_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: POST_COMMENT_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deletePostsByUser = () => async (dispatch, getState) => {
  try {
    dispatch({ type: POST_DELETE_BY_USER_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: userInfo.token,
      },
    };

    const { data } = await axios.delete(`/api/posts`, config);

    dispatch({ type: POST_DELETE_BY_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: POST_DELETE_BY_USER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
