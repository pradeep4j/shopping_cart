import exprese from 'express';
import { isAdmin,protectRoute } from '../utils/authMiddleware.js';
import {createOrders,listAllOrders,getOrderById,pay,deliverOrder,myorders,stripePayment,} from '../controllers/Posts.js';
const router = exprese.Router();

router.route('/createOrders').post(protectRoute,createOrders);
router.get('/listOrders',protectRoute, isAdmin,listAllOrders);
router.route('/getOrderDetails/:id').get(protectRoute,getOrderById);
router.route('/pay/:id').put(protectRoute,pay);
router.route('/deliver/:id').put(deliverOrder);
router.route('/myorders').get(protectRoute,myorders);
// @desc  create payment intent for stripe payment
// @route POST /api/orders/stripe-payment
// @access PUBLIC
router.route('/stripe-payment').post(stripePayment);

export default router;