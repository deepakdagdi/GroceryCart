// // const mongoose = require("mongoose");
// // const bcrypt = require("bcrypt");

// import mongoose from "mongoose";
// import bcrypt from "bcryptjs";

// const userSchema = new mongoose.Schema({
//   name: String,
//   email: { type: String, unique: true },
//   password: String,
//   cartItems:{type: Object,default: {}},
// },{minimize:false});

// // Hash password before saving
// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();
//   this.password = await bcrypt.hash(this.password, 10);
//   next();
// });

// // Check password
// userSchema.methods.matchPassword = function (enteredPassword) {
//   return bcrypt.compare(enteredPassword, this.password);
// };

// //module.exports = mongoose.model("User", userSchema);
// const User=mongoose.models.user ||  mongoose.model('user',userSchema)


//  export default User;











import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    
    name: {type: String ,require: true},
    email: {type: String ,require: true, unique: true},
    password: {type: String ,require: true},
    cartItems:{type: Object,default: {}},
},{minimize:false})

const User=mongoose.models.user ||  mongoose.model('user',userSchema)


export default User;




