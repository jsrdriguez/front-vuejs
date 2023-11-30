<template>
  <div class="grid">
    <div class="col-fixed w-2">
      <CategoryList
        :categories="categories"
        :onSearch="categoryProduct"
      />
    </div>
    <div class="col w-8">
      <ProductList 
        :products="products"
        :onSearch="titleProduct"
        :onAddCart="handlerAddCart"
      />
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'

import { useProductStore } from '@/stores/product.store'
import { useCartStore } from '@/stores/cart.store'

import CategoryList from '../components/home/CategoryList.vue';
import ProductList from '../components/home/ProductList.vue';

const store = useProductStore()
const storeCart = useCartStore()
const { categories, products } = storeToRefs(store)

store.init();

function handlerAddCart(product) {
  storeCart.addCart(product);
}

function titleProduct(params) {
  if (params["title"] === "") {
    store.getProducts(params);
    return;
  } 

  store.productByTitle(params["title"])
}

function categoryProduct(params) {
  if (params["category"] === "") {
    store.getProducts(params);
    return;
  } 

  store.productByCategory(params["category"])
}
</script>

<style scoped lang="scss">

</style>
