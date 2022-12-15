import {createOrder,listAllOrder,getOrderDetail,payOrder,deliverOrder,listMyOrder} from '../../routes/orderRoutes';
import { toast } from 'react-toastify';
import {
	ORDER_CREATE_REQUEST,
	ORDER_CREATE_SUCCESS,
	ORDER_CREATE_FAIL,
	ORDER_DETAILS_REQUEST,
	ORDER_DETAILS_SUCCESS,
	ORDER_DETAILS_FAIL,
	ORDER_PAY_REQUEST,
	ORDER_PAY_SUCCESS,
	ORDER_PAY_FAIL,
	ORDER_DELIVER_REQUEST,
	ORDER_DELIVER_SUCCESS,
	ORDER_DELIVER_FAIL,
	ORDER_ALL_LIST_REQUEST,
	ORDER_ALL_LIST_SUCCESS,
	ORDER_ALL_LIST_FAIL,
	ORDER_MY_LIST_REQUEST,
	ORDER_MY_LIST_SUCCESS,
	ORDER_MY_LIST_FAIL
} from '../actionTypes/orderConstants';


// get all the details about the order and dispatch only of currently logged in
export const createOrders = (order) => async (dispatch, getState) => {
		dispatch({ type: ORDER_CREATE_REQUEST });

		await createOrder(order).then(response => {

			dispatch({ type: ORDER_CREATE_SUCCESS, payload: response.data });
			if(response.status===201)
			{
				toast.success('Order Created Successfully!', {
					position: "bottom-right",
					hideProgressBar: false,
					progress: undefined,
				});
			}
			else{
				dispatch({
					type: ORDER_CREATE_FAIL,
					payload:response.message,
				});
				toast.success(response.message, {
					position: "bottom-right",
					hideProgressBar: false,
					progress: undefined,
				});
			}
		}).catch ((error) =>  {
		
			dispatch({
				type: ORDER_CREATE_FAIL,
				payload:error.message,
			});
			toast.success(error.message, {
				position: "bottom-right",
				hideProgressBar: false,
				progress: undefined,
			});
		});
}
// list all orders for the admin panel view, include the pagenumber being fetched
export const listAllOrders = () =>async (dispatch, getState) => {

	dispatch({ type: ORDER_ALL_LIST_REQUEST });
	await listAllOrder().then(response => {

		dispatch({ type: ORDER_ALL_LIST_SUCCESS, payload: response.data });
		if(response.status===201)
		{
			/*toast.success('Listing of order at admin panel is showing Successfully!', {
				position: "bottom-right",
				hideProgressBar: false,
				progress: undefined,
			});*/
		}
		else{
			dispatch({
				type: ORDER_ALL_LIST_FAIL,
				payload:response.message,
			});
			toast.success(response.message, {
				position: "bottom-right",
				hideProgressBar: false,
				progress: undefined,
			});
		}
	}).catch ((error) =>  {
	
		dispatch({
			type: ORDER_ALL_LIST_FAIL,
			payload:error.message,
		});
		toast.success(error.message, {
			position: "bottom-right",
			hideProgressBar: false,
			progress: undefined,
		});
	});

};
// get details about a particular order
export const getOrderDetails = (orderID) => async (dispatch, getState) => {
		dispatch({ type: ORDER_DETAILS_REQUEST });

		await getOrderDetail(orderID).then(response => {

			dispatch({ type: ORDER_DETAILS_SUCCESS, payload: response.data });
			if(response.status===201)
			{
				/*toast.success('Order details is showing Successfully!', {
					position: "bottom-right",
					hideProgressBar: false,
					progress: undefined,
				});*/
			}
			else{
				dispatch({
					type: ORDER_DETAILS_FAIL,
					payload:response.message,
				});
				toast.success(response.message, {
					position: "bottom-right",
					hideProgressBar: false,
					progress: undefined,
				});
			}
		}).catch ((error) =>  {
		
			dispatch({
				type: ORDER_DETAILS_FAIL,
				payload:error.message,
			});
			toast.success(error.message, {
				position: "bottom-right",
				hideProgressBar: false,
				progress: undefined,
			});
		});
};

// update the current order to that of a paid one, and store the correct payment result
export const payOrders = (orderID, paymentResult) => async (dispatch, getState) => {
			dispatch({ type: ORDER_PAY_REQUEST });

			await payOrder(orderID,paymentResult).then(response => {

				dispatch({ type: ORDER_PAY_SUCCESS, payload: response.data });
				if(response.status===201)
				{
					toast.success('Payment is Made Successfully!', {
						position: "bottom-right",
						hideProgressBar: false,
						progress: undefined,
					});
				}
				else{
					dispatch({
						type: ORDER_PAY_FAIL,
						payload:response.message,
					});
					toast.success(response.message, {
						position: "bottom-right",
						hideProgressBar: false,
						progress: undefined,
					});
				}
			}).catch ((error) =>  {
			
				dispatch({
					type: ORDER_PAY_FAIL,
					payload:error.message,
				});
				toast.success(error.message, {
					position: "bottom-right",
					hideProgressBar: false,
					progress: undefined,
				});
			});


	};

// Set the current order as delivered, only when logged in user is an admin
export const deliverOrders = (orderID) => async (dispatch, getState) => {
	dispatch({ type: ORDER_DELIVER_REQUEST });
		await deliverOrder(orderID).then(response => {

			dispatch({ type: ORDER_DELIVER_SUCCESS, payload: response.data });
			if(response.status===201)
			{
				toast.success('Current order is marked delivered Successfully!', {
					position: "bottom-right",
					hideProgressBar: false,
					progress: undefined,
				});
			}
			else{
				dispatch({
					type: ORDER_DELIVER_FAIL,
					payload:response.message,
				});
				toast.success(response.message, {
					position: "bottom-right",
					hideProgressBar: false,
					progress: undefined,
				});
			}
		}).catch ((error) =>  {
		
			dispatch({
				type: ORDER_DELIVER_FAIL,
				payload:error.message,
			});
			toast.success(error.message, {
				position: "bottom-right",
				hideProgressBar: false,
				progress: undefined,
			});
		});
};

// list all the orders of a particular user
export const listMyOrders = (userId) => async (dispatch, getState) => {
		dispatch({ type: ORDER_MY_LIST_REQUEST });
		await listMyOrder(userId).then(response => {

			dispatch({ type: ORDER_MY_LIST_SUCCESS, payload: response.data });
			if(response.status===201)
			{
				/*toast.success('Listing of order is showing Successfully!', {
					position: "bottom-right",
					hideProgressBar: false,
					progress: undefined,
				});*/
			}
			else{
				dispatch({
					type: ORDER_MY_LIST_FAIL,
					payload:response.message,
				});
				toast.success(response.message, {
					position: "bottom-right",
					hideProgressBar: false,
					progress: undefined,
				});
			}
		}).catch ((error) =>  {
		
			dispatch({
				type: ORDER_MY_LIST_FAIL,
				payload:error.message,
			});
			toast.success(error.message, {
				position: "bottom-right",
				hideProgressBar: false,
				progress: undefined,
			});
		});
		
};


