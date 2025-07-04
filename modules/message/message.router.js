import { Router } from "express";
import * as messageRouter from "./message.conrtoller/message.js"
import { validation } from "../../middleware/validation.js";
import * as validatros from "./message.validation.js"

const router = Router()


router.get("/",messageRouter.messageList )
router.post('/:receiverId',validation(validatros.message),messageRouter.sendMessage )
router.patch('/:id',messageRouter.deleteAndupdate )



export default router