import mongoose from "mongoose";

const contectDB = async ()=>{
    try{
        mongoose.connection.on('connected',()=> console.log("Database Connected"));
        await mongoose.connect(`${process.env.MONGODB_URI}/naturecart`)

    } catch(error){
        console.log(error.message);
    }

}

export default contectDB;