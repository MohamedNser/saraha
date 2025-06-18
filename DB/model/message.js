import {Schema , Types, model} from "mongoose";


const messageSchema = new Schema ({
text:{
        type:String,
        required:true
    },
    receiverId:{
        type:Types.ObjectId , ref:"User" , required:true
    },
    IsDeleted:{
        type:Boolean, default:false
    }
},{
    timestamps:true
})

export const messageModel = model('Message' , messageSchema)