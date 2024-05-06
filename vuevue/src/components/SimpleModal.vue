<template>
  <teleport to="body">
    <div v-if="isVisible" class="modal-overlay">
      <div class="modal-content">
        <div class="modal-header">
          <h3>Корзина</h3>
          <button class="close-btn" @click="closeModal">&#10005;</button>
        </div>
        <div class="modal-body">
          <ul>
            <li v-for="item in cartItems" :key="item.name">
              {{ item.name }} - Количество: {{ item.quantity }} - Общий: ${{ item.total.toFixed(2) }}
            </li>
          </ul>
          <p>Итог: ${{ calculateTotal }}</p>
        </div>
        <div class="modal-footer">
          <button @click="checkout">Очистить</button>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script>
import { computed } from 'vue';

export default {
  props: {
    isVisible: Boolean,
    cartItems: {
      type: Array,
      required: true,
    },
  },
  setup(props, { emit }) {
    const calculateTotal = computed(() => {
      return props.cartItems.reduce((acc, item) => acc + item.total, 0);
    });

    const closeModal = () => {
      emit('update:isVisible', false);
    };

    const checkout = () => {
      emit('checkout');
      closeModal();
    };

    return { calculateTotal, closeModal, checkout };
  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.modal-content {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  width: 90%;
  max-width: 500px;
  animation: modal-in 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

.modal-header {
  padding: 15px;
  border-bottom: 2px solid #f0f0f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f9f9f9;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}

.modal-header h3 {
  margin: 0;
  color: #333;
  font-size: 1.2rem;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.25rem;
  color: #666;
  cursor: pointer;
}

.modal-body {
  padding: 20px;
  color: #555;
  line-height: 1.5;
  list-style: none;
}
.modal-body ul {
  padding: 0;
}

.modal-body li {
  list-style-type: none;
}

.modal-footer {
  padding: 10px 20px;
  border-top: 1px solid #f0f0f0;
  display: flex;
  justify-content: flex-end;
  background: #f9f9f9;
}

.modal-footer button {
  padding: 8px 16px;
  background-color: #007BFF;
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.modal-footer button:hover {
  background-color: #0056b3;
}

@keyframes modal-in {
  from {
    transform: translateY(-50px);
    opacity: 0;
  }

  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
