const UserModel=require('../Models/user')
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');


const signup= async (req,res)=>{
  try{
    const {name,email,password}=req.body;
    const user= await UserModel.findOne({email});
    if(user){
        return res.status(409).json({
            msg:"user already exist you can login" 
        })
    }
    const userModel=new UserModel({name,password,email});
    userModel.password= await bcrypt.hash(password,10);
    await userModel.save();
    res.status(201).json({
        msg:"user success fully created signup successfull",
        success:true
    })
  }
  catch (err){
    res.status(400).json({
        msg:"internal server error",
        success:false
    })
       
  }
}

const login= async (req,res)=>{
      const {email,password}=req.body;
      const user= await UserModel.findOne({email})
      if(!user){
        res.status(400).json({msg:"invalid email or passwoed",success:false} );
      }
      const ispasswordEqual= await bcrypt.compare(password,user.password);
      if(!ispasswordEqual){
        return res.status(400).json({msg:"Invalid passord",success:false}) 
      }
      const JwtToken=jwt.sign({
        email:user.email,
        _id:user.id,
      },process.env.JWT_SECRET,{expiresIn:"24h"})

      res.status(200).json({
        msg:"login successfully",success:true,
        JwtToken,
        email,
        name:user.name
      })
}





module.exports={
    signup,
    login,
}