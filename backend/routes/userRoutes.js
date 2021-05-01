const express = require("express");
const {
  registerUser,
  authUser,
  updateUserProfile,
  getUserProfile,
  getUserById,
  deleteUserProfile,
  getUsers,
  followUser,
} = require("../controllers/userController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").post(registerUser).get(getUsers);
router.route("/login").post(authUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)
  .delete(protect, deleteUserProfile);
router.route("/:id").get(getUserById).post(protect, followUser);

module.exports = router;
