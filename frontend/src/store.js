import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  userLoginReducer,
  userGetProfileReducer,
  userEditReducer,
  userRegisterReducer,
  userGetProfileIdReducer,
  userFollowReducer,
  userDeleteReducer,
} from "./reducers/userReducers";

import {
  postListReducer,
  postCreateReducer,
  postDeleteReducer,
  postLikeReducer,
  postCreateCommentReducer,
  postDeleteCommentReducer,
  postDeleteByUserReducer,
} from "./reducers/postReducer";

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userGetProfileReducer,
  userIdDetails: userGetProfileIdReducer,
  userEdit: userEditReducer,
  userFollow: userFollowReducer,
  userDelete: userDeleteReducer,
  postList: postListReducer,
  postCreate: postCreateReducer,
  postDelete: postDeleteReducer,
  postLike: postLikeReducer,
  postCommentCreate: postCreateCommentReducer,
  postCommentDelete: postDeleteCommentReducer,
  postDeleteUser: postDeleteByUserReducer,
});

const initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
