import { Router } from "express";
import * as UserController from "./user.controller/user.js"
import { auth } from "../../middleware/auth.js";
import { validation } from "../../middleware/validation.js";
import * as validatros from "./user.validation.js"
const router = Router()

router.get("/profile/share/:id" ,UserController.shareProfile )
router.get("/profile",auth() ,UserController.profile)
router.get("/message",validation(validatros.tokenURL),auth() ,UserController.userMessage)
router.patch("/password" , auth() , UserController.UpdatePassword)



export default router 