<template>
  <form @submit.prevent="savePayment">
    <AppFormModal :title="title">
      <template v-slot:content>
        <h4 class="lead">Saldo pendiente: {{ n(sale.PendingValue, 'currency') }}</h4>

        <AppFormField class="tw-mt-4">
          <label for="">Agregar pago</label>
          <input type="number" class="form-control" v-model="valuePaid"/>
        </AppFormField>
      </template>
      <template v-slot:actions>
        <AppButtonLoading class="btn-primary text-white" :disabled="valuePaid <= 0">
          Guardar
        </AppButtonLoading>
      </template>
    </AppFormModal>
  </form>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue';
import AppFormModal from '../../../shared/components/AppFormModal.vue';
import {useI18n} from 'vue-i18n';
import AppButtonLoading from '../../../shared/components/AppButtonLoading.vue';
import AppFormField from '../../../shared/components/AppFormField.vue';
import {SaleDto} from '../dtos/sale.dto';
import {AddPaymentFromAdminService} from '../services/addPaymentFromAdmin.service';

const addPaymentFromAdminService = new AddPaymentFromAdminService();

export default defineComponent({
  name: 'addPaymentFromAdmin',
  components: {AppFormField, AppButtonLoading, AppFormModal},
  props: ['sale'],
  emits: ['close'],
  setup(props, {emit}) {
    const sale: SaleDto = props.sale;
    const title = 'Agregar pago';
    const {n} = useI18n();
    const valuePaid = ref(0);

    console.log(sale);

    const savePayment = async () => {
      try {
        await addPaymentFromAdminService.run({
          invoice: {
            id: sale.id,
            isCredit: sale.isCredit,
            totalPaid: valuePaid.value,
          },
        });
        await emit('close');
      } catch (e) {

      }
    };

    return {
      title,
      n,
      valuePaid,
      savePayment,
    };
  },
});
</script>

<style scoped>

</style>