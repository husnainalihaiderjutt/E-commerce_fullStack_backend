import { v2 as cloudinary } from 'cloudinary';
import multer from "multer"
import dotenv from "dotenv"
dotenv.config();
cloudinary.config({
    cloud_name:process.env.cloud_name,
    api_key:process.env.api_key,
    api_secret:process.env.api_secret
});

const storage = new multer.memoryStorage();

export const ImageUploadUtils = async(file)=>{
    const result = await cloudinary.uploader.upload(file,{
        resource_type: 'auto'
    });
    return result;
}
export const upload = multer({storage});

