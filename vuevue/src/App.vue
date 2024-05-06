<template>
  <div id="app">
    <product-selector @material-changed="handleMaterialChanged" />
    <quantity-input v-if="selectedMaterial" :unit-price="selectedMaterial.price" @quantity-changed="updateQuantity" />
    <p v-if="selectedMaterial && quantity">
      Общая стоимость: ${{ totalCost.toFixed(2) }}
    </p>
    <el-button v-if="selectedMaterial && quantity" type="primary" @click="addToCart">Добавить в корзину</el-button>
    <el-button type="primary" @click="toggleCartModal">Посмотреть корзину</el-button>

    <simple-modal v-model:isVisible="cartVisible" :cart-items="cartItems" @checkout="handleCheckout" />
  </div>
</template>

<script lang="ts">
import ProductSelector from './components/ProductSelector.vue';
import QuantityInput from './components/QuantityInput.vue';
import SimpleModal from './components/SimpleModal.vue';
import { ElButton } from 'element-plus';
import { ref, computed } from 'vue';
import type { CartItem, Material } from '@/types';

export default {
  components: {
    ProductSelector,
    QuantityInput,
    SimpleModal,
    ElButton,
  },
  setup() {
    const selectedMaterial = ref<Material | null>(null);
    const quantity = ref(0);
    const cartItems = ref<CartItem[]>([]);
    const cartVisible = ref(false);

    const totalCost = computed(() => {
      return selectedMaterial.value ? selectedMaterial.value.price * quantity.value : 0;
    });

    const handleMaterialChanged = (material: Material) => {
      selectedMaterial.value = material;
      quantity.value = 0; 
    };

    const updateQuantity = (qty: number) => {
      quantity.value = qty;
    };

    const addToCart = () => {
      if (selectedMaterial.value && quantity.value > 0) {
        const newItem: CartItem = {
          name: selectedMaterial.value.label,
          quantity: quantity.value,
          unitPrice: selectedMaterial.value.price,
          total: totalCost.value,
        };
        cartItems.value.push(newItem);
      }
    };

    const toggleCartModal = () => {
      cartVisible.value = !cartVisible.value;
    };

    const handleCheckout = () => {
      cartItems.value = [];
      cartVisible.value = false;
    };

    return {
      selectedMaterial,
      quantity,
      cartItems,
      cartVisible,
      totalCost,
      handleMaterialChanged,
      updateQuantity,
      addToCart,
      toggleCartModal,
      handleCheckout,
    };
  },
};
</script>

<style>
#app {
  max-width: 1200px;
  margin: 50px auto;
  text-align: center;
}
.product-image{
  max-width: 10%;
    height: auto;
    display: block;
    margin: 0 auto;
}
</style>


