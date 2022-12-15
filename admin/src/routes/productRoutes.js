import axios from "axios";
import { /*http,*/getAPIUrlProducts,getToken } from "../utils/localStorage";
axios.defaults.withCredentials=true;

export const createProduct = async(data) => {
        const config = {
                headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${getToken()}`,
                },
        };
        return await axios.post(`${getAPIUrlProducts()}/createProducts`,data,config);
}
export const listProduct = async(data) => {
        const config = {
                headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${getToken()}`,
                },
        };
        return await axios.get(`${getAPIUrlProducts()}/listProduct`,config);
}
/*export const productById = async(id) => {
        alert()
        return await axios.get(`${getAPIUrlProducts()}/listProductByidCart/${id}`);
}*/