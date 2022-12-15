import {createProduct,listProduct} from '../../routes/productRoutes';
import {toast} from 'react-toastify';
import {
        PRODUCT_CREATE_REQEUST,
        PRODUCT_CREATE_SUCCESS,
        PRODUCT_CREATE_FAIL,
        PRODUCT_LIST_REQEUST,
        PRODUCT_LIST_SUCCESS,
        PRODUCT_LIST_FAIL   
} from '../actionTypes/productConstants';

export const createProducts = (postBody) => async(dispatch) =>{
        dispatch({type:PRODUCT_CREATE_REQEUST});
        await createProduct(postBody).then(response => {
                dispatch({type:PRODUCT_CREATE_SUCCESS, payload: response.data});
                if(response.status===201){
                        toast.success('Product Added Successfully!', {
                                position: "bottom-right",
                                hideProgressBar: false,
                                progress: undefined,
                        }); 
                document.getElementById("submitting").innerText = "Add products";
                document.getElementById("submitting").disabled  = false;
                }
                else{
                        dispatch({type:PRODUCT_CREATE_FAIL});
                        toast.success(response.message, {
                                position: "bottom-right",
                                hideProgressBar: false,
                                progress: undefined,
                        });  
                document.getElementById("submitting").innerText = "Add products";
                document.getElementById("submitting").disabled  = false;                        
                }
        }).catch(error => {
                dispatch({type:PRODUCT_CREATE_FAIL});
                toast.success(error.message, {
                        position: "bottom-right",
                        hideProgressBar: false,
                        progress: undefined,
                });
                document.getElementById("submitting").innerText = "Add products";
                document.getElementById("submitting").disabled  = false;                
        });
}
export const listAllProducts = () => async(dispatch) =>{
        dispatch({type:PRODUCT_LIST_REQEUST});
        await listProduct().then(response => {
                dispatch({type:PRODUCT_LIST_SUCCESS, payload: response.data});
               // alert(response.status)
                if(response.status===201){
                      /*  toast.success('Product Added Successfully!', {
                                position: "bottom-right",
                                hideProgressBar: false,
                                progress: undefined,
                        }); */
                }
                else{
                        toast.success(response.message, {
                                position: "bottom-right",
                                hideProgressBar: false,
                                progress: undefined,
                        });                      
                }
        }).catch(error => {
                dispatch({type:PRODUCT_LIST_FAIL});
                toast.success(error.message, {
                        position: "bottom-right",
                        hideProgressBar: false,
                        progress: undefined,
                });               
        });
}