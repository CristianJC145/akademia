<template>
  <AppBaseList :title="title" :routes="routes">
    <template v-slot:content>
      <AppLoading v-if="loading"></AppLoading>
      <AppDatatable v-else :service="getSalesWithPaginationService" :params="params">
        <template v-slot:filters>
          <div class="d-flex flex-column flex-md-row align-items-md-center gap-2">
            <span>
                Filtros:
            </span>

            <AppFormField>
              <label for="institutionId">Institución</label>
              <v-select
                  v-model="institutionId"
                  :filterable="false"
                  @search="searchInstitutions"
                  :options="institutions.value"
                  label="name"
                  :reduce="(institution) => institution.id">
              </v-select>
            </AppFormField>

            <AppFormField class="tw-flex-1">
              <label for="status">Estado</label>
              <v-select
                  input-id="status"
                  v-model="statusId"
                  class="tw-flex-1"
                  :options="status.value"
                  label="name"
                  :reduce="(status) => status.id">
              </v-select>
            </AppFormField>

            <AppFormField>
              <label for="dateSince">Fecha inicial</label>
              <input type="date" class="form-control" id="dateSince" v-model="dateSince">
            </AppFormField>

            <AppFormField>
              <label for="dateUntil">Fecha final</label>
              <input type="date" class="form-control" id="dateUntil" v-model="dateUntil">
            </AppFormField>

          </div>
        </template>
        <template v-slot:head>
          <tr>
            <th>Recibo</th>
            <th>Fecha</th>
            <th>Institución</th>
            <th>Forma de pago</th>
            <th>Total</th>
            <th>Saldo</th>
            <th>Estado</th>
            <th></th>
          </tr>
        </template>

        <template v-slot:body="{ data }">
          <tr v-for="sale in data" :key="sale.id">
            <td>{{ sale.code }}</td>
            <td>{{ sale.createDate }}</td>
            <td>{{ sale.institutionName }}</td>
            <td>{{ sale.isCredit ? 'Crédito' : 'Contado' }}</td>
            <td>{{ n(sale.totalValue, 'currency') }}</td>
            <td>{{ n(sale.totalValue - sale.totalPaid, 'currency') }}</td>
            <td>
              <span class="badge" :class="{
                'bg-success': sale.status === 'Pagada',
                'bg-danger': sale.status === 'Anulado',
                'bg-secondary': sale.status === 'Cotización',
                'bg-warning': sale.status !== 'Pagada' && sale.status !== 'Anulado' && sale.status !== 'Cotización',
               }">
                {{ sale.status }}
              </span>
            </td>
            <td>
              <div class="tw-flex tw-gap-2">
                <AppButtonEdit :to="{ name: 'casurid.salesEdit', params: { saleId: sale.id } }"></AppButtonEdit>
                <button v-if="!sale.isCredit && sale.status !== 'Pagada' && sale.PendingValue > 0" class="btn btn-outline-primary"
                        type="button"
                        v-tooltip="'Pagar'" @click="showPaymentModal(sale)">
                  <AppIcon icon="dollar-sign"></AppIcon>
                </button>
              </div>
            </td>
          </tr>
        </template>
      </AppDatatable>

      <AppModal v-model="paymentModal">
        <AddPaymentFromAdmin v-if="paymentModal" :sale="currentSale.value"
                             @close="closePaymentModal"></AddPaymentFromAdmin>
      </AppModal>
    </template>
  </AppBaseList>
</template>

<script lang="ts">
import {computed, defineComponent, onMounted, reactive, ref} from 'vue';
import AppBaseList from '../../../shared/components/AppBaseList.vue';
import AppDatatable from '../../../shared/components/AppDatatable.vue';
import {GetSalesWithPaginationService} from '../services/getSalesWithPagination.service';
import {useI18n} from 'vue-i18n';
import {GetStatusInstitutionsService} from '../services/getStatusInstitutions.service';
import AppFormField from '../../../shared/components/AppFormField.vue';
import AppLoading from '../../../shared/components/AppLoading.vue';
import {GetStartAndEndDateMonthService} from '../../../shared/services/getStartAndEndDateMonth.service';
import {InstitutionDto} from '../../../shared/dto/institution.dto';
import {GetInstitutionsForSelectService} from '../services/getInstitutionsForSelect.service';
import {debounce} from 'ts-debounce';
import AppButtonEdit from '../../../shared/components/AppButtonEdit.vue';
import {useMeta} from 'vue-meta';
import AppIcon from '../../../shared/components/AppIcon.vue';
import {SaleDto} from '../dtos/sale.dto';
import AppModal from '../../../shared/components/AppModal.vue';
import AddPaymentFromAdmin from '../components/addPaymentFromAdmin.vue';
import {UpdateDatatableService} from '../../../shared/services/updateDatatable.service';
import Payment from '../components/Payment.vue';

const getStatusInstitutionsService = new GetStatusInstitutionsService();
const getStartAndEndDateMonthService = new GetStartAndEndDateMonthService();
const getInstitutionsForSelectService = new GetInstitutionsForSelectService();
const updateDatatableService = new UpdateDatatableService();

export default defineComponent({
  name: 'Sales',
  components: {
    Payment,
    AddPaymentFromAdmin,
    AppModal, AppIcon, AppButtonEdit, AppLoading, AppFormField, AppDatatable, AppBaseList,
  },
  setup() {
    const title = 'Ventas';
    const routes = [
      {
        name: title,
      },
    ];
    useMeta({
      title,
    });
    const {n} = useI18n();
    const status: { value: any } = reactive({
      value: [],
    });
    const loading = ref(true);
    const statusId = ref();
    const dateSince = ref();
    const dateUntil = ref();
    const institutionId = ref();
    const institutions: { value: InstitutionDto[] } = reactive({
      value: [],
    });

    const getSalesWithPaginationService = new GetSalesWithPaginationService();

    onMounted(async () => {
      status.value = await getStatusInstitutionsService.run();

      const rangeDate = getStartAndEndDateMonthService.run();

      dateSince.value = rangeDate.startDate;
      dateUntil.value = rangeDate.endDay;

      loading.value = false;
    });

    const params = computed(() => {
      return {
        status: statusId.value,
        dateSince: dateSince.value,
        dateUntil: dateUntil.value,
        institutionIdClient: institutionId.value,
      };
    });

    const searchInstitutions = debounce(async (search: string, loading: Function) => {
      if (search) {
        loading(true);
        const response = await getInstitutionsForSelectService.run({
          search,
          page: 1,
          perPage: 25,
        });
        institutions.value = response.data;
        loading(false);
      }
    }, 800);

    const paymentModal = ref(false);
    const currentSale: { value: SaleDto | null } = reactive({
      value: null,
    });

    const showPaymentModal = (sale: SaleDto) => {
      paymentModal.value = true;
      currentSale.value = sale;
    };

    const closePaymentModal = () => {
      paymentModal.value = false;
      updateDatatableService.run();
    };

    return {
      title,
      routes,
      getSalesWithPaginationService,
      n,
      status,
      params,
      loading,
      statusId,
      dateSince,
      dateUntil,
      institutionId,
      institutions,
      paymentModal,
      currentSale,
      searchInstitutions,
      showPaymentModal,
      closePaymentModal,
    };
  },
});
</script>

<style scoped>

</style>