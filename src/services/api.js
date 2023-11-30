import axios from 'axios'

const API = "https://fakestoreapi.com";

export default {
    getProducts: async () => {
        return await axios.get(`${API}/products`);
    },
    
    getCategories: async () => {
        return await axios.get(`${API}/products/categories`);
    },

    getProductByCategory: async (category) => {
        return await axios.get(`${API}/products/category/${category}`);
    },
}