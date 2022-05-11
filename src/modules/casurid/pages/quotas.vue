<template>
  <AppBaseList :title="title" :routes="routes">
    <template v-slot:content>
      <AppLoading v-if="loading"></AppLoading>

      <AppDatatable
        :service="getQuotasWithPaginationService"
        :params="params"
      >
        <template v-slot:filters>
          <div class="d-flex flex-column flex-md-row align-items-md-center gap-2">
            <span> Filtros: </span>

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

            <AppFormField>
              <label for="invoiceId">Recibo</label>
              <v-select
                  v-model="invoiceId"
                  :filterable="false"
                  @search="searchInvoices"
                  :options="invoices.value"
                  label="code"
                  :reduce="(invoice) => invoice.id">
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
            <th> Institución </th>
            <th> No. Cuota </th>
            <th> Fecha Vencimiento </th>
            <th> Valor </th>
            <th> Saldo </th>
            <th> Estado </th>
            <th></th>
          </tr>
        </template>

        <template v-slot:body="{ data }">
          <template v-for="content in data" :key="content.id">
            <tr>
              <td>{{ content.institutionName }}</td>
              <td>{{ content.code }}</td>
              <td>{{ content.createDate }}</td>
              <td>{{ content.totalPurchase }}</td>
              <td>{{ content.totalPaid }}</td>
              <td>{{ content.status }}</td>
              <td class="d-flex gap-2">
                <router-link to="#" class="btn btn-outline-primary"
                  v-tooltip="'Pagar'"
                >
                  <AppIcon icon="shopping-cart" size="lg" class="blue"/>
                </router-link>
              </td>
            </tr>
          </template>
        </template>
        </AppDatatable>
      </template>
  </AppBaseList>
</template>

<script lang="ts">
import {useMeta} from 'vue-meta';
import { debounce } from 'ts-debounce';
import {computed, defineComponent, onMounted, reactive, ref} from 'vue';

import AppIcon from '../../../shared/components/AppIcon.vue';
import AppLoading from '../../../shared/components/AppLoading.vue';
import AppBaseList from '../../../shared/components/AppBaseList.vue';
import AppFormField from '../../../shared/components/AppFormField.vue';
import AppDatatable from '../../../shared/components/AppDatatable.vue';
import AppButtonLoading from '../../../shared/components/AppButtonLoading.vue';

import {GetInvoicesForSelectService} from '../services/getInvoicesForSelect.service';
import {GetStatusInstitutionsService} from '../services/getStatusInstitutions.service';
import {GetQuotasWithPaginationService} from '../services/getQuotasWithPagination.service';
import {GetInstitutionsForSelectService} from '../services/getInstitutionsForSelect.service';
import {GetStartAndEndDateMonthService} from '../../../shared/services/getStartAndEndDateMonth.service';

import {InvoiceDto} from '../dtos/invoice.dto';
import {InstitutionDto} from '../dtos/institution.dto';

const getInvoicesForSelectService = new GetInvoicesForSelectService();
const getStatusInstitutionsService = new GetStatusInstitutionsService();
const getStartAndEndDateMonthService = new GetStartAndEndDateMonthService();
const getInstitutionsForSelectService = new GetInstitutionsForSelectService();

export default defineComponent({
  name: 'Quotas',
  components: {AppButtonLoading, AppBaseList, AppDatatable, AppIcon, AppFormField, AppLoading},

  setup() {
    const title = 'Cuotas';
    useMeta({ title });
    const routes = [{ name: title }];

    const getQuotasWithPaginationService = new GetQuotasWithPaginationService();

    const institutionId = ref();
    const loading = ref(true);
    const invoiceId = ref();
    const dateSince = ref();
    const dateUntil = ref();
    const statusId = ref();

    const institutions: { value: InstitutionDto[] } = reactive({
      value: [],
    });
    const invoices: { value: InvoiceDto[] } = reactive({
      value: [],
    });
    const status: { value: any } = reactive({
      value: [],
    });

    onMounted(async () => {
      await getInstitutions().then(res => {
        console.log(res);
        institutions.value = res.data;
      });

      await getInvoices().then(res => {
        console.log(res);
        invoices.value = res.data;
      });

      status.value = await getStatusInstitutionsService.run();

      const rangeDate = getStartAndEndDateMonthService.run();
      dateSince.value = rangeDate.startDate;
      dateUntil.value = rangeDate.endDay;

      loading.value = false;
    });

    const params = computed(() => {
      return {
        status: statusId.value,
        invoice: invoiceId.value, // como se filtra por ese campo?
        dateSince: dateSince.value,
        dateUntil: dateUntil.value,
        institutionIdClient: institutionId.value, //no esta funcionando este filtro
      }
    });

    const searchInstitutions = debounce(async (search: string, loading: Function) => {
      if (search) {
        loading(true);

        const response = await getInstitutions(search);
        institutions.value = response.data;

        loading(false);
      }
    }, 800);

    const searchInvoices = debounce(async (search: string, loading: Function) => {
      if (search) {
        loading(true);

        const response = await getInvoices(search);
        invoices.value = response.data;

        loading(false);
      }
    }, 800);

    const getInstitutions = (search?: string) => {
      return getInstitutionsForSelectService.run({
        search,
      });
    };

    const getInvoices = (search?: string) => {
      return getInvoicesForSelectService.run({
        search,
      });
    };

    return {
      title,
      routes,

      getQuotasWithPaginationService,
      params,

      institutionId,
      invoiceId,
      dateSince,
      dateUntil,
      statusId,
      loading,

      searchInstitutions,
      searchInvoices,

      institutions,
      invoices,
      status,
    };
  },
});
</script>

<style scoped>

</style>