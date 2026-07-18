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
        const emailUnique = await User.findOne({email});
        if(emailUnique)
        {
            return res.status(405).json({success:false , message:"User already registered"});
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
            return res.status(401).json({success:false,message:"All the field is required"}); 
        }
        const emailCheck = await User.findOne({email});
        if(!emailCheck)
        {
            return res.status(402).json({success:false,message:"User doesn't exists"})
        }
        const checkPassMatch = await bcrypt.compare(password,emailCheck.password);
        if(!checkPassMatch)
        {
            return res.json({success:false , message:"User credential is Incorrect"});
        }
        const token = jwt.sign({
            id: emailCheck._id , role: emailCheck.role, email : emailCheck.email
        },process.env.SECRET_KEY,{expiresIn:'60mins'})

        res.cookie('token',token , {httpOnly: true , secure:false}).json({
            success:true ,
            message:"User Login Successfully",
            user:{
                email:emailCheck.email,
                role:emailCheck.role,
                id:emailCheck._id,
            }
        })
    } catch (error) {
        console.log(e);
        res.status(500).json({
            success:false,
            message:"Something went Wrong"
        })
    }
}
export const logout= async(req,res)=>{
    res.clearCookie('token').json({
        success: true,
        message: "Logout Successfully"
    })
}
export const authMiddleware = async(req,res,next)=>{
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({
            success:false,
            message:"Unaurthorised User!"
        })
    }
    try {
        const decoded = jwt.verify(token,process.env.SECRET_KEY);
        req.user = decoded;
        next()
    } catch (error) {
        res.status(401).json({success:false , message:"Unauthorized user!"})
    }
  
}




