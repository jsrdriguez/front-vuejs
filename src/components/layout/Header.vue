<script setup>
import { ref } from 'vue'
import { useCartStore } from '@/stores/cart.store'

const storeCart = useCartStore();
const items = ref([
  {
    label: 'VueCart',
    icon: '',
    route: '/'
  }
]);
</script>
<template>
  <Menubar :model="items" class="px-8 mb-4 py-3">
    <template #start>    
    </template>
    <template #item="{ item, props, hasSubmenu }">
      <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
        <a v-ripple :href="href" v-bind="props.action" @click="navigate">
          <span :class="item.icon" />
          <span class="text-xl">{{ item.label }}</span>
        </a>
      </router-link>
      <a v-else v-ripple :href="item.url" :target="item.target" v-bind="props.action">
        <span :class="item.icon" />
        <span class="ml-2">{{ item.label }}</span>
        <span v-if="hasSubmenu" class="pi pi-fw pi-angle-down ml-2" />
      </a>
    </template>
    <template #end>
      <div class="flex align-items-center gap-2">
        <Avatar icon="pi pi-shopping-cart " shape="circle" size="large" v-if="storeCart.cartProductCount === 0"/>
        <router-link v-else to="/cart">
          <Avatar 
            icon="pi pi-shopping-cart " 
            shape="circle" 
            size="large" 
            v-badge="storeCart.cartProductCount" 
          />
        </router-link>
      </div>
    </template>
  </Menubar>
</template>
