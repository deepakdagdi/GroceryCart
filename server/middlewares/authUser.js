import jwt from "jsonwebtoken";

const authUser = async(req, res, next) => {


    try{
            const token = req.cookies.token;
    
    console.log(token)
    if(!token){
        console.log(token)
       
        return res.json({success : false , message:"Not Authorized"});

        }
    const tokenDecode= jwt.verify(token, process.env.JWT_SECRET)
    if(tokenDecode.id){
    
        req.user =tokenDecode.id;
        
    }
    else{
        return res.json({success : false ,message : "Not Authorized"});
    }
        next();
    }catch(error){
        console.log(error.message);
        res.json({success: false , message: error.message});
    }
}

export default authUser;