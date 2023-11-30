<script setup>
import { ref } from "vue";

const props = defineProps({
  products: {
    type: Array,
    default: []
  },
  onSearch: Function,
  onAddCart: Function
})

const searchTitle = ref('');
const layout = ref('grid');

function handlerSearch() {
  if (searchTitle.value.length === 0) {
    props.onSearch({title: ""});
    return;
  }

  if (searchTitle.value.length < 2) return;

  props.onSearch({title: searchTitle.value});
}
</script>

<template>
  <div class="card">
    <DataView :value="products" :layout="layout" :rows="6" paginator>
      <template #header>
        <div class="flex justify-content-between">
          <span class="p-input-icon-left w-8" >
            <i class="pi pi-search" />
            <InputText v-model="searchTitle" 
              placeholder="Buscar producto" 
              size="large" 
              class="w-8"
              @keyup="handlerSearch"
            />
          </span>

          <DataViewLayoutOptions v-model="layout"/>
        </div>
      </template>

      <template #grid="slotProps">
        <div class="grid grid-nogutter">
          <div v-for="(item, index) in slotProps.items" :key="index" class="col-12 sm:col-6 lg:col-12 xl:col-4 p-2">
            <div class="p-4 border-1 surface-border surface-card border-round">
              <div class="flex flex-wrap align-items-center justify-content-between gap-2">
                <div class="flex align-items-center gap-2">
                  <i class="pi pi-tag"></i>
                  <span class="font-semibold">{{ $filters.capitalize(item.category) }}</span>
                </div>
              </div>
              <div class="flex flex-column align-items-center gap-3 py-5">
                <div class="w-9 p-2 flex justify-content-center content-image">
                  <img class=" border-round" :src="item.image" :alt="item.name" />
                </div>
                
                <div class="text-2xl font-bold content-title">{{ $filters.split(item.title) }}</div>
                <Rating :modelValue="item.rating.rate" readonly :cancel="false"></Rating>
              </div>
              <div class="flex align-items-center justify-content-between">
                <span class="text-2xl font-semibold">${{ item.price }}</span>
                <Button icon="pi pi-cart-plus" rounded :disabled="item.rating.count === 0" @click="() => onAddCart(item)"></Button>
              </div>
            </div>
          </div>
        </div>
      </template>
            
      <template #list="slotProps">
        <div class="grid grid-nogutter">
          <div v-for="(item, index) in slotProps.items" :key="index" class="col-12">
            <div class="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4" :class="{ 'border-top-1 surface-border': index !== 0 }">
              <img class="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" :src="item.image" :alt="item.name" />
              <div class="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                <div class="flex flex-column align-items-center sm:align-items-start gap-3">
                  <div class="flex align-items-center gap-3">
                    <span class="flex align-items-center gap-2">
                      <i class="pi pi-tag"></i>
                      <span class="font-semibold">{{ $filters.capitalize(item.category) }}</span>
                    </span>
                  </div>
                  <div class="text-2xl font-bold text-900">{{ item.title }}</div>
                  <div class="text-lg  text-900 pt-2 pb-4">{{ item.description }}</div>
                 <Rating :modelValue="item.rating.rate" readonly :cancel="false"></Rating>
                </div>
                <div class="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                  <span class="text-2xl font-semibold">${{ item.price }}</span>
                  <Button class="mt-3" icon="pi pi-cart-plus" rounded :disabled="item.rating.count === 0" @click="() => onAddCart(item)"></Button>
                </div>
                </div>
            </div>
          </div>
        </div>
      </template>
    </DataView>
  </div>
</template>
<style lang="scss" scoped>
.content-image {
  max-height: 200px !important;
  max-width: 240px !important;
  width: auto;
  
  img {
    height: 200px !important;
  }
}

.content-title {
  height: 50px;
}
</style>