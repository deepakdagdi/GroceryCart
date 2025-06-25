import User from "../models/User.js";

//update User CartData : /api/cart/update

export const updateCart = async (req , res ) => {
     
    try {
         const userId= req.user;
         const {cartItems} =req.body;
       
         await User.findByIdAndUpdate(userId,{cartItems})
         res.json({success: true,message:"Cart Updated"})

    } catch (error) {
        console.log(error);
        res.josn({success : false , message : error.message})
        
    }
}