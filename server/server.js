import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';
import contectDB from './configs/db.js';
import 'dotenv/config';
import userRouter from './routes/userRoute.js';
import sellerRouter from './routes/sellerRoute.js';
import connectCloudinary from './configs/cloudinary.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import addressRouter from './routes/addressRoute.js';
import orderRouter from './routes/orderRouter.js';
import { stripeWebHooks } from './controllers/orderController.js';





const app=express();
const port= process.env.PORT || 4000;

await contectDB()
await connectCloudinary();


//Allow multiple origins
 const allowedOrigins = ['http://localhost:5173','https://grossery-cart.vercel.app']
 app.post('/stripe', express.raw({type: 'application/json'}), stripeWebHooks)

//Middleware configuration


app.use(express.json());
app.use(cookieParser());
app.use(cors({origin: allowedOrigins,credentials:true}));


app.get('/' ,(req,res) => res.send("API is Working"));
app.use('/api/user' ,userRouter)
app.use('/api/seller',sellerRouter)
app.use('/api/product',productRouter)
app.use('/api/cart',cartRouter)
app.use('/api/address',addressRouter)
app.use('/api/order',orderRouter)


app.listen(port,()=>{
    console.log(`Server is runnig on http://localhost:${port}`)
})

