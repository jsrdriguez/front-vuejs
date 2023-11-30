<script setup>
import { storeToRefs } from 'pinia'
import { useCartStore } from '@/stores/cart.store'

const storeCart = useCartStore();
const { cartProducts } = storeToRefs(storeCart)
</script>

<template>
  <div class="card">
    <DataTable :value="cartProducts" tableStyle="min-width: 50rem">
      <template #header>
        <div class="flex flex-wrap align-items-center justify-content-between gap-2">
          <span class="text-2xl text-900 font-bold">Carro de compras ({{ storeCart.cartProductCount }} Productos)</span>
        </div>
      </template>
      <Column header="Image">
        <template #body="slotProps">
          <img :src="`${slotProps.data.image}`" :alt="slotProps.data.image" class="w-6rem shadow-2 border-round" />
        </template>
      </Column>
      <Column field="title" header="Nombre"></Column>
      <Column field="price" header="Precio">
        <template #body="slotProps">
          {{ $filters.formatCurrency(slotProps.data.price) }}
        </template>
      </Column>
      <Column field="category" header="Category"></Column>
      <Column header="Cantidad" alignFrozen="right">
        <template #body="slotProps">
          <InputNumber 
            v-model="slotProps.data.quantity" 
            min="1"
            allowEmpty="false"
            showButtons 
            buttonLayout="horizontal" 
            style="width: 10px"
            decrementButtonClassName="p-button-secondary" 
            incrementButtonClassName="p-button-secondary" 
            incrementButtonIcon="pi pi-plus" 
            decrementButtonIcon="pi pi-minus"
            @input="storeCart.updateCart"
          />
        </template>
      </Column>
      <Column header="SubTotal">
        <template #body="slotProps">
          <div class="flex flex-row-reverse">
            {{ $filters.formatCurrency(slotProps.data.price*slotProps.data.quantity) }}
          </div>
        </template>
      </Column>
      <Column header="Acción">
        <template #body="slotProps">
          <div class="flex flex-row-reverse">
            <Button icon="pi pi-times" 
              severity="danger" 
              rounded 
              outlined aria-label="Cancel" 
              @click="() => storeCart.deleteCart(slotProps.data)"/>
          </div>
        </template>
      </Column>
      <template #footer> 
        <div class="flex flex-wrap align-items-center flex-row-reverse pr-8 mr-7 py-3 text-xl">
          Total: {{ $filters.formatCurrency(storeCart.cartTotalProduct) }} 
        </div>
      </template>
    </DataTable>
  </div>
</template>

