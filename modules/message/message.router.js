import { Router } from "express";
const router = Router()

router.get("/", (req , res)=>{
res.json({message:'message module'})
})



export default router