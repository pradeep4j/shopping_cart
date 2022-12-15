import express from 'express';
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import connection from './database/connection.js';
import cookieParser from "cookie-parser";
import multer from 'multer';
import Logger from './utils/logger.js';

//initialize express server
const app = express();

//initialize environmental congfig
dotenv.config();

//now setting up limit of http request body and urlencoded data
app.use(bodyParser.json({limit:'30mb', extended : true}));
app.use(bodyParser.urlencoded({limit:'30mb', extended : true}));

///fetching username and password from environmental file .env
const username=process.env.DB_USERNAME;
const password=process.env.DB_PASSWORD;
const PORT = process.env.PORT;

connection(username,password);

/* ----middlewares start -----*/
//Using multer middleware and use .diskStorage() method to tell Express where to store files to the disk.
/*const upload = multer({
    dest: 'uploads/',
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
            if(!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
                return cb( new Error('Please upload a valid image file'))
            }
            cb(undefined, true)
        }
    });
const storage = multer.diskStorage({
    destination: function(req, file, callback) {
      callback(null, '/src/my-images');
    },
    filename: function (req, file, callback) {
      callback(null, file.fieldname);
    }
  });*/

// we must use express takes correct json body or check express request body is json or not
app.use(express.json());
//initialize cookie-parser
app.use(cookieParser());
//initialize cors
app.use(cors({ origin:true, credentials:true }));
//setting up default enpoint for api routes which is
app.use('/api/user',userRoutes);
app.use('/api/product',productRoutes);
app.use('/api/cart',cartRoutes);
app.use('/api/order',orderRoutes);

///customized error handler
app.use((err,req,res,next) => {
        const errorStatus = err.status || 500 ;
        const errorMessage = err.message || "somthing went wrong";
        Logger.error({
            success:false,
            status:errorStatus,
            message:errorMessage,
            stack:err.stack});
        res.status(errorStatus).send({
            success:false,
            status:errorStatus,
            message:errorMessage,
            stack:err.stack,
        });
    })
/* ----middlewares end -----*/

//follwoing will show node js server is running 
app.listen(PORT,()=>console.log(`Server is running on PORT ${PORT}`));




