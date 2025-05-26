




// import  { registerUser,loginUser,getUserProfile} from "../controllers/userController.js";

// import  authMiddleware from "../middlewares/authUser.js";





import express from "express";
 import { isAuth, login, logout, register } from "../controllers/userController.js";
 import authUser from "../middlewares/authUser.js";

 const userRouter=express.Router();

userRouter.post('/register', register)
userRouter.post('/login', login)
userRouter.get('/is-auth',authUser,isAuth)
userRouter.get('/logout',authUser,logout)


// userRouter.post("/register", registerUser);
// userRouter.post("/login", loginUser);
// userRouter.get("/profile", authMiddleware, getUserProfile);


export  default userRouter;