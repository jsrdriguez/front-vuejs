import { defineStore } from 'pinia';
import api from '../services/api';

export const useProductStore = defineStore('product', {
  state: () => ({
    products: [],
    categories: [],
    searchParams: {
      "title": "",
      "category": ""
    }
  }),
  actions: {
    async getProducts(params) {
      this.searchParams = {...this.searchParams, ...params}
      const { title, category } = this.searchParams;
      if (title === "" && category === "") {
        const products = await api.getProducts();
        this.products = products.data;
        return;
      }

      if (title === "" && category !== "") {
        this.productByCategory(category);
        return
      }

      if (title !== "" && category === "") {
        const products = await api.getProducts();
        this.products = products.data;
        
        this.productByTitle(title);
      }
    },
    async init() {
      const categories = await api.getCategories();
      const products = await api.getProducts();

      this.categories = categories.data;
      this.products = products.data;
    },
    async productByCategory(category) {
      this.searchParams = {...this.searchParams, category}
      const products = await api.getProductByCategory(category);
      this.products = products.data;
    },
    productByTitle(title) {
      this.searchParams = {...this.searchParams, title}
      const productsData = [...this.products];
      const filter = productsData.filter(product => product.title.toLowerCase().indexOf(title.toLowerCase()) > -1);

      this.products = filter;
    },
  },
  getters: {
  },
});