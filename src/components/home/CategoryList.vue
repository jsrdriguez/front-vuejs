<script setup>
import { ref, reactive } from 'vue'
const props = defineProps({
  categories: {
    type: Array,
    default: []
  },
  onSearch: Function,
  selectedHomeCategories: {
    type: Array,
    default: []
  }
})

const selectedCategories = ref(props.selectedHomeCategories);

function handlerChange(category) {
  const categoryClone = [...selectedCategories.value];
  if (categoryClone.length === 0) {
    selectedCategories.value = [];
    props.onSearch({ category: "" })
    return
  }
  
  selectedCategories.value = [category];

  props.onSearch({ category: selectedCategories.value[0] })
}
</script>

<template>
  <div class="category p-1">
    <div class="category__title py-3 px-1">
      <span class="category__title-text text-xl font-bold">Categorias</span>
    </div>
    <ul class="category__categories">
      <li class="category__categories-item py-3 px-2" 
        v-for="category in categories" :key="category"
      >
        <Checkbox name="category" 
          v-model="selectedCategories" 
          :inputId="category" 
          :value="category"
          @change="() => handlerChange(category)"
        />
        <label :for="category.key" class="ml-3">{{ $filters.capitalize(category) }}</label>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.category {
  &__categories {
    list-style: none;
    padding: 0;
    margin: 0;

    &-item {
      border-bottom: 1px solid #dddada;

      label {
        font-weight: bold;
      }

      &:hover {
        background-color: #f5f4f4;
        border-radius: 4px;
      }
    }
  }
}
</style>