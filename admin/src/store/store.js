import {createStore,combineReducers,applyMiddleware/*,compose*/} from 'redux';  // configureStore will be used to create store. combineReducers will be used for combining all reducers, applyMiddlware will be used with redux-thunk to apply thunk middlewares if needs.
import thunk from 'redux-thunk';  // if after getting dispatch from action if  it returns function thunk will apply ascynchronously some logic as middleware then give it to reducer.
import { composeWithDevTools } from "redux-devtools-extension";

import {
        userLoginReducer,
        userRegisterReducer,
        userUpdateProfileReducer,
        editUserFromAdminReducer,
        userAllReducer,
        userSearchReducer,
        userDeleteReducer,
        userGetDetailsReducer,
        userConfirmReducer
} from './reducers/authReducers';  // imporeting auth user reducers
import {
        createProductReducer,
        listProductReducer,
        /*,
        productListReducer*/
} from './reducers/productReducers'; //import reducers for product
import {
        productListingsCartReducer,
        productToCartReducer,
        cartPageReducer,
        cartReducer/*,
        orderPageReducer*/
} from './reducers/cartReducers'; //import reducers for cart
import {
	orderCreateReducer,
	orderDetailsReducer,
	orderPayReducer,
	orderDeliverReducer,
	orderListAllReducer,
        orderListMyReducer
} from './reducers/orderReducers';
const reducer = combineReducers({
        userLogin: userLoginReducer,
        userRegister: userRegisterReducer,
        userUpdateProfile: userUpdateProfileReducer,
        editUserFromAdmin:editUserFromAdminReducer,
        userAll:userAllReducer,
        userSearch:userSearchReducer,
        userDelete:userDeleteReducer,
        userDetails:userGetDetailsReducer,
        userConfirm:userConfirmReducer,
        createProduct:createProductReducer,
        listProduct:listProductReducer,
        cart:cartReducer,
     //   productList:productListReducer,
        productListingsCart:productListingsCartReducer,
        productToCart:productToCartReducer,
        cartPage:cartPageReducer,
        orderCreate: orderCreateReducer,
	orderDetails: orderDetailsReducer,
	orderPay: orderPayReducer,
	orderDeliver: orderDeliverReducer,
	orderListAll: orderListAllReducer,
        orderListMy:orderListMyReducer
});

const userInfoFromStorage = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) :"";
const cartInfoFromStorage = localStorage.getItem("cartInfo") ? JSON.parse(localStorage.getItem("cartInfo")) :"";
// get the shipping address from local storage
const shippingAddressFromLocalStorage = localStorage.getItem('shippingAddress')
	? JSON.parse(localStorage.getItem('shippingAddress'))
	: {};

const initialState = {
        userLogin : {userInfo: userInfoFromStorage},
        cart : {cartInfo: [...cartInfoFromStorage],
		shippingAddress: shippingAddressFromLocalStorage}
};

const middleware = [thunk];

const store = createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)));//this is also correct
//const store = createStore(reducer,initialState,composeWithDevTools(applyMiddleware(thunk))); // this is also correct

export default store;
