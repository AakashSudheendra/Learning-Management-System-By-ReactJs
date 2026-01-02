import { Course } from "../models/cource.model.js";
import { Lecture } from "../models/lecture.model.js";
import { User } from "../models/user.model.js";
import {
  deleteMediaFromCloudinary,
  deleteVideoFromCloudinary,
  uploadMedia,
} from "../utils/cloudinary.js";

export const createCource = async (req, res) => {
  try {
    const { courceTitle, category } = req.body;
    if (!courceTitle || !category) {
      return res.status(400).json({
        message: "Category and Cource Title are Required",
        success: false,
      });
    }
    const cource = await Course.create({
      courceTitle,
      category,
      creator: req.id,
    });

    return res.status(201).json({
      cource,
      message: "Cource Created Successfully",
      success: true,
    });
  } catch (error) {
    return resizeBy.status(500).json({
      message: "Failed To create Cource",
      success: false,
    });
  }
};

export const getCreatorCources = async (req, res) => {
  try {
    const userId = req.id;
    const cources = await Course.find({ creator: userId });
    if (!cources) {
      return res.status(404).json({
        cources: [],
        message: "Cource Not Found",
      });
    }
    return res.status(200).json({
      cources,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed To Get Cource",
      success: false,
    });
  }
};

export const editCource = async (req, res) => {
  try {
    const courceId = req.params.courceId;
    const {
      courceTitle,
      subTitle,
      description,
      category,
      courceLevel,
      courcePrice,
    } = req.body;
    const thumbanil = req.file;

    let cource = await Course.findById(courceId);
    if (!cource) {
      return res.status(404).json({
        message: "Cource Not Found!",
      });
    }
    let courceThumbanil;
    if (thumbanil) {
      if (cource.courceThumbanil) {
        const publicId = cource.courceThumbanil.split("/").pop().split(".")[0];
        await deleteMediaFromCloudinary(publicId);
      }
      //upload thumbanil to cloudinary
      courceThumbanil = await uploadMedia(thumbanil.path);
    }

    const updatedData = {
      courceTitle,
      subTitle,
      description,
      category,
      courceLevel,
      courcePrice,
      courceThumbanil: courceThumbanil?.secure_url,
    };

    cource = await Course.findByIdAndUpdate(courceId, updatedData, {
      new: true,
    });

    return res.status(200).json({
      cource,
      message: "Cource Updated Successfully. ",
    });
  } catch (error) {
    return res.status(500).json({
      message: "failed To update Cource",
      success: false,
    });
  }
};

export const getCourceById = async (req, res) => {
  try {
    const { courceId } = req.params;
    const cource = await Course.findById(courceId);
    if (!cource) {
      return res.status(404).json({
        message: "Cource Not Found",
      });
    }
    return res.status(200).json({
      cource,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "failed To get Cource by id",
      success: false,
    });
  }
};

//lecture controller js

export const createLecture = async (req, res) => {
  try {
    const { lectureTitle } = req.body;
    const { courceId } = req.params;
    if (!lectureTitle || !courceId) {
      return res.status(400).json({
        message: "Lecture title Is Required",
        success: false,
      });
    }
    const lecture = await Lecture.create({ lectureTitle });
    const course = await Course.findById(courceId);
    console.log(lectureTitle);
    if (course) {
      course.lectures.push(lecture._id);
      await course.save();
    }
    return res.status(201).json({
      lecture,
      message: "Lecture Created Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "failed To create Lecture",
      success: false,
    });
  }
};

export const getCourceLecture = async (req, res) => {
  try {
    const { courceId } = req.params;
    const cource = await Course.findById(courceId).populate("lectures");
    if (!cource) {
      return res.status(404).json({
        message: "Cource Not Found",
      });
    }
    return res.status(200).json({
      lectures: cource.lectures,
    });
  } catch (error) {
    return res.status(500).json({
      message: "failed To get Lecture",
      success: false,
    });
  }
};
export const editLecture = async (req, res) => {
  try {
    const { lectureTitle, videInfo, isPreviewFree } = req.body;
    const { courceId, lectureId } = req.params;
    const lecture = await Lecture.findById(lectureId);
    if (!lecture) {
      return res.status(404).json({
        message: "Lecture Not Found",
      });
    }
    //update lecture
    if (lectureTitle) lecture.lectureTitle = lectureTitle;
    if (videInfo?.videoUrl) lecture.videoUrl = videInfo.videoUrl;
    if (videInfo?.publicId) lecture.publicId = videInfo.publicId;
    lecture.isPreviewFree = isPreviewFree;

    await lecture.save();
    //ensuring cource still have lecture id
    const course = await Course.findById(courceId);
    if (course && !course.lectures.includes(lecture._id)) {
      course.lectures.push(lecture._id);
      await lecture.save();
    }
    return res.status(200).json({
      lecture,
      message: "Lecture Updated Successfully",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "failed To edit Lecture",
      success: false,
    });
  }
};
export const removeCource = async (req, res) => {
  try {
    const { courceId } = req.params;
    const cource = await Course.findByIdAndDelete(courceId);
    if (!cource) {
      return res.status(404).json({
        message: "Cource Not Found to Delete",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Cource Deleted Successfully",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "failed To remove Cource",
      success: false,
    });
  }
};
export const removeLecture = async (req, res) => {
  try {
    const { lectureId } = req.params;
    const lecture = await Lecture.findByIdAndDelete(lectureId);
    if (!lecture) {
      return res.status(404).json({
        message: "Lecture Not Found",
        success: false,
      });
    }
    //delete lecture from cloudinary

    if (lecture.publicId) {
      await deleteVideoFromCloudinary(lecture.publicId);
    }
    //remove lecture from cource as well

    await Course.updateOne(
      { lectures: lectureId }, //find the cource that contains the lecture in lectures
      { $pull: { lectures: lectureId } } //remove the lectures id from the lecture array
    );
    return res.status(200).json({
      message: "Lecture removed SuccessFully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "failed To Remove Lecture",
      success: false,
    });
  }
};

export const getLectureById = async (req, res) => {
  try {
    const { lectureId } = req.params;
    const lecture = await Lecture.findById(lectureId);
    if (!lecture) {
      return res.status(404).json({
        message: "Lecture Not Found!",
        success: false,
      });
    }
    return res.status(200).json({
      lecture,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "failed To get Lecture By Id",
      success: false,
    });
  }
};

//publish ubpublish logic

export const togglePublish = async (req, res) => {
  try {
    const { courceId } = req.params;
    const { publish } = req.query;
    const cource = await Course.findById(courceId);
    if (!cource) {
      return res.status(404).json({
        message: "Cource Not Found",
      });
    }
    cource.isPublished = publish === "true";
    await cource.save();
    const statusMessage = cource.isPublished ? "Published" : "UnPublished";
    return res.status(200).json({
      message: `Cource is ${statusMessage}`,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "failed To Publish Lecture",
      success: false,
    });
  }
};

///cource published

export const getPublishedCource = async (_, res) => {
  try {
    const cources = await Course.find({ isPublished: true }).populate({
      path: "creator",
      select: "name photoUrl",
    });
    if (!cources) {
      return res.status(404).json({
        message: "Something Went Wrong while fetching cources",
      });
    }
    return res.status(200).json({
      cources,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "failed To Publish Lecture",
      success: false,
    });
  }
};
