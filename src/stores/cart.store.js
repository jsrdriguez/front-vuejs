import { defineStore } from 'pinia';
import { saveLocalStorage, getLocalStorage } from '../utils';

export const useCartStore = defineStore('cart', {
  state: () => ({
    cartProducts: []
  }),
  actions: {
    addCart(product) {
      const productSearh = [...this.cartProducts].find(item => item.id === product.id);
      if (!productSearh) {
        product.quantity = 1 
        this.cartProducts = [...this.cartProducts, product];
        saveLocalStorage(this.cartProducts, "carts");
        return;
      }
      
      this.cartProducts = [...this.cartProducts].map(item => {
        if (item.id === product.id) {
          item.quantity = item.quantity + 1
          return item
        }
        return item
      });

      saveLocalStorage(this.cartProducts, "carts");
    },
    deleteCart(product) { 
      const productSearh = [...this.cartProducts].filter(item => item.id !== product.id);
      this.cartProducts = productSearh;
      saveLocalStorage(productSearh, "carts");

      if (productSearh.length === 0) {
        this.$router.push({ name: 'home' });
      }

    },
    loadCartProducts() {
      const data = getLocalStorage("carts");
      this.cartProducts = data;
    },
    updateCart() {
      saveLocalStorage([...this.cartProducts], "carts");
    }
  },
  getters: {
    cartProductCount: (state) => state.cartProducts.length,
    cartTotalProduct: (state) => state.cartProducts.reduce((accum, item) => accum + (item.price*item.quantity), 0),
  },
});