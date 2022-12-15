import mongoose from 'mongoose';
//import autoIncrement from 'mongoose-auto-increment';

const userSchema = mongoose.Schema({
            name: {
              type: String,
              //required:true,
              trim: true,
              required : true,//[true, 'Please add a Name'],
              minlength:3,
              maxlength: 50 
            },
            occupation:{
              type:String,
              trim: true,
              required:true
            },
            email: {
              type: String,
              trim: true,
              required : true,//[true, 'Please add a E-mail'],
              minlength:8,
              maxlength:100,
              //required:true,
              /*match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                'Please add a valid E-mail'
              ],*/
              unique:true 
            },
            password: {
              type: String,
              //required:true 
              trim: true,
              required : [true, 'Please add a Password'],
              minlength: [8, 'password must have at least 8 characters'],
              maxlength: [70, 'password length must not be greater than (70) characters'],
              /*match: [
                /^(?=.*\d)(?=.*[@#\-_$%^&+=ยง!\?])(?=.*[a-z])(?=.*[A-Z])[0-9A-Za-z@#\-_$%^&+=ยง!\?]+$/,
              'Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number and a special characters'
              ]*/
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
              maxlength:1000                               
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
            image: {
              type: Object
            },
            isAdmin:{
              type:Boolean,
              default: false
            },
            isConfirmed:{
              type:Boolean,
              default: false
            },
          },
            {timestamps:true}
);
//using auto increment we must us two plugins as follows
//autoIncrement.initialize(mongoose.connection);
//postSchema.plugin(autoIncrement.plugin,'PostMessage');

const User = mongoose.model('User',userSchema); //here 'PostMessage' = table = collection

export default User;