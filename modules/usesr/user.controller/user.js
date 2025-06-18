import { messageModel } from "../../../DB/model/message.js"
import { userModel } from "../../../DB/model/Schema.js"

export const shareProfile = async(req,res)=>{
    const {id} = req.params;
    const user = await userModel.findById(id).select("userName email profilePic")
    user? res.json({message:"Done" , user}) : res.json({message:"in-valid reciverID profile" })
}


export const profile = async (req , res)=>{
const user = await userModel.findById(req.user._id)
res.json({message:'user module' , user})
}

export const userMessage = async (req , res)=>{
const messages = await messageModel.find({ receiverId: req.user._id})
res.json({message:'user module' , messages})
}