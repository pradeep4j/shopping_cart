import User from '../models/User.js';
import Order from '../models/Order.js';
import Product from '../models/Product.js'
import bcryptsjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Cloudinary from '../utils/Cloudinary.js';
import {createError} from '../utils/error.js';
import Stripe from 'stripe';
import generateToken from '../utils/generateToken.js';
import sendMail from '../utils/sendMails.js';
import sendSMS from '../utils/sendSMS.js';
import axios from 'axios';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

//////users section of api start
export const createUsers = async(req,res,next) => {
   //console.log(req.body);return;
    const email = await User.findOne({email:req.body.email});
    if(email) {
        return res.send("409");
    }
    const salt =  bcryptsjs.genSaltSync(10);
    const passhash =  bcryptsjs.hashSync(req.body.password,salt);
    try {
        let uploadRes = '';
       if(req.body.image !== ''){
            uploadRes = await Cloudinary.uploader.upload(req.body.image,{
                upload_preset:"mern_local_upload",
                width: 150,                         //for resizing and scaling before upload 
                crop: "scale",
            });
        }

        const user = {
             name:req.body.name,
             occupation:req.body.occupation,
             email:req.body.email,
             password:passhash,
             phone:req.body.phone,
             description:req.body.description,
             age:req.body.age,
             gender:req.body.gender,
             image:uploadRes,    ////from cloudinary cloud
             isAdmin:req.body.isAdmin     
        };
       // console.log(user); return;
        const newUser = new User(user);
           await newUser.save();
        //   await sendMail(newUser._id, newUser.email, 'email verification');
         //  await sendSMS('+13854584206','+917784942637');
           res.status(201).json(newUser);   ////if data saved properly then code 201
    } catch (error) {
            res.status(409).json({ message: error.message }); ////if data saved fails  then code 409
           next(error);
    }
  
}
export const login = async(req, res,next) => {
    try{
         const user = await User.findOne({email:req.body.email});
         if(!user) {
            //next(createError(404,"User Not Found!"));
           return res.send("404");
         }
         const passwordDB = user.password;
         const matchPasswotd = await bcryptsjs.compare(req.body.password,passwordDB);
         
         if(matchPasswotd===false) {
            return res.send("400");
         }
 
         //now remove Password and isAdmin from User get from query as follows   
         //const { Password, isAdmin, ...otherDetails } = User;   
         //since in output of return response.json({...otherDetails}); I am getting collectable values in _doc variable so
         const { password, ...otherDetails } = user._doc;  
         //now I have to install a jwt here. first install npm install jsonwebtoken and create jwt via openssl>rand -base64 32 and put it to .env file for privacy. And now create token with sign jwt token with user id and isadmin as
         const token = generateToken(user._id,'login');//jwt.sign({id:user._id},process.env.JWT,{expiresIn:"2d"});
         //now put this token in a cookie by installing npm install cookie-parser. After this initialize this cookie-parser in index.js as app.use() and send back a cookie in response to browser with created token
         //res.cookie('access_token',token,{expire : 36000 + Date.now(), httpOnly:true}).status(200).json({...otherDetails});
         otherDetails.access_token = token;
         res.cookie('access_token',token,{maxAge : (2*24*60*60*1000) /* cookie will expires in 2 days*/, httpOnly:true}).status(201).json({...otherDetails});
      
    }catch( error ){
        //res.status(400).json({ message: error.message });
        next(error);
    }
}
export const usersProfileById = async(req,res,next) => {
    try{
        const userProfile = await User.findOne({_id:req.params.id});
        if(userProfile){
            res.status(201).json(userProfile);
        }
        else{
            response.status(204).json(`OOps!...No Record Found on this ID ${request.params.id} !!`);  
        } 
    }catch(error){
        next(error)
    }

}
export const updateUsersProfileById = async(request,response,next) => {
    try {
        const getPreviousImageInfo = await User.findOne({_id:request.params.id});
        const requestBody = request.body;
        let img=false;
        let uploadRes = '';
        
        if(requestBody.image !== ''){
            if(getPreviousImageInfo.image.public_id){
                const { result } = await Cloudinary.uploader.destroy(getPreviousImageInfo.image.public_id);
            }
            uploadRes = await Cloudinary.uploader.upload(request.body.image,{
                upload_preset:"mern_local_upload",
                width: 150,                         //for resizing and scaling before upload 
                crop: "scale",
            });
            img=true;
        }
        
        if(requestBody.password!=''){
            const salt = bcryptsjs.genSaltSync(10);
            const passhash = bcryptsjs.hashSync(requestBody.password,salt);
        }  
            let user = {};
            let salt = '';
            let passhash = '';
            if(requestBody.password!=''){
                salt = bcryptsjs.genSaltSync(10);
                passhash = bcryptsjs.hashSync(requestBody.password,salt);
            }
            if(requestBody.password!='' && requestBody.image!=''){                
                user = {
                    name:request.body.name,
                    occupation:request.body.occupation,
                    email:request.body.email,
                    password:passhash,
                    phone:request.body.phone,
                    description:request.body.description,
                    age:request.body.age,
                    gender:request.body.gender,
                    image:uploadRes,    ////from cloudinary cloud
                    isAdmin:request.body.isAdmin,
                    isConfirmed:true  
                };
            }
            else if(requestBody.password!=='' && requestBody.image===''){
                user = {
                    name:request.body.name,
                    occupation:request.body.occupation,
                    email:request.body.email,
                    password:passhash,
                    phone:request.body.phone,
                    description:request.body.description,
                    age:request.body.age,
                    gender:request.body.gender,
                    isAdmin:request.body.isAdmin,
                    isConfirmed:true  
                };
            }
            else if(requestBody.password==='' && requestBody.image!==''){
                user = {
                    name:request.body.name,
                    occupation:request.body.occupation,
                    email:request.body.email,
                    phone:request.body.phone,
                    description:request.body.description,
                    age:request.body.age,
                    gender:request.body.gender,
                    image:uploadRes,    ////from cloudinary cloud
                    isAdmin:request.body.isAdmin,
                    isConfirmed:true  
                };
            }                         
            else{
                user = {
                    name:request.body.name,
                    occupation:request.body.occupation,
                    email:request.body.email,
                    phone:request.body.phone,
                    description:request.body.description,
                    age:request.body.age,
                    gender:request.body.gender,
                    isAdmin:request.body.isAdmin,
                    isConfirmed:true 
                };
            }  
        await User.updateOne({_id:request.params.id}, user);
        if(img===false){   //adding user id and image to user data for storing in session storage after updating logged in user
            user._id=request.params.id; 
            user.image=getPreviousImageInfo.image;
        }
        else{
            user._id=request.params.id; 
        }
        const token = generateToken(user._id,'login');
        const {password,...updatedUsers} = user; //removing password from user object
        updatedUsers.access_token = token; //adding access token to updated user's data
        response.status(201).json(updatedUsers);  
    } catch (error) {
       // response.status(409).json({message: error.message});
       next(error);
    }
}
export const usersProfileByEditId = async(req,res,next) => {
    try{
        const userProfile = await User.findOne({_id:req.params.id});
        if(userProfile){
            res.status(201).json(userProfile);
        }
        else{
            response.status(204).json(`OOps!...No Record Found on this ID ${request.params.id} !!`);  
        } 
    }catch(error){
        next(error)
    }

}
export const userEditFromAdminById = async(request,response,next) => {
    try {
        const getPreviousImageInfo = await User.findOne({_id:request.params.id});
        const requestBody = request.body;
        let img=false;
        let uploadRes = '';
        
        if(requestBody.image !== ''){
            if(getPreviousImageInfo.image.public_id){
                const { result } = await Cloudinary.uploader.destroy(getPreviousImageInfo.image.public_id);
            }
            uploadRes = await Cloudinary.uploader.upload(request.body.image,{
                upload_preset:"mern_local_upload",
                width: 150,                         //for resizing and scaling before upload 
                crop: "scale",
            });
            img=true;
        }
        
        if(requestBody.password!=''){
            const salt = bcryptsjs.genSaltSync(10);
            const passhash = bcryptsjs.hashSync(requestBody.password,salt);
        }  
            let user = {};
            let salt = '';
            let passhash = '';
            if(requestBody.password!=''){
                salt = bcryptsjs.genSaltSync(10);
                passhash = bcryptsjs.hashSync(requestBody.password,salt);
            }
            if(requestBody.password!='' && requestBody.image!=''){                
                user = {
                    name:request.body.name,
                    occupation:request.body.occupation,
                    email:request.body.email,
                    password:passhash,
                    phone:request.body.phone,
                    description:request.body.description,
                    age:request.body.age,
                    gender:request.body.gender,
                    image:uploadRes,    ////from cloudinary cloud
                    isAdmin:request.body.isAdmin,
                    isConfirmed:true  
                };
            }
            else if(requestBody.password!=='' && requestBody.image===''){
                user = {
                    name:request.body.name,
                    occupation:request.body.occupation,
                    email:request.body.email,
                    password:passhash,
                    phone:request.body.phone,
                    description:request.body.description,
                    age:request.body.age,
                    gender:request.body.gender,
                    isAdmin:request.body.isAdmin,
                    isConfirmed:true  
                };
            }
            else if(requestBody.password==='' && requestBody.image!==''){
                user = {
                    name:request.body.name,
                    occupation:request.body.occupation,
                    email:request.body.email,
                    phone:request.body.phone,
                    description:request.body.description,
                    age:request.body.age,
                    gender:request.body.gender,
                    image:uploadRes,    ////from cloudinary cloud
                    isAdmin:request.body.isAdmin,
                    isConfirmed:true  
                };
            }                         
            else{
                user = {
                    name:request.body.name,
                    occupation:request.body.occupation,
                    email:request.body.email,
                    phone:request.body.phone,
                    description:request.body.description,
                    age:request.body.age,
                    gender:request.body.gender,
                    isAdmin:request.body.isAdmin,
                    isConfirmed:true 
                };
            }  
        await User.updateOne({_id:request.params.id}, user);
        if(img===false){   //adding user id and image to user data for storing in session storage after updating logged in user
            user._id=request.params.id; 
            user.image=getPreviousImageInfo.image;
        }
        else{
            user._id=request.params.id; 
        }
        const token = generateToken(user._id,'login');
        const {password,...updatedUsers} = user; //removing password from user object
        updatedUsers.access_token = token; //adding access token to updated user's data
        response.status(201).json(updatedUsers);  
    } catch (error) {
       // response.status(409).json({message: error.message});
       next(error);
    }
}

export const confirmuser = async(req,res,next) => {
    try {
        // set the user to a confirmed status, once the corresponding JWT is verified correctly
		const emailToken = req.params.token;
		const decodedToken = jwt.verify(
			emailToken,
			process.env.JWT_EMAIL_TOKEN_SECRET
		);
		const user = await User.findById(decodedToken.id).select('-password'); // fetch that user from db, but not get the user's password
		user.isConfirmed = true;
		const updatedUser = await user.save();
		res.status(201).json(updatedUser);  
    } catch (error) {
       // response.status(409).json({message: error.message});
       next(error);
    }
}
export const deleteUsers = async(request, response,next) => {
    try {
        const res = await User.deleteOne({_id: request.params.id});
       
        response.status(201).json("User deleted Successfully!asas");  
    } catch (error) {
        //response.status(409).json({message: error.message});
        next(error);
    }
}
export const logout = async(request, response,next) => {
    //response.clearCookie("access_token");
     const token = request.cookies.access_token;
   // console.log(token);//return;
    try{ 
        if(token){
            response.clearCookie('access_token');
            response.status(201).json('User Logged out successfully!!');
        }
        else{
            response.status(208).json('User already Logged out successfully!!');
        }
    }catch( error ){
       // response.status(404).json({ message: error.message })
       next(error);
    }
}
export const allUsers = async (request, response,next) => {
    try{ 
        const users = await User.find({_id: {$ne:request.params.id}});
        response.status(201).json(users);
    }catch( error ){
       // response.status(404).json({ message: error.message })
       next(error);
    }
}
export const searchUsersRecordsNav = async(request, response,next) => {
    try{ 
        const users = await User.find({$and: [{_id: {$ne:request.params.id},  
            $or: [ {name:{$regex: '.*' +  request.body.searchValue + '.*', $options: 'i'}},
                   {email:{$regex: '.*' +  request.body.searchValue + '.*', $options: 'i'}}
                 ]
            }]});
        response.status(201).json(users);
    }catch( error ){
       // response.status(404).json({ message: error.message })
       next(error);
    }
}
//////users section of api ends
///product api starts
export const createProducts = async(request, response,next) => {

   // console.log(request.user._id);return
    try{ 
        let uploadRes = '';
        if(request.body.image !== ''){
            uploadRes = await Cloudinary.uploader.upload(request.body.image,{
                upload_preset:"mern_local_upload",
                width: 150,                         //for resizing and scaling before upload 
                crop: "scale",
            });
         }


        const product = {
            user: request.user._id,
            name: request.body.name,
            rate: request.body.rate,
            image: uploadRes,
            numberOfItem: request.body.numberOfItem,
            description: request.body.description,
            ratings: request.body.ratings,
            isPurchased : request.body.isPurchased
        }
        //console.log(product); return;
        const newProduct = new Product(product);
        await newProduct.save();
        response.status(201).json(newProduct);
    }catch( error ){
       // response.status(404).json({ message: 'error.message' })
       next(error);
    }
}
export const listProduct = async (request, response,next) => {
    try{ 
        const products = await Product.find();
        response.status(201).json(products);
    }catch( error ){
       // response.status(404).json({ message: error.message })
       next(error);
    }
}
export const listProductByidCart = async (request, response,next) => {
    try{ 
        const products = await Product.findOne({_id:request.params.id});
        response.status(201).json(products);
    }catch( error ){
       // response.status(404).json({ message: error.message })
       next(error);
    }
}

///product api ends

///order api starts
export const createOrders = async(request, response,next) => {
    //console.log(request.body.orderItems); return;
    try{ 
        
        const order = {
            user: request.user._id,
            orderItems : request.body.orderItems,
		    shippingAddress : request.body.shippingAddress,
		    paymentMethod : request.body.paymentMethod,
		    itemsPrice : request.body.itemsPrice,
		    shippingPrice : request.body.shippingPrice,
		    taxPrice : request.body.taxPrice,
		    totalPrice : request.body.totalPrice
        }
        
        const newOrder = new Order(order);
        await newOrder.save();
        response.status(201).json(newOrder);
    }catch( error ){
       // response.status(404).json({ message: 'error.message' })
       next(error);
    }
}
export const listAllOrders = async (request, response,next) => {
    try{ 
        const page = Number(request.query.pageNumber) || 1; // the current page number in the pagination
        const pageSize = 2; // total number of entries on a single page

        const count = await Order.countDocuments({}); // total number of documents available

        // find all orders that need to be sent for the current page, by skipping the documents included in the previous pages
        // and limiting the number of documents included in this request
        // sort this in desc order that the document was created at
        const orders = await Order.find().populate('user', 'id name').sort('-createdAt');
            /*.limit(pageSize)
            .skip(pageSize * (page - 1))
            .populate('user', 'id name')*/
           // .sort('-createdAt');
        // send the list of orders, current page number, total number of pages available
        //response.json(orders);
        //const orders = await Order.find();
        response.status(201).json(orders);
    }catch( error ){
       // response.status(404).json({ message: error.message })
       next(error);
    }
}
export const getOrderById = async(req, res,next) => {
    try{
        const reqOrder = await Order.findById(req.params.id).populate(
            'user',
            'name email'
        );
        if (reqOrder) {
            res.status(201).json(reqOrder);
        }
    }
    catch( error ){
        // response.status(404).json({ message: error.message })
        next(error);
    }        
}
export const pay = async (req, res,next) => {
    try{
       // console.log(req.params.id+'====='+req.body.itemQWithId);return;
	const order = await Order.findById(req.params.id);
        if (order) {
            const { paymentMode } = req.body;
            order.isPaid = true;
            order.paidAt = Date.now();
            // update the payment result based on which mode of payment was chosen
            if (paymentMode === 'paypal') {
                order.paymentResult = {
                    type: 'paypal',
                    id: req.body.id,
                    status: req.body.status,
                    update_time: req.body.update_time,
                    email_address: req.body.payer.email_address,
                };
            } else if (paymentMode === 'stripe') {
                order.paymentResult = {
                    type: 'stripe',
                    id: req.body.id,
                    status: req.body.status,
                    email_address: req.body.receipt_email,
                };
            }
            //update product quantity with their ids
            req.body.itemQWithId.map((items) => {
                const updatesQ = items.split("-");
                updateQuantity(updatesQ[0],updatesQ[1]); //updating quantity
            })
            //update order payment details and payment time
            const updatedOrder = await order.save();
            res.status(201).json(updatedOrder);
        }
	} catch(error) {
		next(error);
	}
}
//function for updating quantity of product ie numberOfItem
const updateQuantity = async(id,quantity) => {
    const findQuntityById =  await Product.findById({_id:id});
        findQuntityById.numberOfItem = quantity;
        await findQuntityById.save();
}
export const deliverOrder = async (req, res,next) => {
    //console.log(req.params.id);
    try{
	const order = await Order.findById(req.params.id);
        if (order) {
            order.isDelivered = true;
            order.deliveredAt = Date.now();

            const updatedOrder = await order.save();
            res.status(201).json(updatedOrder);
        } 
    }catch(error) {
		next(error);
	}
}
export const myorders = async (req, res,next) => {
	// sort orders in descending order of the date they were created at, hence negetive sign
    try{
        const allOrders = await Order.find({ user: req.user._id }).sort('-createdAt');
        res.status(201).json(allOrders);
    }catch(error){
        next(error);
    }
}
export const stripePayment = async (req, res,next) => {
    try{
	const { price, email } = req.body;

	// Need to create a payment intent according to stripe docs
	// https://stripe.com/docs/api/payment_intents
	const paymentIntent = await stripe.paymentIntents.create({
		amount: price,
		currency: 'inr',
		receipt_email: email,
		payment_method_types: ['card'],
	});

	// send this payment intent to the client side
	res.send({
		clientSecret: paymentIntent.client_secret,
	});
}catch(error){
    next(error);
}
	// another way to include payments, is to create a new charge for a new customer, each time
	// similar to Hitesh's video on accepting stripe payments
	// But uses out dated stripe technique, so excluded for the current implementation

	// const { order, token } = req.body;
	// const idempotencyKey = nanoid();
	// return stripe.customers
	// 	.create({
	// 		email: token.email,
	// 		source: token.id,
	// 	})
	// 	.then((customer) => {
	// 		stripe.charges.create(
	// 			{
	// 				amount: order.totalPrice * 100,
	// 				currency: 'inr',
	// 				customer: customer.id,
	// 				receipt_email: token.email,
	// 				// description: product.name,
	// 			},
	// 			{ idempotencyKey }
	// 		);
	// 	})
	// 	.then((result) => res.status(200).json(result))
	// 	.catch((err) => console.log(err));
}

///order api ends





