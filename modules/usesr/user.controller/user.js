import { messageModel } from "../../../DB/model/message.js"
import { userModel } from "../../../DB/model/Schema.js"
import bcrypt from "bcryptjs";

export const shareProfile = async(req,res)=>{
    const {id} = req.params;
    const user = await userModel.findById(id).select("userName email profilePic")
    user? res.json({message:"Done" , user}) :res.status(400).json({ message: "Invalid receiver ID format" });
}
//..............
export const profile = async (req , res)=>{
const user = await userModel.findById(req.user._id)
res.json({message:'user module' , user})
}
//..............
export const userMessage = async (req , res)=>{
const messages = await messageModel.find({ receiverId: req.user._id})
res.json({message:'user module' , messages})
}
//..............
export const UpdatePassword = async (req,res)=>{
    try {
        const {oldPassword , newPassword} = req.body;
    const user = await userModel.findById(req.user._id)
    const match = await bcrypt.compare(oldPassword, user.password)
    if (!match) {
        res.json({message: 'password not match'})
    } else {
        const newHash = await bcrypt.hash(newPassword, parseInt(process.env.saltRound))
        const Updateduser = await userModel.updateOne({_id: user._id} ,{ password: newHash})
        Updateduser.modifiedCount? res.json({message:'Done'}) : res.status(401).json({ message: "Invalid password" });
    }
    } catch (error) {
        res.status(500).json({ message: "Something went wrong", error });
        
    }

}