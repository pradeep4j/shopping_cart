import { listProduct,productCartById } from "../../routes/cartRoutes";
import { toast } from 'react-toastify';
import {
        CART_LIST_FAIL,
        CART_LIST_REQEUST,
        CART_LIST_SUCCESS,
        CART_PORDUCTTO_CART_REQEUST,
        CART_PORDUCTTO_CART_SUCCESS,
        CART_PORDUCTTO_CART_FAIL,
        CART_ADD_ITEM,
	CART_REMOVE_ITEM,
	CART_SAVE_SHIPPING_ADDRESS,
	CART_SAVE_PAYMENT_METHOD/*,
        CART_RESET,
        USER_UPDATE_FAIL,
        USER_UPDATE_REQUEST,
        USER_UPDATE_SUCCESS,*/
      } from "../actionTypes/cartConstants";
export const productListings = () => async(dispatch) => {
        dispatch({type:CART_LIST_REQEUST});
                
                await listProduct().then(response => {
                        dispatch({type:CART_LIST_SUCCESS,payload:response.data});
                        if(response.status===201){
                              //  setProduct(response.data);
                               /* toast.success('User is Logged in Successfully!', {
                                        position: "bottom-right",
                                        hideProgressBar: false,
                                        progress: undefined,
                                });*/
                        }
                        else{
                                dispatch({type:CART_LIST_FAIL,payload:response.message});
                               /* toast.success('User is Logged in Successfully!', {
                                        position: "bottom-right",
                                        hideProgressBar: false,
                                        progress: undefined,
                                });  */
                        }

                }).catch(error => {
                        dispatch({type:CART_LIST_FAIL,payload:error.message});
                        toast.success(error.message, {
                                position: "bottom-right",
                                hideProgressBar: false,
                                progress: undefined,
                        });
                });
}
export const productByIdToCart = (id) => async(dispatch) => {
        dispatch({type:CART_PORDUCTTO_CART_REQEUST});
                
                await productCartById(id).then(response => {
                        dispatch({type:CART_PORDUCTTO_CART_SUCCESS,payload:response.data});
                        if(response.status===201){
                               // setProduct(response.data);
                               /* toast.success('User is Logged in Successfully!', {
                                        position: "bottom-right",
                                        hideProgressBar: false,
                                        progress: undefined,
                                });*/
                        }
                        else{
                              /*  dispatch({type:CART_LIST_FAIL,payload:response.message});
                                toast.success('User is Logged in Successfully!', {
                                        position: "bottom-right",
                                        hideProgressBar: false,
                                        progress: undefined,
                                });  */
                        }

                }).catch(error => {
                        dispatch({type:CART_PORDUCTTO_CART_FAIL,payload:error.message});
                        toast.success(error.message, {
                                position: "bottom-right",
                                hideProgressBar: false,
                                progress: undefined,
                        });
                });
}
// get the product id and the quantity of the item to add to the cart
export const addItem = (id, qty) => async (dispatch, getState) => {
	try {
		await productCartById(id).then(response => {
                        dispatch({
                                type: CART_ADD_ITEM,
                                payload: {
                                        _id: response.data._id,
                                        name: response.data.name,
                                        image: response.data.image,
                                        rate: response.data.rate,
                                        numberOfItem: response.data.numberOfItem,
                                        qty,}
                                
                        });
                });
		// update the local storage with the new cart
               // alert('setting'+JSON.stringify(getState().cart.cartInfo))
                
		localStorage.setItem(
			'cartInfo',
			JSON.stringify(getState().cart.cartInfo)
		);
	} catch (error) {
		console.error(error);
	}
};

// get the product id to be removed from the cart
export const removeItem = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: CART_REMOVE_ITEM,
			payload: id,
		});
		// update the session storage with the updated cart
		localStorage.setItem(
			'cartInfo',
			JSON.stringify(getState().cart.cartInfo)
		);
	} catch (error) {
		console.log(error);
	}
};

// get the shipping address data and dispatch corresponding action
export const saveShippingAddress = (data) => async (dispatch) => {
	try {
		dispatch({
			type: CART_SAVE_SHIPPING_ADDRESS,
			payload: data,
		});
		localStorage.setItem('shippingAddress', JSON.stringify(data));
	} catch (error) {
		console.log(error);
	}
};

// get the option for payment and update the local storage as well
export const savePaymentMethod = (data) => async (dispatch) => {
	try {
		dispatch({
			type: CART_SAVE_PAYMENT_METHOD,
			payload: data,
		});
		localStorage.setItem('paymentMethod', JSON.stringify(data));
	} catch (error) {
		console.log(error);
	}
};
