import express from 'express'
import { register , login, getUserProfile, logout,updateProfile } from '../controllers/user.controller.js'
import isAuthenticated from '../middlewares/isAuthenticated.js'
import upload from '../utils/multer.js'

const userRoute=express.Router()

userRoute.route("/register").post(register)
userRoute.route("/login").post(login)
userRoute.route("/logout").get(logout)
userRoute.route("/profile").get(isAuthenticated,getUserProfile)
userRoute.route("/profile/update").put(isAuthenticated,upload.single("profilePhoto"),updateProfile)
export default userRoute