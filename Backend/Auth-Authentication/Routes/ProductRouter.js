const express=require('express');
const router=express.Router();
const ensureAuthentication=require('../Midleware/Auth')
router.get('/',ensureAuthentication,(req,res)=>{
    res.status(200).json([{
        name:"mobile",
        price:"20000"
    },
    {
        name:"tv",
        price:"40000"
    }]
)
});



module.exports=router;
