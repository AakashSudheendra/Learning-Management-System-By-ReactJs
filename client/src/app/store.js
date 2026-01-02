import {configureStore} from "@reduxjs/toolkit"
import authReducer from "../feautures/authSlice.js"
import rootReducer from "./rootReducer.js"
import { authApi } from "@/feautures/api/authApi.js"
import { courceApi } from "@/feautures/api/courceApi.js"

export const appStore=configureStore({
    reducer:rootReducer,
    middleware:(defaultMiddleware)=>defaultMiddleware().concat(authApi.middleware,courceApi.middleware)
})

const initializeApp=async()=>{
    await appStore.dispatch(authApi.endpoints.loadUser.initiate({},{forceRefetch:true}))
}
initializeApp();