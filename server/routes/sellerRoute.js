import express from "express";
import { sellerAuth, sellerLogin, sellerLogout } from "../controllers/sellerController.js";
import authSeller from "../middlewares/authSeller.js";


const sellerRouter= express.Router();
sellerRouter.post("/login", sellerLogin)
sellerRouter.get("/is-auth",authSeller,sellerAuth);
sellerRouter.get("/logout",sellerLogout);

export default sellerRouter;