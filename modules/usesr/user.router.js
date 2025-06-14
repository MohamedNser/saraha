import { Router } from "express";
import { userModel } from "../../DB/model/Schema.js";
const router = Router()

router.get("/",async (req , res)=>{
const users = await userModel.find()
res.json({message:'user module' , users})
})



export default router