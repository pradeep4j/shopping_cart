import {
        PRODUCT_CREATE_REQEUST,
        PRODUCT_CREATE_SUCCESS,
        PRODUCT_CREATE_FAIL,
        PRODUCT_LIST_REQEUST,
        PRODUCT_LIST_SUCCESS,
        PRODUCT_LIST_FAIL   
} from '../actionTypes/productConstants';

export const createProductReducer = (state = {},action) => {
        switch(action.type){
                case PRODUCT_CREATE_REQEUST: return {loading:true};
                case PRODUCT_CREATE_SUCCESS: return {loading:false, productInfo:action.payload};
                case PRODUCT_CREATE_FAIL: return {loading:false, error:action.payload}
                default : return state;
        }
}
export const listProductReducer = (state={},action) => {
        switch(action.type) {
                case PRODUCT_LIST_REQEUST: return {loading:true};
                case PRODUCT_LIST_SUCCESS: return {loading:false, productInfo:action.payload};
                case PRODUCT_LIST_FAIL: return {loading:false, error:action.payload}
                default : return state;

        }
}
export const productListReducer = (state={},action) => {
        switch(action.type) {
                case PRODUCT_LIST_REQEUST: return {loading:true};
                case PRODUCT_LIST_SUCCESS: return {loading:false, productInfo:action.payload};
                case PRODUCT_LIST_FAIL: return {loading:false, error:action.payload}
                default : return state;

        }
}