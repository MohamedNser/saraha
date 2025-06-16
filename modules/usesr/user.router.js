import { Router } from "express";
import * as UserController from "./user.controller/user.js"
import { auth } from "../../middleware/auth.js";
const router = Router()

router.get("/profile",auth() ,UserController.profile)



export default router