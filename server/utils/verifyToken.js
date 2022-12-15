import jwt from "jsonwebtoken";
import User from '../models/User.js';

/*export const verifyToken = async(req, res, next) => {
  let token;

	// if the header includes a Bearer token
	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer')
	) {
		try {
			// get only the token string
			token = req.headers.authorization.split(' ')[1];

			// decode the token to get the corresponding user's id
			const decodedToken = jwt.verify(
				token,
				process.env.JWT_ACCESS_TOKEN_SECRET
			);

			// fetch that user from db, but not get the user's password and set this fetched user to the req.user
			req.user = await User.findById(decodedToken.id).select('-password');
			next();
		} catch (error) {
			console.log(error);
			next(error)
			//throw new Error('Not authorised. Token failed');
		}
	}
};

export const verifyUser = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return res.send("403");//next(createError(403, "You are not authorized!"));
    }
  });
};

export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      return res.send("403"); //next(createError(403, "You are not authorized!"));
    }
  });
};*/

  
export const verifyToken = async(req,res,next) => {
    try{
      let token;

      // if the header includes a Bearer token
      if (req.headers.authorization &&req.headers.authorization.startsWith('Bearer'))
      {

          // get only the token string
          token = req.headers.authorization.split(' ')[1];
          if(!token)
            return res.send("401"); //return res.status(401).json('You are not Authenticated')
          // decode the token to get the corresponding user's id
          const decodedToken = jwt.verify(
            token,
            process.env.JWT
          );
          if(decodedToken){
          // fetch that user from db, but not get the user's password and set this fetched user to the req.user
          req.user = await User.findById(decodedToken.id).select('-password');
          next();
          }
          else {
            return res.send("404");//res.status(404).json("Token is not valid!");
          }
        }
      }catch(error){
        next(error);
      }  
}    

export const verifyUser = (req,res) => {
    /*try{
        const auth = verifyToken(req,res);
        
        if(req.params.id !== auth.id || !auth.isAdmin) {
            return res.send("403");
        }
        else{
            res.status(403).json('You are not authorised to CRUD users')
        }
    /*}catch(error){
        next(error)
    }*/
}
export const verifyAdmin = (req,res,next) => {
    try{
        const auth = verifyToken(req,res,next);
        
           /* if(auth.isAdmin===false) {
                //console.log(auth.isAdmin)
                return res.send("403");
                //res.status(200).json('You are authorised for all user data');
            }
            else{
                next();
                console.log('before'+auth.isAdmin)
                //return res.send("201");
            }*/
            console.log('before'+req.user)
            if (req.user && req.user.isAdmin) next();
            else {
              res.send("403");
              //throw new Error('Not authorised admin');
            }
        
    }catch(error)
    {
        next(error)
    }
}