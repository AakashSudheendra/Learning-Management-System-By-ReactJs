import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";
import { deleteMediaFromCloudinary, uploadMedia } from "../utils/cloudinary.js";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are Required",
      });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "User Already Exists Please Login",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      name,
      email,
      password: hashedPassword,
    });
    return res.status(201).json({
      success: true,
      message: "Account Created Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "failed to Register",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are Required",
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Incorrect email or Password",
      });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: "Incorrect email or Password",
      });
    }
    //after matching password we need to create token for login expiry that stores in cookie
    generateToken(res, user, `Welcome back ${user.name}`);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "failed to Login",
    });
  }
};

export const logout = (_, res) => {
  try {
    res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logged Out Successfully",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "failed to LogOut",
    });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const userId = req.id;
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({
        message: "Profile Not Found",
        success: false,
      });
    }
    // console.log(user);
    
    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "failed to Load User",
    });
  }
};

export const updateProfile=async(req,res)=>{
  try {
    const userId=req.id
    const {name}=req.body
    const profilePhoto=req.file 
    const user=await User.findById(userId)

    if(!user){
      return res.status(404).json({
        message:"User Not found",
        success:false
      })
    }

    // extract publicid from the old picture if url exists

    if(user?.photoUrl){
      const publicId=user.photoUrl.split("/").pop().split(".")[0];
      await deleteMediaFromCloudinary(publicId)
    }
    const cloudResponse=await uploadMedia(profilePhoto.path)
    const photoUrl=cloudResponse.secure_url
    console.log(photoUrl)

    const updatedData={name,photoUrl}
    const updateUser=await User.findByIdAndUpdate(userId,updatedData,{new:true}).select("-password")

    return res.status(200).json({
      success:true,
      user:updateUser,
      message:"Profile updated Successfully"
    })

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "failed to Update User",
    });
  }
}
