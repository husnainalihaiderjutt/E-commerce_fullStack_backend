import express from "express"
import { handleImageUpload,addNewProduct,DeleteProduct,EditProduct, ListProduct } from "../../controllers/admin/product_controller.js";
import { upload } from "../../../helpers/Cloudinary.js";
const router = express.Router();

router.post('/upload-image',upload.single('my_file'),handleImageUpload);
router.get('/list',ListProduct);
router.post('/addProduct',addNewProduct);
router.put('/edit/:id',handleImageUpload);
router.delete('/delete/:id',handleImageUpload);


export default router;