import { Router } from "express";
import * as UserController from "./user.controller/user.js"
import { auth } from "../../middleware/auth.js";
import { validation } from "../../middleware/validation.js";
import * as validatros from "./user.validation.js"
import { HME, multerValidation, myMulter } from "../../service/multerCloud.js";
import { userModel } from "../../DB/model/Schema.js";
const router = Router()

router.patch("/profile/pic",auth(), myMulter('user/cover',multerValidation.image).single('image'),HME 
,UserController.profilePic)
router.patch("/profile/cover",auth() ,myMulter('user/cover',multerValidation.image).array('image',4),HME 
,UserController.coverPic)

router.get("/profile/share/:id" ,UserController.shareProfile )
router.get("/profile",auth() ,UserController.profile)
router.get("/message",validation(validatros.tokenURL),auth() ,UserController.userMessage)
router.patch("/password" , auth() , UserController.UpdatePassword)



export default router 