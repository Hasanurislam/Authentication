const express=require('express');
const router=express.Router();
const {SignUpValidation,loginValidation}=require('../Midleware/AuthVelidation')
const {signup,login}=require('../Controller/AuthController')

router.post('/signup',SignUpValidation,signup)

router.post('/login',loginValidation,login)

module.exports=router;
