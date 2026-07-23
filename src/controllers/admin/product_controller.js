import { ImageUploadUtils } from "../../../helpers/Cloudinary.js";
import Product from "../../models/product.js";
export const handleImageUpload = async(req,res)=>{
    try {
        const b64 = Buffer.from(req.file.buffer).toString('base64');
        const url = `data:${req.file.mimetype};base64,${b64}`;
        const result = await ImageUploadUtils(url);
        res.json({
            success:true,
            result
        })
    } catch (error) {
    console.error(error);

    res.status(500).json({
        success: false,
        message: error.message,
    });
}
};

export const addNewProduct = async(req,res)=>{
    try {
       const {image,title,description,category,brand,price,salePrice,totalStock} = req.body
       const newProduct = new Product({image,title,description,category,brand,price,salePrice,totalStock});
       await newProduct.save(); 
       res.status(200).json({success:true,message:"Product Added Successfully"});
    } catch (error) {
        res.status(500).json({success:false,message:"Server Error"});
    }
}

export const ListProduct = async(req,res)=>{
    try {
       const productList = await Product.find({});
       res.status(200).json({success:true ,data:productList}); 
    } catch (error) {
        res.status(500).json({success:false,message:"Server Error"});
    }
}
export const EditProduct = async(req,res)=>{
    try {
       const {id} = req.params;
       const {image,title,description,category,brand,price,salePrice,totalStock} = req.body;
       const existingProduct = await Product.findById({id});
       if(!existingProduct)
       {
        return res.status(404).json({success:false , message:"Product not found"});
       }
       existingProduct.title = title || existingProduct.title;
       existingProduct.description = description || existingProduct.description;
       existingProduct.category = category || existingProduct.category;
       existingProduct.brand = brand || existingProduct.brand;
       existingProduct.price = price || existingProduct.price;
       existingProduct.salePrice = price || existingProduct.salePrice;
       existingProduct.totalStock = price || existingProduct.totalStock;
       await existingProduct.save();
       res.status(200).json({success:true,message:"Product Updated Successfully"});
    } catch (error) {
        res.status(500).json({success:false,message:"Server Error"});
    }
}
export const DeleteProduct = async(req,res)=>{
    try {
      const {id} = req.params;
      const product = await Product.findByIdAndDelete(id);
      if(!product)
        {
         return res.status(404).json({success:false,message:"Product is not found"});
        } 
      res.status(200).json({success:true , message:"Product Deleted Successfully"});
    } catch (error) { 
        res.status(500).json({success:false,message:"Server Error"});
    }
}