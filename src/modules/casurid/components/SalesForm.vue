<template>
  <form @submit.prevent="save">
    <AppBaseList :title="title" :routes="routes">
      <template v-slot:actions>
        <AppBackButton :to="{ name: 'casurid.salesList' }"></AppBackButton>
        <AppButtonLoading class="btn-primary text-white">
          Guardar
        </AppButtonLoading>
      </template>

      <template v-slot:content>
        <div class="card">
          <div class="card-body">
            <div class="row">
              <div class="col-12 col-md-4">
                <div class="mb-3 d-flex flex-column">
                  <span class="">Institución</span>
                  <span class="lead tw-font-light">
                    {{ data.value.institution.name }}
                  </span>
                </div>
              </div>
              <div class="col-12 col-md-4">
                <div class="mb-3 d-flex flex-column">
                  <span class="">Fecha</span>
                  <span class="lead tw-font-light">
                    {{ data.value.createDate }}
                  </span>
                </div>
              </div>
              <div class="col-12 col-md-4">
                <div class="mb-3 d-flex flex-column">
                  <span class="">Recibo</span>
                  <span class="lead tw-font-light">
                    {{ data.value.code }}
                  </span>
                </div>
              </div>
            </div>

            <table class="table">
              <thead>
              <tr>
                <th>Productos</th>
                <th>Valor unitario</th>
                <th>Cantidad</th>
                <th>Total</th>
              </tr>
              </thead>

              <tbody>
              <tr v-for="detail in data.value.details">
                <td style="width: 35%">
                  <AppSelectRemote
                      v-model="detail.productId"
                      :service="getProductsForSelectService"
                      label="title"
                      :reduce="product => product.id"
                      :init="detail.id ? { id: detail.id, title: detail.productName } : null"
                      @option:selected="selectProduct($event, detail)"
                  ></AppSelectRemote>
                </td>
                <td>{{ n(detail.unitValue, 'currency') }}</td>
                <td>
                  <input type="number" class="form-control input-quantity" v-model="detail.quantity">
                </td>
                <td>{{ n(detail.quantity * detail.unitValue, 'currency') }}</td>
              </tr>
              </tbody>
            </table>

            <button class="btn btn-outline-primary" type="button" @click="addNewProduct">
              Agregar producto
            </button>

            <div class="row mt-2">
              <div class="col-12 col-md-8">
                <AppFormField>
                  <label for="observation">Observaciones</label>
                  <textarea class="form-control" id="observation" rows="4"></textarea>
                </AppFormField>
              </div>

              <div class="col-12 col-md-4">
                <table class="table">
                  <tbody>
                  <tr>
                    <td>Subtotal</td>
                    <td>{{ n(subtotal, 'currency') }}</td>
                  </tr>
                  <tr>
                    <td>Descuento</td>
                    <td class="p-3">
                      <input type="number" class="form-control" v-model="data.value.totalDiscount">
                    </td>
                  </tr>
                  <tr>
                    <td>Total</td>
                    <td class="p-3">
                      {{ n(total, 'currency') }}
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </template>
    </AppBaseList>
  </form>
</template>

<script lang="ts">
import {computed, defineComponent, reactive} from 'vue';
import AppBaseList from '../../../shared/components/AppBaseList.vue';
import AppBackButton from '../../../shared/components/AppBackButton.vue';
import AppButtonLoading from '../../../shared/components/AppButtonLoading.vue';
import AppFormField from '../../../shared/components/AppFormField.vue';

import {useI18n} from 'vue-i18n';

import {SaleDto} from '../dtos/sale.dto';
import {CreateOrUpdateSaleService} from '../services/createOrUpdateSale.service';
import {useRouter} from 'vue-router';
import {GetProductsForSelectService} from '../services/getProductsForSelect.service';
import AppSelectRemote from '../../../shared/components/AppSelectRemote.vue';

const createOrUpdateSaleService = new CreateOrUpdateSaleService();

export default defineComponent({
  name: 'SalesForm',
  components: {AppSelectRemote, AppFormField, AppButtonLoading, AppBackButton, AppBaseList},
  props: ['title', 'routes', 'data'],
  setup(props) {
    const router = useRouter();
    const data: { value: SaleDto } = reactive({
      value: props.data,
    });

    const {n} = useI18n();

    const getProductsForSelectService = new GetProductsForSelectService();

    const save = async () => {
      try {
        data.value.details.forEach((detail, key) => {
          console.log(detail);
          if (!detail.productId || !detail.quantity) {
            data.value.details.splice(key, 1);
          }
        });

        await createOrUpdateSaleService.run({
          invoice: {
            // TODO: Quitar campos no necesarios
            observations: data.value.observations,
            totalDiscount: data.value.totalDiscount,
            totalPurchase: total.value,
            totalValue: subtotal.value,
            isCredit: data.value.isCredit,
            institutionId: data.value.institutionId,
            userId: data.value.userId,
          },
          details: data.value.details.map((detail) => ({
            id: detail.id,
            description: detail.description,
            invoiceId: detail.invoiceId,
            productId: detail.productId,
            quantity: detail.quantity,
            unitValue: detail.unitValue,
            totalValue: detail.totalValue,
          })),
        }, data.value.id);

        await router.push({
          name: 'casurid.salesList',
        });
      } catch (e) {

      }
    };

    const subtotal = computed(() => {
      let subtotal = 0;

      data.value.details.forEach((detail) => {
        subtotal += ((detail.unitValue ?? 0) * (detail.quantity ?? 0));
      });

      return subtotal;
    });

    const total = computed(() => subtotal.value - data.value.totalDiscount);

    const addNewProduct = () => {
      data.value.details.push({
        id: null,
        description: null,
        invoiceId: data.value.id,
        productId: null,
        quantity: null,
        unitValue: 0,
        totalValue: 0,
      });
    };

    const selectProduct = (event: any, data: any) => {
      data.unitValue = event.defaultUnitValue;
    };

    return {
      data,
      n,
      subtotal,
      total,
      getProductsForSelectService,
      save,
      addNewProduct,
      selectProduct,
    };
  },
});
</script>

<style scoped>
.input-quantity {
  width: 50px;
  height: 30px;
  -moz-appearance: textfield;
}

.input-quantity::-webkit-outer-spin-button,
.input-quantity::-webkit-inner-spin-button {
  -webkit-appearance: none;
}

</style>