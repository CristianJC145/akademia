<template>
  <AppBaseList title="Instituciones" :routes="routes">
    <template v-slot:actions>
      <router-link :to="{ name: 'casurid.contentsCreate' }" replace class="btn btn-primary text-white">
        {{ t('core.newMale') }}
      </router-link>
    </template>

    <template v-slot:content>
        <AppDatatable
            :service="getInstitutionsWithPaginationService"
            :params="params"
        >
            <template v-slot:filters>
                <div class="d-flex flex-column flex-md-row align-items-md-center gap-2">
                    <span>
                        Filtros:
                    </span>

                    <v-select
                        v-model="cityId"
                        class="tw-flex-1"
                        :filterable="false"
                        @search="searchMunicipalities"
                        :options="municipalities.value"
                        label="MunicipalityRegionName"
                        placeholder="Ciudad - Departamento"
                        :reduce="(municipality) => municipality.id">
                    </v-select>

                    <v-select
                        v-model="statusId"
                        class="tw-flex-1"
                        :filterable="false"
                        :options="status.value"
                        label="name"
                        placeholder="Estado"
                        :reduce="(status) => status.id">
                    </v-select>
                </div>
            </template>

            <template v-slot:head>
                <tr>
                    <th>Ciudad</th>
                    <th>Institución</th>
                    <th>E-mail</th>
                    <th>Telefono</th>
                    <th>Estado</th>
                    <th></th>
                </tr>
            </template>

            <template v-slot:body="{ data }">
                <template v-for="content in data">
                    <tr>
                        <td>{{ content.city }}</td>
                        <td>{{ content.name }}</td>
                        <td>{{ content.email }}</td>
                        <td>{{ content.phone }}</td>
                        <td>{{ content.isClient ? 'Cliente' : 'Interesado' }}</td>
                        <td class="d-flex gap-2">
                            <AppButtonEdit :to="{ name:'casurid.contentsEdit', params: { contentId: content.id } }"></AppButtonEdit>

                            <router-link to="#" class="btn btn-outline-primary"
                                v-tooltip="'Plan de Contenidos'"
                            >
                                <AppIcon icon="calendar-week" class="blue" size="lg"/>
                            </router-link>

                            <AppButtonDelete></AppButtonDelete>
                        </td>
                    </tr>
                </template>
            </template>
        </AppDatatable>
    </template>
  </AppBaseList>
</template>

<script lang="ts">
import {computed, defineComponent, onMounted, reactive, ref} from 'vue';
import {debounce} from 'ts-debounce';
import {useI18n} from 'vue-i18n';
import {useMeta} from 'vue-meta';

import AppBaseList from '../../../shared/components/AppBaseList.vue';
import AppDatatable from '../../../shared/components/AppDatatable.vue';
import AppButtonEdit from '../../../shared/components/AppButtonEdit.vue';
import AppButtonDelete from '../../../shared/components/AppButtonDelete.vue';
import AppIcon from '../../../shared/components/AppIcon.vue';

import {GetInstitutionsWithPaginationService} from '../services/getInstitutionsWithPagination.service';
import { UpdateDatatableService } from '../../../shared/services/updateDatatable.service';
import { GetMunicipalitiesService } from '../services/getMunicipalities.service';

import { MunicipalityDto } from '../../../shared/dto/municipality.dto';
import { StatusDto } from '../dtos/status.dto';

const getMunicipalitiesService = new GetMunicipalitiesService();
const updateDatatableService = new UpdateDatatableService();

export default defineComponent({
    name: 'Instituciones',

    components: {AppBaseList, AppDatatable, AppButtonDelete, AppButtonEdit, AppIcon,},

    setup() {
        useMeta({
            title: 'Instituciones',
        });

        const {t} = useI18n();
        const getInstitutionsWithPaginationService = new GetInstitutionsWithPaginationService();

        const municipalities: { value: MunicipalityDto[] } = reactive({
            value: [],
        });
        const status: { value: StatusDto[] } = reactive({
            value: [],
        });

        const cityId = ref();
        const statusId = ref();

        const routes = [
            {
                name: 'Instituciones',
            },
        ];

        onMounted(async () => {
            getMunicipalities('a').then((res) => {
                municipalities.value = res.data;
            });

            status.value = [
                {
                    id: 0,
                    name: 'Interesado'
                },
                {
                    id: 1,
                    name: 'Cliente'
                },
            ]
        });

        const params = computed(() => {
            let regionId = null;
            let status: any;

            if (statusId.value != 0 && statusId.value != 1) {
                status = null;
            } else {
                status = statusId.value ? 'isClient' : 'isNotClient';
            }

            return {
                cityId: cityId.value,
                status: status,
            }
        });

        const searchMunicipalities = debounce(async (search: string, loading: Function) => {
            if (search) {
                loading(true);
                const response = await getMunicipalities(search);
                municipalities.value = response.data;
                loading(false);
            }
        }, 800);

        const getMunicipalities = (search: string) => {
            return getMunicipalitiesService.run({
                search,
                page: 1,
                perPage: 25,
            });
        };

        const updateTable = () => {
            updateDatatableService.run();
        };

        return {
            getInstitutionsWithPaginationService,
            params,
            routes,
            t,
            cityId,
            statusId,
            searchMunicipalities,
            municipalities,
            status,
        }
    },
});
</script>

<style scoped>

</style>