const  User= require('../model/user');

module.exports={
    signUp: async(req, res, next)=>{
        const {email, password}= req.value.body;

        const foundUser= await User.findOne({email});
        if(foundUser){
            return req.status(401).json({error: "Email is already in use"});
        }

        const newUser=newUser({email, password});
        await newUser.save();
        res.json({user:'created'});
    },

    signIn: async(req, res, next)=>{

    },
    secret: async(req,res, next)=>{
        
    }
}