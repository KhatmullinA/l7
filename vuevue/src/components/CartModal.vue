<template>
  <el-dialog :visible.sync="isVisible" title="Shopping Cart">
    <el-table :data="cartItems" style="width: 100%">
      <el-table-column prop="name" label="Product Name"></el-table-column>
      <el-table-column prop="quantity" label="Quantity"></el-table-column>
      <el-table-column prop="unitPrice" label="Unit Price" :formatter="formatPrice"></el-table-column>
      <el-table-column prop="total" label="Total Cost" :formatter="formatPrice"></el-table-column>
    </el-table>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeModal">Close</el-button>
      <el-button type="primary" @click="checkout">Checkout</el-button>
    </div>
    <p>Total: ${{ calculateTotal }}</p>
  </el-dialog>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { ElDialog, ElTable, ElTableColumn, ElButton } from 'element-plus';
import type { CartItem } from '@/types';

export default defineComponent({
  components: {
    ElDialog,
    ElTable,
    ElTableColumn,
    ElButton,
  },
  props: {
    isVisible: {
      type: Boolean,
      required: true
    },
    cartItems: {
      type: Array as () => CartItem[],
      default: () => [],
    },
  },
  emits: ['update:isVisible', 'checkout'],
  setup(props, { emit }) {
    const calculateTotal = computed(() => {
      return props.cartItems.reduce((acc, item) => acc + item.total, 0);
    });

    const formatPrice = (value: number): string => {
      return `$${value.toFixed(2)}`;
    };

    const closeModal = () => {
      emit('update:isVisible', false);
    };

    const checkout = () => {
      emit('checkout');
      closeModal();
    };

    return { calculateTotal, formatPrice, closeModal, checkout };
  },
});
</script>

<style scoped>
.dialog-footer {
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  background-color: #f4f4f5;
  border-top: 1px solid #ebebeb;
}

.el-dialog {
  width: 80%;
}

.el-table {
  --el-color-primary: #409eff;
  --el-border-color: #dbdbdb;
  --el-header-bg-color: #f5f7fa;
  --el-row-hover-bg-color: #ecf5ff;
}

.el-button {
  margin-right: 0.5rem;
}

.el-button:last-child {
  margin-right: 0;
}

.el-button--primary {
  background-color: #409eff;
  border-color: #409eff;
  color: #ffffff;
}

.total-cost {
  margin-top: 1rem;
  font-size: 1.2rem;
  font-weight: bold;
  text-align: right;
}
</style>

