import mongoose from "mongoose";

const customerSchema = mongoose.Schema(
        {
                name:{
                        type:String,
                        required:true,
                        trim: true,
                        minlength:3,
                        maxlength:50
                },
                occupation:{
                        type:String,
                        trim: true,
                        required:true
                },
                email:{
                        type:String,
                        required:true,
                        minlength:8,
                        trim: true,
                        maxlength:50,
                        unique:true, 
                /* match: [
                                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                                'Please add a valid E-mail'
                        ],*/
                },
                password: {
                        type: String,
                        //required:true 
                        trim: true,
                        required : [true, 'Please add a Password'],
                        minlength: [8, 'password must have at least (8) characters'],
                        maxlength: [70, 'password length must not be greater than (70) characters'],
                },                
                phone:{
                        type:Number,
                        required:true,
                        minlength:10
                },
                description:{
                        type:String,
                        required:true,
                        trim: true,
                        minlength:3,
                        maxlength:100                               
                },
                gender: {
                        type: String,
                        enum : ['Male','Female']/*,
                        default: 'NEW'*/
                },
                age : {
                        type:Number,
                        requird:true 
                },
                image:{
                        type:Object
                }
        },   
                {timestamps:true}
        );
const customer = mongoose.model('Customer',customerSchema);

export default customer;