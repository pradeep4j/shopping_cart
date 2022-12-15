import  express  from "express";
import {protectRoute,isAdmin} from '../utils/authMiddleware.js';
import {createProducts,listProduct,listProductByidCart} from '../controllers/Posts.js';
const router = express.Router();

router.route('/createProducts').post(protectRoute,isAdmin,createProducts);
router.get('/listProduct',listProduct);
router.get('/listProductByidCart/:id',listProductByidCart);

export default router;