import { userModel } from "../../../DB/model/Schema.js"

export const profile = async (req , res)=>{
const user = await userModel.findById(req.user._id)
res.json({message:'user module' , user})
}