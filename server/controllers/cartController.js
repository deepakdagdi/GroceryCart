import User from "../models/User.js";

//update User CartData : /api/cart/update

export const updateCart = async (req , res ) => {
     
    try {
        //here any probleam is genreated with the userid so you can use the logic of userAuth and think about logic

         //const {userId,cartItems}= req.user;
         const userId= req.user;
         const {cartItems} =req.body;
        //  console.log("userID=" +req.user);
        // console.log("cartItems="+cartItems)
         await User.findByIdAndUpdate(userId,{cartItems})
         res.json({success: true,message:"Cart Updated"})

    } catch (error) {
        console.log(error);
        res.josn({success : false , message : error.message})
        
    }
}