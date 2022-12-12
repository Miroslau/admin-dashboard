import { combineReducers } from "@reduxjs/toolkit";

import globalReducer from "./global-reducer";
import { api } from "../state/api/api";

const rootReducer = combineReducers({
  global: globalReducer,
  [api.reducerPath]: api.reducer,
});

export default rootReducer;
