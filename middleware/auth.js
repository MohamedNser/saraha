import jwt from "jsonwebtoken"
import { userModel } from "../DB/model/Schema.js";

export const auth = ()=>{
    return async (req,res,next)=>{
        const {authorization} = req.headers;
        console.log(authorization);
        if (!authorization?.startsWith('TE5A__')) {
            res.json({message:"in-valid bearer key"})
        } else {
            const token = authorization.split('TE5A__')[1]
            console.log({token});
            const decoded = jwt.verify(token ,process.env.loggnTokeb )
            if (!decoded?.id) {
                res.json({message:"in-valid token payload"})
            } else {
                const user = await userModel.findById(decoded.id ).select('email userName')
                if (!user) {
                    res.json({message:"in-valid user found"})
                } else {
                    req.user = user
                    next()
                }
            }
            
        }
    }
}