import { Router } from "express";
import * as messageRouter from "./message.conrtoller/message.js"

const router = Router()


router.get("/",messageRouter.messageList )
router.post('/:receiverId',messageRouter.sendMessage )
router.patch('/:id',messageRouter.deleteAndupdate )



export default router