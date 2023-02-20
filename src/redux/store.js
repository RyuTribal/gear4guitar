import { combineReducers } from "redux";
import jwtReducer from "./reducers/jwt";
import basketReducer from "./reducers/basket";
import { configureStore } from "@reduxjs/toolkit";

// initial states here
const initalState = { jwt_token: null, basket: [], isAdmin: false };

const reducer = combineReducers({
  jwtReducer,
  basketReducer,
});

// creating store
export const store = configureStore({
  initalState,
  reducer,
});
