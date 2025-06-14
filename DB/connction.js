import mongoose from "mongoose";
const connctedDB =async ()=>{
    return await mongoose.connect(process.env.DataBase)
    .then(res=>{
        console.log(`DATA BASE CONNCTION `);

    }).catch(err =>{
        console.log("in-valid connction DataBase");
    })
}

export default connctedDB