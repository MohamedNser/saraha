import { Router } from "express";
import * as register from './auth.controller/register.js'
import { validation } from "../../middleware/validation.js";
import * as validators from "./auth.validation.js"
const router = Router()

router.get("/", (req , res)=>{
res.json({message:'auth module'})
})

router.post('/singup' ,validation(validators.singup), register.singup)
router.get('/confirmEmail/:token' , register.confirmemail)
router.get('/refToken/:token' , register.refreshToken)
router.post('/singin' ,validation(validators.singin), register.singin)
router.patch("/sendCode" , register.sendCode)
router.patch("/forgetPassword" , register.forgetPassword)

export default router