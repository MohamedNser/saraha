import {Schema , model} from "mongoose";


const userSchema = new Schema ({
    userName:{
        type:String,
        required:true
    },
    fName:{
        type:String,
    },
    lName:{
        type:String,
    },
    password:{
        type:String,
        required:true
    },
    age:{
        type:Number
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phone:{
        type:String,
    },
    gender:{
        type:String,
        enum:['male' , 'female'],
        default:'male'
    },
    confrimEmail:{
        type:Boolean,
        default:false
    },
    online:{
        type:Boolean,
        default:false
    },
    blocked:{
        type:Boolean,
        default:false
    },
    profilePic:String

},{
    timestamps:true
})

export const userModel = model('User' , userSchema)