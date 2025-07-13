import dotenv from "dotenv"
dotenv.config()
import express from "express"
import * as indexRouter from "./modules/index.router.js"
import connctedDB from "./DB/connction.js"
const app = express()
const port = 3000
const BaseURL =process.env.BaseURL

app.use(express.json())
app.use(`${BaseURL}/upload`, express.static('./upload'))
app.use(`${BaseURL}/auth` , indexRouter.authRouter)
app.use(`${BaseURL}/message` , indexRouter.messageRouter)
app.use(`${BaseURL}/user` , indexRouter.userRouter)

app.use((req, res)=>{
res.status(404).json({message: "in-valid page"})})
connctedDB()
app.listen(`${port}` ,()=>console.log(`server is running ${port}`))