import { combineReducers } from "redux";
import jwtReducer from "./reducers/jwt";
import { configureStore } from "@reduxjs/toolkit";

// initial states here
const initalState = { jwt_token: null };

const reducer = combineReducers({
  jwtReducer,
});

// creating store
export const store = configureStore({
  initalState,
  reducer,
});
