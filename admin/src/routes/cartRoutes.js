import axios from "axios";
import { /*http,*/getAPIUrlCarts } from "../utils/localStorage";
axios.defaults.withCredentials=true;

export const listProduct = async() => {
        return await axios.get(`${getAPIUrlCarts()}/listProduct`);
}
export const productCartById = async(id) => {
        return await axios.get(`${getAPIUrlCarts()}/listProductByidCart/${id}`);
}


