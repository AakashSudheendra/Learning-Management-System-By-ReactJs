import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import upload from "../utils/multer.js";
import {
  createCource,
  createLecture,
  editCource,
  editLecture,
  getCourceById,
  getCourceLecture,
  getCreatorCources,
  getLectureById,
  getPublishedCource,
  removeCource,
  removeLecture,
  togglePublish,
} from "../controllers/cource.controller.js";
import uplaod from "../utils/multer.js";
const courceRoute = express.Router();

courceRoute.route("/").post(isAuthenticated, createCource);
courceRoute.route("/published-cource").get(isAuthenticated,getPublishedCource)
courceRoute.route("/").get(isAuthenticated, getCreatorCources);
courceRoute
  .route("/:courceId")
  .put(isAuthenticated, upload.single("courceThumbanil"), editCource);

courceRoute.route("/remove/:courceId").delete(removeCource);

courceRoute.route("/:courceId").get(isAuthenticated, getCourceById);
courceRoute.route("/:courceId/lecture").post(isAuthenticated, createLecture);
courceRoute.route("/:courceId/lecture").get(isAuthenticated, getCourceLecture);
//lectures
courceRoute
  .route("/:courceId/lecture/:lectureId")
  .post(isAuthenticated, editLecture);
courceRoute
  .route("/:courceId/lecture/:lectureId")
  .delete(isAuthenticated, removeLecture);
courceRoute.route("/lecture/:lectureId").get(isAuthenticated, getLectureById);
courceRoute.route("/:courceId").patch(isAuthenticated,togglePublish)

export default courceRoute;
