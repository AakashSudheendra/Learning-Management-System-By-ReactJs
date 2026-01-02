import mongoose, { mongo } from "mongoose";

const courceSchema=new mongoose.Schema({
    courceTitle:{
        type:String,
        required:true
    },
    subTitle:{
        type:String,
    },
    description:{
        type:String
    },
    category:{
        type:String,
        required:true
    },
    courceLevel:{
        type:String,
        enum:["Beginner","Medium","Advance"]
    },
    courcePrice:{
        type:Number
    },
    courceThumbanil:{
        type:String
    },
    enrolledStudents:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        }
    ],
    lectures:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Lecture"
        }
    ],
    creator:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    isPublished:{
        type:Boolean,
        default:false
    }

},{timestamps:true})

export const Course=mongoose.model("Cource",courceSchema)