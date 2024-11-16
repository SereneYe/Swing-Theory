import { combineReducers } from "redux";
import { posts } from "./posts";
import { auth } from "./auth";

const Reducers = combineReducers({
  posts,
  auth,
});

export default Reducers;
