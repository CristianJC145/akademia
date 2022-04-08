<template>
  <div class="input-group input-group-sm">
    <input type="number" class="form-control" v-model="amount">
    <button class="input-group-text btn btn-primary text-white" v-tooltip="'Agregar al carrito'"
            @click="addToCart">
      <AppIcon icon="shopping-cart"></AppIcon>
    </button>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue';
import AppIcon from '../../../shared/components/AppIcon.vue';
import {ProductCatalogueDto} from '../dtos/productCatalogue.dto';
import {AddProductCatalogueToCartService} from '../services/addProductCatalogueToCart.service';

const addProductCatalogueToCartService = new AddProductCatalogueToCartService();

export default defineComponent({
  name: 'addToCart',
  components: {AppIcon},
  props: {
    product: Object,
  },
  setup(props) {
    const product = props.product as ProductCatalogueDto;
    const amount = ref(1);

    const addToCart = async () => {
      if (amount.value > 0) {
        try {
          await addProductCatalogueToCartService.run({
            quantity: amount.value,
            productId: product.id,
          });
        } catch (e) {

        }
      }
    };

    return {
      amount,
      addToCart,
    };
  },
});
</script>

<style scoped>
.input-group {
  height: 40px !important;
}
</style>