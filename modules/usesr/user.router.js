import { Router } from "express";
import * as UserController from "./user.controller/user.js"
import { auth } from "../../middleware/auth.js";
const router = Router()

router.get("/profile/share/:id" ,UserController.shareProfile )
router.get("/profile",auth() ,UserController.profile)
router.get("/message",auth() ,UserController.userMessage)
router.patch("/password" , auth() , UserController.UpdatePassword)



export default router 