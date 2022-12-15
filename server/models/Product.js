import mongoose from 'mongoose';
// a schema for stroing reviews for each product
const reviewsSchema = mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
		name: { type: String, required: true },
		avatar: { type: String, required: true },
		rating: { type: Number, required: true, default: 0 },
		review: { type: String, required: true },
	},
	{ timestamps: true }
);
const productSchema = mongoose.Schema({
        user: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: 'User',
        },
        name: {
                type:String,
                required:true,
                minlength: [8,'Product name must have minimum 8 characters!'],
                maxlength: [100,'Product name must have maximum 50 characters!']
        },
        rate: {
                type: Number,
                required:true
        },
        description:{
                type:String,
                required:true,
                minlength: [8,'Product description must have minimum 8 characters!'],
                maxlength: [1500,'Product description must have maximum 150 characters!']
        },        
        numberOfItem:{
                type:Number,
                required:true
        },
        // store an array of review objs
	reviews: [reviewsSchema],
        ratings:{
                type:Number,
                required:true,
                default:0
        },
        image:{
                type: Object
        },        
        isPurchased:{
                type:Boolean,
                default:false
        }
        },
        {timestamps:true}
);

const Product = mongoose.model('Product',productSchema);
export default Product;