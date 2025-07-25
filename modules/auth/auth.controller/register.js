import { userModel } from "../../../DB/model/Schema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import { sendEmails } from "../../../service/sendEmail.js";
//......................
export const singup = async (req , res)=>{
    const {email , name , password} = req.body;
    const user = await userModel.findOne({email}).select('email')
    if (user) {
        res.status(409).json({ message: "Email already exists" });
    } else {
        const hashpassword = await bcrypt.hash(password,parseInt(process.env.saltRound))
        const NewUser = new userModel({email ,userName: name , password:hashpassword })
        const saveUser = await NewUser.save()
        const token = jwt.sign({id:saveUser._id} , process.env.emailToken , {expiresIn:60*60})
        const reftoken = jwt.sign({id:saveUser._id} , process.env.emailToken)
        const link = `${req.protocol}://${req.headers.host}${process.env.BASEURL}/auth/confirmEmail/${token}`
        const linkRef = `${req.protocol}://${req.headers.host}${process.env.BASEURL}/auth/refToken/${reftoken}`
        sendEmails(email , 'confirmtionEmail' , ` <div style="font-family: Arial, sans-serif;">
        <h2>verify Email</h2>
        <p>confirmation Email</p>
        <a href="${link}" style="background-color: blue; color: white; padding: 10px 20px; 
        text-decoration: none; border-radius: 5px;">click here to confirm your Email</a> <br>
        <br><br>
        <a href="${linkRef}" style="background-color: blue; color: white; padding: 10px 20px; 
        text-decoration: none; border-radius: 5px;">click here to send confrimtion a</a>
        </br>
    </div>`)
        saveUser? res.json({message: 'Done'}) : res.json({message: 'in-valid singup'})
    }
}
//.........................
export const confirmemail  = async (req ,res)=>{
    try {
        const {token} = req.params;
    if (!token) {
        res.status(401).json({ message: "Invalid token" });
    } else {
        const decoded = jwt.verify(token , process.env.emailToken)
        if (!decoded?.id) {
        res.status(401).json({ message: "Invalid token payload" });
        } else {
            const user = await userModel.updateOne({_id:decoded.id , confrimEmail:false} ,{ confrimEmail:true})
            user.modifiedCount? res.json({message:"done plz proced to login page "}) : 
            res.json({message:"arledy confirm"})
            
        }
        
    }
    } catch (error) {
        res.status(500).json({ message: "Something went wrong", error });
    }

}
//......................
export const refreshToken = async (req , res)=>{
    const {token} = req.params
    const decoded = jwt.verify(token , process.env.emailToken)
    if (!decoded?.id) {
        res.status(401).json({ message: "Invalid token payload" });
    } else {
        const user = await userModel.findById(decoded.id).select("email confrimEmail")
        if (!user) {
            res.status(404).json({ message: "Account not registered" });
        } else {
            if (user.confrimEmail) {
                res.json({message:"alredy confirmed"})
            } else {
                const token = jwt.sign({id:saveUser._id} , process.env.emailToken , {expiresIn:60*5})
        const link = `${req.protocol}://${req.headers.host}${process.env.BASEURL}/auth/confirmEmail/${token}`
        sendEmails(email , 'confirmtionEmail' , ` <div style="font-family: Arial, sans-serif;">
        <h2>vrivy Email</h2>
        <p>confirmation Email</p>
        <a href="${link}" style="background-color: blue; color: white; padding: 10px 20px; 
        text-decoration: none; border-radius: 5px;">click here to confirm your Email</a> 
    </div>`)
        saveUser? res.json({message: 'Done'}) :  res.status(400).json({ message: "Invalid signup data" });
            }
        }
    }

}
//........................
export const singin = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await userModel.findOne({email});
        
        if (!user) {
        return res.status(403).json({ message: "Invalid or inactive account" });
        }
        
        if (!user.confrimEmail) {
            return res.json({message: 'plz confirm your email first'});
        }
        
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            res.status(401).json({ message: "Incorrect password" });
        }

        const token = jwt.sign({id: user._id, isLoggedIn: true}, process.env.loggnTokeb , {expiresIn: 60*60*24});
        
        await userModel.updateOne({_id: user._id}, {online: true});
        
    return res.json({message: 'Done', token});
        
    } catch (error) {
        res.status(500).json({ message: "Something went wrong", error });
        console.log(error);
    }
}
//..................
export const sendCode = async(req,res)=>{
    const {email} =req.body
    const user = await userModel.findOne({email}).select('email')
    if (!user) {
        res.status(400).json({ message: "Invalid email format" });
    } else {
        const code = Math.floor(Math.random() *(9999 -1000 +1)+1000)
        sendEmails(email , 'Account verification' , `<h1>code acsses ${code}</h1>`)
        const Updateuser = await userModel.updateOne({_id: user._id} , {code})
        Updateuser.modifiedCount? res.json({message:"done"}) : res.status(404).json({ message: "User not found" });
        
    }

}
//...................
export const forgetPassword = async (req , res)=>{
    const {code , newPassword , email} = req.body;
    if (code == null) {
        res.status(400).json({ message: " null is not rejected" });
    } else {
        const hashpass = await bcrypt.hash(newPassword , parseInt(process.env.saltRound))
        const user =await userModel.updateOne({email , code} , {password: hashpass , code:null })
        user.modifiedCount? res.json ({message:'done'}) : res.status(401).json({ message: "Login failed" });
    }
}
