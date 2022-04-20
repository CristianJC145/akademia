<template>
  <div class="container mt-4">
    <AppLoading v-if="loading"></AppLoading>
    <template v-else>
      <div class="row">
        <div class="col-12">
          <AppBreadCrumbs :routes="routes"></AppBreadCrumbs>
        </div>
      </div>

      <div class="row">
        <div class="col-12">
          <h1 class="h3">Carrito de compras</h1>
        </div>
      </div>

      <div class="row" v-if="!shoppingCart.value.length">
        <div class="col-12">
          <div class="card">
            <div class="card-body">
              <AppEmptyResponse
                  size="sm"
                  title="No tienes productos agregados en el carrito"
                  :subtitle="false"
                  :show-image="true"
                  go="/"
                  go-text="Comprar"
              ></AppEmptyResponse>
            </div>
          </div>
        </div>
      </div>

      <div class="row g-4" v-else>
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
                <button class="btn btn-primary text-white" @click="showModalPayment = !showModalPayment">
                  PAGAR
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AppModal v-model="showModalPayment" @close="showModalPayment = false">
        <Payment v-if="showModalPayment" :total="total"></Payment>
      </AppModal>
    </template>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, onMounted, reactive, ref} from 'vue';
import {
  CartProductDto,
  GetShoppingCartService,
  LevelsProduct,
} from '../services/getShoppingCart.service';
import {UpdateProductCatalogueToCartService} from '../services/updateProductCatalogueToCart.service';
import AppIcon from '../../../shared/components/AppIcon.vue';
import {DeleteProductCatalogueToCartService} from '../services/deleteProductCatalogueToCart.service';
import {BreadCrumbsType} from '../../../shared/types/breadCrumbs.type';
import AppBreadCrumbs from '../../../shared/components/AppBreadCrumbs.vue';
import AppEmptyResponse from '../../../shared/components/AppEmptyResponse.vue';
import AppLoading from '../../../shared/components/AppLoading.vue';
import AppModal from '../../../shared/components/AppModal.vue';
import Payment from '../components/Payment.vue';

const getShoppingCartService = new GetShoppingCartService();
const updateProductCatalogueToCartService = new UpdateProductCatalogueToCartService();
const deleteProductCatalogueToCartService = new DeleteProductCatalogueToCartService();

export default defineComponent({
  name: 'ShoppingCart',
  components: {Payment, AppModal, AppLoading, AppEmptyResponse, AppBreadCrumbs, AppIcon},
  setup() {
    const shoppingCart: { value: LevelsProduct[] } = reactive({
      value: [],
    });

    const loading = ref(true);

    const routes: BreadCrumbsType[] = [
      {
        name: 'Inicio',
        url: '/',
      },
      {
        name: 'Carrito de compras',
      },
    ];

    onMounted(async () => {
      loading.value = true;
      await getShoppingCart();
      loading.value = false;
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

    const showModalPayment = ref(false);

    return {
      shoppingCart,
      total,
      routes,
      loading,
      updateShoppingCart,
      increaseOrDecreaseAmounts,
      deleteShoppingCart,
      showModalPayment,
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