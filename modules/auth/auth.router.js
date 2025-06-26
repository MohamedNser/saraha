import { Router } from "express";
import * as register from './auth.controller/register.js'
const router = Router()

router.get("/", (req , res)=>{
res.json({message:'auth module'})
})

router.post('/singup' , register.singup)
router.get('/confirmEmail/:token' , register.confirmemail)
router.get('/refToken/:token' , register.refreshToken)
router.post('/singin' , register.singin)
router.patch("/sendCode" , register.sendCode)
router.patch("/forgetPassword" , register.forgetPassword)

export default router