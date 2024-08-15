import path from 'path'
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
app.use(express.json());
const __dirname = path.resolve()
app.use(cors({
    origin: "https://xmart-1uzw.onrender.com/api",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}))
// home testing route
// app.get('/',(req,res)=>res.json({message:'This is home route'}))

//user Router
app.use('/api/user', userRouter)

// product Router
app.use('/api/product', productRouter)

// cart Router
app.use('/api/cart', cartRouter)

// address router
app.use('/api/address', addressRouter)

app.use(express.static(path.join(__dirname, "/Project_Xmart/dist")))

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "Project_Xmart", "dist", "index.html"));
});

mongoose.connect(
    "mongodb+srv://sds21212121:01HwC982BAMYsNdb@cluster0.nrq9ely.mongodb.net/",{
      dbName:"MERN_E_Commerce"
    }
  ).then(()=>console.log("MongoDB Connected Succssfully...!")).catch((err)=>console.log(err));

const port = process.env.PORT || 1000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
}
)