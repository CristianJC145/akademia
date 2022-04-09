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
                </tr>
                </thead>

                <tbody>
                <tr v-for="product in cart.products">
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
                      <button class="btn btn-outline-primary" :disabled="product.quantity <= 1"
                              @click="product.quantity --">
                        -
                      </button>
                      <span>
                      {{ product.quantity }}
                    </span>
                      <button class="btn btn-outline-primary" @click="product.quantity ++">
                        +
                      </button>
                    </div>
                  </td>
                  <td class="tw-text-right">
                    {{ product.defaultUnitValue * product.quantity }}
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
import {GetShoppingCartService} from '../services/getShoppingCart.service';

const getShoppingCartService = new GetShoppingCartService();

export default defineComponent({
  name: 'ShoppingCart',
  setup() {
    let shoppingCart = reactive({
      value: [],
    });

    onMounted(async () => {
      shoppingCart.value = (await getShoppingCartService.run()).levelsProducts;
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

    return {
      shoppingCart,
      total,
    };
  },
});
</script>

<style scoped>

</style>