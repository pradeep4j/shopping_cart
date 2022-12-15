import express from "express";
import { isAdmin,protectRoute } from '../utils/authMiddleware.js';
import axios from 'axios'; //here axios only used to validate reCaptcha
import {login,logout,createUsers,usersProfileById,updateUsersProfileById,deleteUsers,allUsers,searchUsersRecordsNav,confirmuser,userEditFromAdminById} from '../controllers/Posts.js';
const router = express.Router();

router.post('/login',login); 
router.get('/logout',logout);
router.post('/add-user',createUsers); //router.route('/add-user').post(protectRoute,createUsers); both the ways will work
router.route('/user-profile/:id').get(protectRoute,usersProfileById);  //this way of request routes is also be taken 
router.put('/update-user-profile/:id',protectRoute,updateUsersProfileById);
router.put('/userEditFromAdminById/:id',protectRoute,userEditFromAdminById);
router.route('/allUsers/:id').get(protectRoute,isAdmin,allUsers);
router.post('/searchUsersRecords/:id',protectRoute,isAdmin,searchUsersRecordsNav);
router.get('/confirmuser/:token',confirmuser);

/**this routes for login/register recaptcha code begins */
router.post('/tokenCaptcha', async (req, res,next) => {
        //taking response token from request body
            const {token} = req.body;
        //sends secret key and response token to google
            await axios.post(
              `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.SECRET_KEY}&response=${token}`
              );
                
                if (res.status(200)) {   //check response status and send back to the client-side
                       // console.log('hi');
                        res.send("Human");
                }else{
                        res.send("Robot");
                }

        });
/**this routes for login/register recaptcha code ends */        
router.delete('/delete/:id',deleteUsers);

export default router;
