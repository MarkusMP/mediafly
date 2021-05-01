const express = require("express");
const {
  createPost,
  getPosts,
  deletePost,
  likePost,
  commentPost,
  commentDeletePost,
  deletePostsByUser,
} = require("../controllers/postController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router
  .route("/:id")
  .delete(protect, deletePost)
  .put(protect, likePost)
  .post(protect, commentPost);
router.route("/:id/comment").delete(protect, commentDeletePost);
router
  .route("/")
  .get(getPosts)
  .post(protect, createPost)
  .delete(protect, deletePostsByUser);

module.exports = router;
