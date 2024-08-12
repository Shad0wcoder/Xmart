import express from 'express'
import mongoose from 'mongoose';
import bodyParser from 'express'
import userRouter from './Routes/user.js'
import productRouter from './Routes/product.js'
import cartRouter from './Routes/cart.js'
import addressRouter from './Routes/address.js'
import cors from 'cors';
import dotenv from 'dotenv'
dotenv.config()
const app = express();

app.use(bodyParser.json())


app.use(cors({
    origin:true,
    methods:[ "GET", "POST", "PUT", "DELETE"],
    credentials:true
}))
// home testing route
app.get('/',(req,res)=>res.json({message:'This is home route'}))

//user Router
app.use('/api/user',userRouter)

// product Router
app.use('/api/product',productRouter)

// cart Router
app.use('/api/cart',cartRouter)

// address router
app.use('/api/address',addressRouter)

mongoose.connect(
    "mongodb+srv://sds21212121:01HwC982BAMYsNdb@cluster0.nrq9ely.mongodb.net/",{
        dbName:"MERN_E_Commerce"
    }
).then(()=>console.log("MongoDB Connected Successfully...")).catch((err)=>console.log(err))

const port = 1000;
app.listen(port,()=>console.log(`Server is running on port ${port}`))