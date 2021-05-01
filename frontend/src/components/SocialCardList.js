import React, { useEffect } from "react";
import SocialCard from "./SocialCard";
import { useDispatch, useSelector } from "react-redux";
import { getPostList } from "../actions/postActions";

const SocialCardList = ({ pageNumber }) => {
  const dispatch = useDispatch();

  const postCreate = useSelector((state) => state.postCreate);
  const { postCreated } = postCreate;

  const postDelete = useSelector((state) => state.postDelete);
  const { message } = postDelete;

  const postLike = useSelector((state) => state.postLike);
  const { message: messageLike } = postLike;

  const postCommentCreate = useSelector((state) => state.postCommentCreate);
  const { created } = postCommentCreate;
  const postCommentDelete = useSelector((state) => state.postCommentDelete);
  const { post: postDeleted } = postCommentDelete;

  useEffect(() => {
    dispatch(getPostList(pageNumber));
  }, [dispatch, postCreated, message, messageLike, created, postDeleted, pageNumber]);
  const postList = useSelector((state) => state.postList);

  const { posts } = postList;

  return (
    <div>
      {posts &&
        posts.posts.map((post) => <SocialCard data={post} key={post._id} />)}
    </div>
  );
};

export default SocialCardList;
