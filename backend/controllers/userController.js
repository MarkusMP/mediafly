const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateToken");
const User = require("../models/UserModel");

// @desc     Register User
// @route    POST /api/users
// @access   Public
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password, avatar, bio } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    username,
    email,
    password,
    avatar,
    bio,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      avatar: user.avatar,
      bio: user.bio,
      followers: user.followers,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc     Auth user & get token
// @route    POST /api/users/login
// @access   Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      avatar: user.avatar,
      bio: user.bio,
      followers: user.followers,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Credentials");
  }
});

// @desc     Get all Users
// @route    GET /api/users/
// @access   Public
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find(
    {},
    " -isAdmin -__v -createdAt -updatedAt -password"
  );
  res.json(users);
});

// @desc     Get user Profile
// @route    GET /api/users/profile
// @access   Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(
    req.user._id,
    "-isAdmin -password -updatedAt"
  );

  res.json(user);
});

// @desc     Update user
// @route    PUT /api/users/profile
// @access   Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const { bio, email, avatar, username } = req.body;

  const user = await User.findById(req.user._id, "-password");

  if (user) {
    (user.email = email),
      (user.bio = bio),
      (user.avatar = avatar),
      (user.username = username);

    const updatedUser = await user.save();
    res.json(updatedUser);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc     Delete user/profile
// @route    DELETE /api/users/profile
// @access   Private
const deleteUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.remove();
    res.json({ msg: "user Deleted" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc     get User by id
// @route    get /api/users/:id
// @access   Public
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(
    req.params.id,
    "-isAdmin -password -updatedAt"
  );

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc     Follow Profile
// @route    post /api/users/:id
// @access   Private
const followUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  const index = user.followers.indexOf(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  } else if (req.params.id === req.user._id) {
    res.status(401);
    throw new Error("You can't follow yourself");
  }

  if (index < 0) {
    await user.update({ $push: { followers: req.user._id } });
    await user.save();
    res.json({ msg: "Followed" });
  } else {
    user.followers.splice(index, 1);
    await user.save();
    res.json({ msg: "unfollowed" });
  }
});

module.exports = {
  registerUser,
  authUser,
  getUsers,
  getUserProfile,
  updateUserProfile,
  getUserById,
  deleteUserProfile,
  followUser,
};
