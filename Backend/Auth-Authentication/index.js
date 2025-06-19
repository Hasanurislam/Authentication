const express=require('express');
const app=express();
const bodyparser=require('body-parser');
const cors=require('cors');

require('dotenv').config();
const PORT=process.env.PORT ;
const {ConnectMongoDb}=require('./Models/db');
const Authrouter=require('./Routes/AuthRouter');
const prosuctRouter=require('./Routes/ProductRouter')



//connect database
ConnectMongoDb('mongodb://127.0.0.1:27017/Auth-Db')
.then(()=>console.log("Databse connected"))
.catch((err)=>{
    console.log("Error",err);
})
//Midleware body-parser
app.use(bodyparser.json());
app.use(cors());

//routes
app.use('/auth',Authrouter);
app.use('/Products',prosuctRouter);



app.listen(PORT,()=>console.log(`server started at port:${PORT}`));