<template>
  <div>
    <el-select v-model="selectedProductType" placeholder="Выберите тип товара" @change="onProductTypeChange">
      <el-option v-for="type in productTypes" :key="type.value" :label="type.label" :value="type.value" />
    </el-select>

    <el-select v-model="selectedMaterial" placeholder="Выберите материал" @change="onMaterialChange">
      <el-option v-for="material in filteredMaterials" :key="material.value" :label="material.label"
        :value="material" />
    </el-select>
    <img v-if="selectedMaterial" :src="selectedMaterial.imageUrl" :alt="selectedMaterial.label"
      class="material-image" />
  </div>
</template>

<script lang="ts">
import { ElSelect, ElOption } from 'element-plus';
import { ref, computed, watch } from 'vue';
import type { ProductType, Material } from '@/types';

import oakImage from '@/assets/oak.jpg';
import pineImage from '@/assets/pine.jpg';
import steelImage from '@/assets/steel.jpg';
import aluminumImage from '@/assets/aluminum.jpg';

export default {
  components: {
    ElSelect,
    ElOption,
  },
  setup(_, { emit }) {
    const productTypes = ref<ProductType[]>([
      { value: 'wood', label: 'Древесина' },
      { value: 'metal', label: 'Металл' },
    ]);

    const materials = ref<Record<string, Material[]>>({
      wood: [
        {
          value: 'oak',
          label: 'Дуб',
          price: 20,
          imageUrl: oakImage,
        },
        {
          value: 'pine',
          label: 'Сосна',
          price: 15,
          imageUrl: pineImage,
        },
      ],
      metal: [
        {
          value: 'steel',
          label: 'Сталь',
          price: 30,
          imageUrl: steelImage,
        },
        {
          value: 'aluminum',
          label: 'Алюминий',
          price: 25,
          imageUrl: aluminumImage,
        },
      ],
    });

    const selectedProductType = ref<string | undefined>(undefined);
    const selectedMaterial = ref<Material | undefined>(undefined);

    const filteredMaterials = computed(() => {
      if (selectedProductType.value) {
        return materials.value[selectedProductType.value] || [];
      }
      return [];
    });

    watch(selectedMaterial, (newVal) => {
      if (newVal) {
        emit('material-changed', newVal);
      }
    });

    const onProductTypeChange = (newVal: string) => {
      selectedMaterial.value = undefined;
    };

    const onMaterialChange = (newVal: Material) => {
      selectedMaterial.value = newVal;
      emit('product-changed', newVal);
    };

    return {
      productTypes,
      materials,
      selectedProductType,
      selectedMaterial,
      filteredMaterials,
      onProductTypeChange,
      onMaterialChange,
    };
  },
};
</script>
<style scoped>

.material-image {
  width: 450px;
  height: 560px;
  height: auto;
  display: block;
  margin: 0 auto;
}
</style>


