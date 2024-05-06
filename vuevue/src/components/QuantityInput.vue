<template>
  <div>
    <el-input-number v-model.number="quantity" :min="1" aria-label="Quantity" @change="handleQuantityChange" />
    <p>Цена за единицу товара: ${{ unitPrice.toFixed(2) }}</p>
    <p>Общая стоимость: ${{ totalCost.toFixed(2) }}</p>
  </div>
</template>

<script lang="ts">
import { ElInputNumber } from 'element-plus';
import { ref, computed, defineComponent } from 'vue';
import type { PropType } from 'vue';

export default defineComponent({
  components: {
    ElInputNumber,
  },
  props: {
    unitPrice: {
      type: Number as PropType<number>,
      required: true 
    },
  },
  setup(props, { emit }) {
    const quantity = ref<number>(1); 

    const totalCost = computed(() => {
      return props.unitPrice * quantity.value;
    });

    const handleQuantityChange = (newQuantity: number | undefined) => {
      if (newQuantity !== undefined) {
        quantity.value = newQuantity;
        emit('quantity-changed', newQuantity);
      }
    };

    return { quantity, totalCost, handleQuantityChange };
  },
});
</script>

<style scoped>
</style>

