import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../feautures/authSlice.js"
import { authApi } from "@/feautures/api/authApi";
import { courceApi } from "@/feautures/api/courceApi.js";

const rootReducer=combineReducers({
    [authApi.reducerPath]:authApi.reducer,
    [courceApi.reducerPath]:courceApi.reducer,
    auth:authReducer
});

export default rootReducer