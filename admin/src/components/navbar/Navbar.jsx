import React,{ useState, useEffect } from 'react';
import {AppBar,Toolbar, styled,Typography,Box,Menu,MenuItem,Button} from '@mui/material';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { useNavigate,NavLink,Link } from 'react-router-dom';
import '../../hide.css';
import {getProduct} from '../../utils/localStorage';
import { useDispatch,useSelector } from 'react-redux';
import {logoutUser} from '../../store/actions/authActions';
import {removeItem} from '../../store/actions/cartActions';

const Navbar = () => {

   const navigate = useNavigate();
   const dispatch = useDispatch();
   const [name,setName] = useState();
   const [isAdmin,setIsAdmin] = useState();
   const [updateId,setUpdateId] = useState();
   const [imageLoggedInUrl,setImageLoggedInUrl] = useState();
   const userLogin = useSelector(state=>state.userLogin);
   const {userInfo} = userLogin;
   const cart = useSelector((state) => state.cart);
   const { cartInfo } = cart;
   const [userId,setUserid] = useState('');
   const [itemCount, setItemCount] = useState(0);
   //const [cartInfo,setProductInfo] = useState([]);
   const [cartId,setCartId] = useState('');
   const onLogout= async(e) => {
            dispatch(logoutUser());
            dispatch(removeItem(cartId));
           // removeUser();
            localStorage.clear();
            setUserid('');
            //navigate(0); ///reload login page to show recaptcha other wise recaptcha was not loading
            navigate("/");
   }
		// update count when new cart changes
    useEffect(() => {
      setItemCount(cartInfo.reduce((acc, item) => acc + item.qty, 0));
    }, [cartInfo]);

    useEffect(() => {
    let products = getProduct();
		if (products && products[0]) {
      setCartId(products[0]._id);
    }
    ///using funda of local storage it will failwhen logged in used will update their image which is coming from cloudinary cloud of online managing images, documents
    const saved = localStorage.getItem("userInfo");
    //setting up values to hide all navbar urls which are not necessory after login
    if(saved){
        const initialValue = JSON.parse(saved);
       // alert(JSON.stringify(initialValue))
        //for updating navbar conents after login getting content in userId
        if(initialValue)
        {
          setUserid(saved);
          setUpdateId(initialValue._id);
          setName(initialValue.name);
          setIsAdmin(initialValue.isAdmin);
          setImageLoggedInUrl(initialValue.image.url); //image url from cloudinary cloud from localStorage
          // Promise.resolve(getUserById(initialValue._id)).then((result)=>setImageLoggedInUrl(result.data.Image.url));
        }
    }
  },[userInfo,cartInfo]);

  return (
    <Box sx={{ flexGrow: 1 }} >
      <AppBar position="static">
        <Toolbar>
        <Typography variant='h5'  sx={{ flexGrow: 1 }}><Tabs to="/" style={{fontSize: '25px'}}>MERN with Redux Client</Tabs></Typography>
          
              <Tabs color="inherit" to="/home" className={`${!userId ? "mystyle" : ""}`}>Home</Tabs> 
              <Tabs color="inherit" reloadDocument to="/login" className={`${userId ? "mystyle" : ""}`}>Login</Tabs> 
              <Tabs color="inherit" reloadDocument to="/sign-up" className={`${userId ? "mystyle" : ""}`}>Sign Up</Tabs>
              {userId && isAdmin===true && (
                  <div className={`${!userId ? "mystyle" : ""}`} id="admin">
                      <PopupState variant="popover" popupId="demo-popup-menu">
                        {(popupState) => (
                          <React.Fragment>
                            <Button  {...bindTrigger(popupState)}>
                            <Tabs > Admin</Tabs>
                            </Button>
                            <Menu {...bindMenu(popupState)}>
                              <MenuItem onClick={popupState.close}><Tabs color="inherit" style={{color:'black',textDecoration: 'none'}} to="/users" >All Users</Tabs></MenuItem>
                              <MenuItem onClick={popupState.close}><Tabs color="inherit" style={{color:'black',textDecoration: 'none'}} to="/listproduct" >All Products</Tabs></MenuItem>
                              <MenuItem onClick={popupState.close}><Tabs style={{color:'black',textDecoration: 'none'}} to="/orderpage" >Orders</Tabs></MenuItem>
                              {/* <MenuItem onClick={popupState.close}><Tabs style={{color:'black',textDecoration: 'none'}} to="/modal" >Modal Test</Tabs></MenuItem> */}
                            </Menu>
                          </React.Fragment>
                        )}
                      </PopupState>
                  </div>
                  )}
                  <div className={`${!userId ? "mystyle" : ""}`} id="profile">
                       <PopupState variant="popover" popupId="demo-popup-menu">
                          {(popupState) => (
                            <React.Fragment>
                              <Button  {...bindTrigger(popupState)}>
                              <Tabs >{name}</Tabs><img src={imageLoggedInUrl} className='bag-quantity' alt=""/>
                              </Button>
                              <Menu {...bindMenu(popupState)}>
                                <MenuItem onClick={popupState.close}><a style={{color:'black',textDecoration: 'none'}} href={`/user-profile/${updateId}`} >Profile</a></MenuItem>
                                <MenuItem onClick={popupState.close}><Tabs color="inherit" style={{color:'black',textDecoration: 'none'}} onClick={(e) => {onLogout(e)}}>Logout</Tabs></MenuItem>
                              </Menu>
                            </React.Fragment>
                          )}
                        </PopupState>

                  </div>
                  <div id="ex4">
                   {itemCount >0 ? 
                                     (<Tabs3 to={`/cart/${cartId}`}><span class="p1 fa-stack fa-2x has-badge" data-count={itemCount}>
                                        <i class="p4 fa fa-shopping-cart fa-stack-1x xfa-inverse" /*style={{fontSize:'10px'}}*/><Tabs2>Cart</Tabs2></i>
                                      </span>
                                       </Tabs3>)
                                      : (<Tabs3 to={`/cart/${cartId}`}><span class="p1 fa-stack fa-2x has-badge"  >
                                      <i class="p4 fa fa-shopping-cart fa-stack-1x xfa-inverse" /*style={{fontSize:'10px'}}*/><Tabs2>Cart</Tabs2></i>
                                    </span>
                                     </Tabs3>) }

                  
                  </div>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Navbar;

const Tabs = styled(NavLink)`
font-size: 15px;
margin-right: 20px;
color:white;
text-decoration:none;
text-transform: capitalize;
`
const Tabs2 = styled(NavLink)`
font-size: 13px;
margin-right: 20px;
color:white;
text-decoration:none;
text-transform: capitalize;
`
const Tabs3 = styled(NavLink)`
font-size: 10px;
margin-right: 20px;
color:white;
text-decoration:none;
text-transform: capitalize;
`