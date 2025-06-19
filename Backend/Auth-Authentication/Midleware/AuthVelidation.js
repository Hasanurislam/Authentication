const joi=require('joi');


const SignUpValidation=(req,res,next)=>{
    const Schema=joi.object({
        name: joi.string().max(100).required().min(3),
        email: joi.string().required().email().min(3),
        password:joi.string().min(6).max(100).required()

    });
    const {error}=Schema.validate(req.body)

    if(error){
        return res.status(400).json({msg:"bad rquest password need to strong",error})
    } else
    next();
}

const loginValidation=(req,res,next)=>{
    const Schema=joi.object({
        email: joi.string().required().email().min(3),
        password:joi.string().min(6).max(100).required()
    })
    const {error} =Schema.validate(req.body);
    if(error){
        return res.status(400).json({msg:"bad request ",error});
    }else
    next()
}

module.exports={
    SignUpValidation,
    loginValidation,
}