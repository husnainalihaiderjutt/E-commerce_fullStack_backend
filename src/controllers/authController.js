import User from "../models/User.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const register = async(req,res)=>{
    const {userName,email,password}= req.body;
    try {
        if(!userName || !email ||!password)
        {
            return res.status(401).json({success:false,message:'Fill all the fields'});
        }
        const hashPasssword = await bcrypt.hash(password,12);
        const newUser = new User({
            userName,
            email,
            password:hashPasssword
        })
        await newUser.save();
        return res.status(200).json({success:true , message:"Register Successfully"});
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Something went Wrong"
        });
    }
}
export const login = async(req,res)=>{
    const {email,password}= req.body;
    try {
        if(!email ||!password)
        {
            return res.json({}) 
        }
    } catch (error) {
        console.log(e);
        res.status(500).json({
            success:false,
            message:"Something went Wrong"
        })
    }
}



