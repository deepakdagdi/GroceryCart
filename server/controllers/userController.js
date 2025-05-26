// // const User = require("../models/User");
// // const jwt = require("jsonwebtoken");

// import jwt from "jsonwebtoken";
// import User from "../models/User.js";
// // Generate JWT
// const generateToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
// };

// exports.registerUser = async (req, res) => {
//   const { name, email, password } = req.body;
//   try {
//     const userExists = await User.findOne({ email });
//     if (userExists) return res.status(400).json({ message: "User already exists" });

//     const user = await User.create({ name, email, password });
//     res.status(201).json({
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       token: generateToken(user._id),
//     });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// exports.loginUser = async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const user = await User.findOne({ email });
//     if (!user || !(await user.matchPassword(password))) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }

//     res.json({
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       token: generateToken(user._id),
//     });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// exports.getUserProfile = async (req, res) => {
//   const user = req.user;
//   res.json(user);
// };







import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";




//Register user  : /api/user/register
export const register = async (req,res)=>{
    try{

        const {name,email,password}= req.body;
        if(!name || !email || !password){
            return res.json({success:false, message:"Missing Details"})
        }

        const existingUser= await User.findOne({email})
        if(existingUser)
            return res.json({success:false, message:"User already exists"})

        const hashedPassword =await bcrypt.hash(password,10)

        const user=await User.create({name,email,password: hashedPassword})

        const token=jwt.sign({id: user._id}, process.env.JWT_SECRET,{expiresIn:'7d'});

        res.cookie('token', token, {
            httpOnly: true, //Prevent Javascript to access cookie
            
            secure: process.env.NODE_ENV === 'production', //Use secure cookies in production

            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict', //csrf protection

            maxAge: 7 * 24 * 60 * 60 * 1000, 
        })
        return res.json({success: true ,user: {email: user.email, name: user.name}})
    }catch(error){
        console.log(error.message);
        res.json({success: false , message: error.message});
    }
}



//Login User : /api/user/login
export const login =async (req,res)=>{
    try{
        const{email,password} = req.body;

        if(!email || !password)
            return res.json({success: false,message: 'Email and Password are required'});

        const user=await User.findOne({email});
        if(!user){
            return res.json({success: false,message: 'Invalid email or password'});
        }
        
        const isMatch = await bcrypt.compare(password,user.password)

        if(!isMatch)
            return res.json({success: false,message: 'Invalid email or password'});

        const token=jwt.sign({id: user._id}, process.env.JWT_SECRET,{expiresIn:'7d'});

            res.cookie('token', token, {
            httpOnly: true, 
            secure: process.env.NODE_ENV === 'production', 

            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict', 

            maxAge: 7 * 24 * 60 * 60 * 1000, 
        })
         
        return res.json({success: true ,user: {email: user.email, name: user.name}})

        }catch(error){
        console.log(error.message);
        res.json({success: false , message: error.message});
    }
}




export const isAuth= async (req, res) => {
    const token = req.cookies.token;
    if (!token)
        { return res.status(401).json({ error: 'Not authenticated' });
}
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
      const user = await User.findById(decoded.id).select('-password');
      if (!user)
        { return res.status(404).json({ error: 'User not found' });
       }else{
        return res.json({success : true , user})// Includes user._id
      }
       
    } catch (err) {
      res.status(401).json({ error: 'Invalid token' });
    }
}

// export const isAuth= async (req, res) => {
//     const user = req.user;
//     res.json(user);
//   };

// async(req,res)=>{
//     try{

//        const userId= req.user;
              
              
//         const user= await User.findById(`${userId}`).select("-password")
//         return res.json({success : true , user})

//     }catch(error){
//         console.log(error.message);
//         res.json({success: false , message: error.message});

//     }
// }

//Logout user : /api/user/logout
export const  logout =  async (req,res)=>{
    try{

        res.clearCookie('token' , {
            httpOnly : true,
            secure : process.env.NODE_ENV === 'production',
            sameSite : process.env.NODE_ENV === 'production' ? 'none' : 'strict',
         });

         return res.json({success: true , message: "Logged out succesfull"})

     }catch(error){
        console.log(error.message);
        res.json({success: false , message: error.message});
    }
}