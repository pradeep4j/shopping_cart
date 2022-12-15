import dotenv from 'dotenv';
import cloudinaryModule from 'cloudinary';

dotenv.config();

const Cloudinary = cloudinaryModule.v2;

Cloudinary.config({
        cloud_name: process.env.CLOUDINARY_NAME,
           api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET

});

export default Cloudinary;