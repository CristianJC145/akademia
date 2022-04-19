<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <h1 class="h3">Mi carrito</h1>
      </div>
    </div>

    <div class="row g-4">
      <div class="col-12 col-lg-8">
        <div class="card">
          <div class="card-body d-flex flex-column gap-4">
            <div v-for="cart in shoppingCart.value">
              <h2 class="lead">{{ cart.name }}</h2>

              <table class="table">
                <thead>
                <tr class="text-center">
                  <th style="width: 55%">Plan</th>
                  <th style="width: 15%">Cantidad</th>
                  <th style="width: 30%;">Total</th>
                  <th></th>
                </tr>
                </thead>

                <tbody>
                <tr v-for="product in cart.products" :key="product.id">
                  <td>
                    <div class="d-flex flex-column">
                      <span>
                      {{ product.productTitle }}
                    </span>
                      <span>
                      $ {{ product.defaultUnitValue }}
                    </span>
                    </div>
                  </td>
                  <td>
                    <div class="d-flex align-items-center gap-2 justify-content-center">
                      <button class="btn btn-outline-primary btn-sm btn-increase-decrease"
                              :disabled="product.quantity <= 1"
                              @click="increaseOrDecreaseAmounts(product, 'decrease')">
                        -
                      </button>
                      <input type="number" class="form-control input-amount" v-model="product.quantity"
                             @change="updateShoppingCart(product)">
                      <button class="btn btn-outline-primary btn-sm btn-increase-decrease"
                              @click="increaseOrDecreaseAmounts(product, 'increase')">
                        +
                      </button>
                    </div>
                  </td>
                  <td class="tw-text-right">
                    {{ product.defaultUnitValue * product.quantity }}
                  </td>
                  <td>
                    <button class="btn btn-outline-primary btn-sm" @click="deleteShoppingCart(product.id)">
                      <AppIcon icon="trash"></AppIcon>
                    </button>
                  </td>
                </tr>
                </tbody>

              </table>

            </div>

          </div>
        </div>
      </div>

      <div class="col-12 col-lg-4">
        <div class="card">
          <div class="card-body">
            <h3 class="h6">Resumen de la compra</h3>
            <div class="d-flex justify-content-between lead">
              <span>
                Total
              </span>
              <span>
                {{ total }}
              </span>
            </div>

            <div class="d-grid">
              <button class="btn btn-primary text-white">
                CONTINUAR
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, onMounted, reactive} from 'vue';
import {
  CartProductDto,
  GetShoppingCartService,
  LevelsProduct,
} from '../services/getShoppingCart.service';
import {UpdateProductCatalogueToCartService} from '../services/updateProductCatalogueToCart.service';
import AppIcon from '../../../shared/components/AppIcon.vue';
import {DeleteProductCatalogueToCartService} from '../services/deleteProductCatalogueToCart.service';

const getShoppingCartService = new GetShoppingCartService();
const updateProductCatalogueToCartService = new UpdateProductCatalogueToCartService();
const deleteProductCatalogueToCartService = new DeleteProductCatalogueToCartService();

export default defineComponent({
  name: 'ShoppingCart',
  components: {AppIcon},
  setup() {
    let shoppingCart: { value: LevelsProduct[] } = reactive({
      value: [],
    });

    onMounted(async () => {
      await getShoppingCart();
    });

    const total = computed(() => {
      let total = 0;

      shoppingCart.value.forEach((cart: any) => {
        cart.products.forEach((product: any) => {
          total += product.defaultUnitValue * product.quantity;
        });
      });

      return total;
    });

    const getShoppingCart = async () => {
      shoppingCart.value = (await getShoppingCartService.run()).levelsProducts;
    };

    const increaseOrDecreaseAmounts = async (cart: CartProductDto, action = 'increase') => {
      if (action === 'increase') {
        cart.quantity++;
      } else {
        cart.quantity--;
      }

      await updateShoppingCart(cart);
    };

    const updateShoppingCart = async (cart: CartProductDto) => {
      try {
        await updateProductCatalogueToCartService.run(cart.id, {
          productId: cart.productId,
          quantity: cart.quantity,
        });
      } catch (e) {

      }
    };

    const deleteShoppingCart = async (shoppingCartId: number) => {
      try {
        await deleteProductCatalogueToCartService.run(shoppingCartId);
        await getShoppingCart();
      } catch (e) {

      }
    };

    return {
      shoppingCart,
      total,
      updateShoppingCart,
      increaseOrDecreaseAmounts,
      deleteShoppingCart,
    };
  },
});
</script>

<style scoped>
.input-amount {
  width: 50px;
  height: 30px;
  -moz-appearance: textfield;
}

.input-amount::-webkit-outer-spin-button,
.input-amount::-webkit-inner-spin-button {
  -webkit-appearance: none;
}

.btn-increase-decrease {
  width: 40px;
}
</style>