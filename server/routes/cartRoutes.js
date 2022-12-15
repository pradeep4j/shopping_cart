import  express from "express";
import {listProduct,listProductByidCart} from '../controllers/Posts.js';
const router = express.Router();

router.get('/listProduct',listProduct);
router.get('/listProductByidCart/:id',listProductByidCart);


export default router;
