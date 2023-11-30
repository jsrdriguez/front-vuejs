import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', {
  state: () => ({
    products: [],
    categories: []
  }),
  actions: {
    increment(option) {
      
    },
    async getProducts() {
    },
  
  },
  getters: {
  
  },
});