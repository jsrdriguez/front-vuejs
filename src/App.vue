<script setup>
import { useCartStore } from '@/stores/cart.store'
import Header from './components/layout/Header.vue';

const storeCart = useCartStore();

storeCart.loadCartProducts();
</script>

<template>
  <Header />
  <div class="flex justify-content-center">
    <div id="home" class="landing-wrapper overflow-hidden">
      <router-view />
    </div>
   </div>
</template>

<style scoped></style>
