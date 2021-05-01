const asyncHandler = require("express-async-handler");
const Post = require("../models/PostModel");

// @desc     Create Post
// @route    POST /api/posts/create
// @access   Private
const createPost = asyncHandler(async (req, res) => {
  const { text } = req.body;

  const post = await Post.create({
    postText: text,
    user: req.user._id,
  });

  if (post) {
    res.status(201).json(post);
  } else {
    res.status(400);
    throw new Error("Failed to post");
  }
});

// @desc     Get all Posts
// @route    GET /api/posts
// @access   Public
const getPosts = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;

  const count = await Post.countDocuments();

  const posts = await Post.find({})
    .sort({ createdAt: -1 })
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .populate("user", "username _id avatar")
    .populate("comments.postedBy", "username _id avatar");

  res.json({ posts, page, pages: Math.ceil(count / pageSize) });
});

// @desc     delete Post
// @route    DELETE /api/posts/:id
// @access   Private
const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if ((req.user._id = post.user._id)) {
    await post.remove();
    res.json({ msg: "Post deleted successfully" });
  } else {
    res.status(401);
    throw new Error("user id doesn't match");
  }
});

// @desc     like & unlike post
// @route    PUT /api/posts/:id
// @access   Private
const likePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  const index = post.likes.indexOf(req.user._id);

  if (!post) {
    res.status(404);
    throw new Error("Post not found");
  }

  if (index < 0) {
    await post.update({ $push: { likes: req.user._id } });
    await post.save();
    res.json({ msg: "Post liked" });
  } else {
    post.likes.splice(index, 1);
    await post.save();
    res.json({ msg: "unliked" });
  }
});

// @desc     Comment on post
// @route    POST /api/posts/:id
// @access   Private
const commentPost = asyncHandler(async (req, res) => {
  const post = await await Post.findById(req.params.id);

  const { text } = req.body;

  if (!post) {
    res.status(404);
    throw new Error("Post not found");
  } else {
    await post.update({
      $push: {
        comments: {
          postedBy: req.user._id,
          text,
          username: req.user.username,
        },
      },
    });
    await post.save();
    res.json("Commented!");
  }
});

// @desc     delete comment on post
// @route    DELETE /api/posts/:id/comment
// @access   Private
const commentDeletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  const { commentPostById, commentId } = req.body;

  if (!post) {
    res.status(404);
    throw new Error("Post not found");
  }

  if (commentPostById === req.user.id) {
    await post.update({
      $pull: {
        comments: {
          _id: commentId,
        },
      },
    });
    await post.save();
    res.json(post);
  } else {
    res.status(401);
    throw new Error("You are not the owner of this comment");
  }
});

// @desc     delete posts by user
// @route    DELETE /api/posts/
// @access   Private
const deletePostsByUser = asyncHandler(async (req, res) => {
  await Post.deleteMany({ user: req.user.id });

  res.json({ msg: "Posts Deleted" });
});

module.exports = {
  createPost,
  getPosts,
  deletePost,
  likePost,
  commentPost,
  commentDeletePost,
  deletePostsByUser,
};
