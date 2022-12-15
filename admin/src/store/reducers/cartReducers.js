import {
        CART_LIST_FAIL,
        CART_LIST_REQEUST,
        CART_LIST_SUCCESS,
        CART_PORDUCTTO_CART_REQEUST,
        CART_PORDUCTTO_CART_SUCCESS,
        CART_PORDUCTTO_CART_FAIL,
        CART_PAGE_REQEUST,
        CART_PAGE_SUCCESS,
        CART_PAGE_FAIL,

        CART_ADD_ITEM,
	CART_REMOVE_ITEM,
	CART_SAVE_SHIPPING_ADDRESS,
	CART_SAVE_PAYMENT_METHOD,
	CART_RESET
      } from "../actionTypes/cartConstants";
export const productListingsCartReducer = (state = {cartInfo:[]},action) => {
        switch(action.type){
                case CART_LIST_REQEUST: return {loading:true};
                case CART_LIST_SUCCESS: return {loading:false, cartInfo:action.payload};
                case CART_LIST_FAIL: return {loading:false, error:action.payload}
                default : return { ...state };
        }
}
export const productToCartReducer = (state = {},action) => {
         
        switch(action.type){
                case CART_PORDUCTTO_CART_REQEUST: return {loading:true};
                case CART_PORDUCTTO_CART_SUCCESS: return {loading:false, cartInfo:[action.payload]};
                case CART_PORDUCTTO_CART_FAIL: return {loading:false, error:action.payload}
                default : return { ...state };
        }
}
export const cartPageReducer = (state = {},action) => {
        switch(action.type){
                case CART_PAGE_REQEUST: return {loading:true};
                case CART_PAGE_SUCCESS: return {loading:false, cartInfo:action.payload};
                case CART_PAGE_FAIL: return {loading:false, error:action.payload}
                default : return state;
        }
}
/*export const orderPageReducer = (state = {},action) => {
        switch(action.type){
                case CART_LIST_REQEUST: return {loading:true};
                case CART_LIST_SUCCESS: return {loading:false, cartInfo:action.payload};
                case CART_LIST_FAIL: return {loading:false, error:action.payload}
                default : return state;
        }
}*/
export const cartReducer = (
	state = { cartInfo: [], shippingAddress: {} },
	action
) => {
	switch (action.type) {
		case CART_ADD_ITEM:
			const item = action.payload;
		
			// check if the item exists in the cart
			const existingItem = state.cartInfo.find(
				(ele) => ele._id === item._id
			);
			if (existingItem) {
				return {
					...state,
					cartInfo: state.cartInfo.map((ele) =>
						ele._id === existingItem._id ? item : ele
					),
				};
			} else {
				return {
					...state,
					cartInfo: [...state.cartInfo, item],
				};
			}
		case CART_REMOVE_ITEM:
			return {
				...state,
				cartInfo: state.cartInfo.filter(
					(ele) => ele._id !== action.payload
				),
			};
		case CART_SAVE_SHIPPING_ADDRESS:
			return {
				...state,
				shippingAddress: action.payload,
			};
		case CART_SAVE_PAYMENT_METHOD:
			return {
				...state,
				paymentMethod: action.payload,
			};
		case CART_RESET: {
			return {
				cartInfo: [],
				shippingAddress: action.payload,
			};
		}
		default:
			return { ...state };
	}
};

