import axios from "axios";
import { /*http,*/getAPIUrlOrders,getToken } from "../utils/localStorage";
axios.defaults.withCredentials=true;

export const createOrder = async(order) => {
        // different headers are used when it is a social login, and when it is a std email login
		const config = {
                                headers: {
                                        'Content-Type': 'application/json',
                                        Authorization: `Bearer ${getToken()}`,
                                },
                  };

        return await axios.post(`${getAPIUrlOrders()}/createOrders`,order,config);
}
export const listAllOrder = async(pageNumber) => {
        const config = {
                headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${getToken()}`,
                },
        };
        return await axios.get(`${getAPIUrlOrders()}/listOrders?pageNumber=${pageNumber}`,config);
}
export const getOrderDetail = async(orderID) => {
        // different headers are used when it is a social login, and when it is a std email login
		const config = {
                        headers: {
                                'Content-Type': 'application/json',
                                Authorization: `Bearer ${getToken()}`,
                        },
          };
        return await axios.get(`${getAPIUrlOrders()}/getOrderDetails/${orderID}`,config);
}
export const payOrder = async(orderID, paymentResult) => {
        //alert(orderID+'--'+JSON.stringify(paymentResult));
		const config = {
                        headers: {
                                'Content-Type': 'application/json',
                                Authorization: `Bearer ${getToken()}`,
                        },
          };
        return await axios.put(`${getAPIUrlOrders()}/pay/${orderID}`,paymentResult,config);
}
export const deliverOrder = async(orderID) => {
        //alert(orderID+'--'+JSON.stringify(paymentResult));
		const config = {
                        headers: {
                                'Content-Type': 'application/json',
                                Authorization: `Bearer ${getToken()}`,
                        },
          };
        return await axios.put(`${getAPIUrlOrders()}/deliver/${orderID}`,config);
}
export const listMyOrder = async() => {
        
        const config = {
                headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${getToken()}`,
                },
        };
        return await axios.get(`${getAPIUrlOrders()}/myorders`,config);
}
export const stripeRequest = async(postBody) => {
        const config={
                headers: {
                        'Content-Type': 'application/json',
                },
        }
        return await axios.post(`${getAPIUrlOrders()}/stripe-payment`,postBody,config);
}





