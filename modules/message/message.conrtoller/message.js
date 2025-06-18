import { messageModel } from "../../../DB/model/message.js";
import { userModel } from "../../../DB/model/Schema.js";


export const deleteAndupdate = async (req,res)=>{
    const {id} = req.params;
    const userID = req.user._id
    const message = await messageModel.updateOne({_id:id , receiverId:userID},{IsDeleted:true})
    message.modifiedCount? res.json({message:'Done'} ) :res.json({message:'in-valid update'} )
}

//...........
export const messageList = async (req , res)=>{
    try {
        const message = await messageModel.find({IsDeleted: false}).populate([
            {
                path:'receiverId',
                select: ' userName email profilePic',
                match:{
                    blocked : false
                }
            }
        ])
        const messageL = message.filter(ele=>{
            return ele.receiverId != null
        }
        )
        res.json({message:'Done' ,messageL })
    } catch (error) {
        res.json({message:'catch error' , error})
    }

}

//..............
export const sendMessage = async (req , res)=>{
    try {
    const {receiverId} = req.params;
    const {message} = req.body
    const user = await userModel.findById(receiverId).select("userName")
    console.log("Received receiverId:", receiverId);
    console.log("User found:", user);
    if (!user) {
    res.json({message:"reciverID is wrong"})
    } else {
        const newMessage = new messageModel({text:message , receiverId})
        const savedMessage = await newMessage.save()
        res.json({message:"DONE" , savedMessage })
    }
} catch (error) {
        res.json({message:"catch error" , error })
}

}