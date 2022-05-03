<template>
  <AppBaseList
      :title="title"
      :routes="routes"
  >
    <template v-slot:content>
      <div class="mt-4">
        <AppDatatable :service="getShoppingService" :params="params">
          <template v-slot:filters>
            <div class="d-flex flex-column flex-md-row align-items-md-center gap-2">
                  <span>
                    Filtros:
                  </span>

              <div class="tw-flex-1">
                <label for="levelId">Nivel</label>
                <v-select
                    inputId="levelId"
                    v-model="levelId"
                    :options="levels.value"
                    label="name"
                    :reduce="(level) => level.id"
                ></v-select>
              </div>

              <div class="tw-flex-1">
                <label for="degreeId">Grado</label>
                <v-select
                    inputId="degreeId"
                    v-model="degreeId"
                    :options="degrees.value"
                    label="name"
                    :reduce="(degree) => degree.id"
                ></v-select>
              </div>

              <div class="tw-flex-1">
                <label for="subjectId">Asignatura</label>
                <v-select
                    inputId="subjectId"
                    v-model="subjectId"
                    :options="subjects.value"
                    label="name"
                    :reduce="(subject) => subject.id"
                ></v-select>
              </div>


            </div>
          </template>
          <template v-slot:head>
            <tr>
              <th scope="col">Plan</th>
              <th scope="col">Nivel</th>
              <th scope="col">Grado</th>
              <th scope="col">Asignatura</th>
              <th scope="col">Cantidad</th>
              <th scope="col">Vigencia</th>
            </tr>
          </template>

          <template v-slot:body="{ data }">
            <tr v-for="shop in data">
              <th>{{ shop.productName }}</th>
              <td>{{ shop.levelName }}</td>
              <td>{{ shop.DegreeName }}</td>
              <td>{{ shop.subjectName }}</td>
              <td>
                <div class="d-flex justify-content-center">
                  <button class="btn btn-link btn-sm" @click="showUsedLicenses(shop.id)"
                          v-tooltip="'Ver licencias usadas'">
                    {{ shop.quantityUsed }} / {{ shop.quantity }}
                  </button>
                </div>
              </td>
              <td>{{ shop.validUntil }}</td>
            </tr>
          </template>
        </AppDatatable>

        <AppModal v-model="showUsedLicensesModal">
          <UsedLicenses v-if="showUsedLicensesModal" :product-id="productId"></UsedLicenses>
        </AppModal>
      </div>
    </template>
  </AppBaseList>
</template>

<script lang="ts">
import {computed, defineComponent, onMounted, reactive, ref} from 'vue';
import AppBaseList from '../../../shared/components/AppBaseList.vue';
import AppPagination from '../../../shared/components/AppPagination.vue';
import {BreadCrumbsType} from '../../../shared/types/breadCrumbs.type';
import {GetFiltersShoppingService} from '../services/getFiltersShopping.service';
import {GetShoppingService} from '../services/getShopping.service';
import {LevelDto} from '../dtos/level.dto';
import {DegreeDto} from '../dtos/degree.dto';
import {SubjectDto} from '../dtos/subject.dto';
import {ShoppingDto} from '../dtos/shopping.dto';
import AppDatatable from '../../../shared/components/AppDatatable.vue';
import AppModal from '../../../shared/components/AppModal.vue';
import AppFormModal from '../../../shared/components/AppFormModal.vue';
import UsedLicenses from '../components/usedLicenses.vue';

const getFiltersShoppingService = new GetFiltersShoppingService();

export default defineComponent({
  name: 'Shopping',
  components: {UsedLicenses, AppFormModal, AppModal, AppDatatable, AppPagination, AppBaseList},
  setup() {
    const title = 'Mis Compras';
    const routes: BreadCrumbsType[] = [
      {
        name: 'Inicio',
        url: '/',
      },
      {
        name: 'Mis compras',
      },
    ];

    const levels: { value: LevelDto[] } = reactive({
      value: [],
    });

    const degrees: { value: DegreeDto[] } = reactive({
      value: [],
    });

    const subjects: { value: SubjectDto[] } = reactive({
      value: [],
    });

    const shopping: { value: ShoppingDto[] } = reactive({
      value: [],
    });

    const levelId = ref();
    const degreeId = ref();
    const subjectId = ref();

    onMounted(async () => {
      const filters = await getFiltersShoppingService.run();

      levels.value = filters.levels;
      degrees.value = filters.degrees;
      subjects.value = filters.subjects;
    });

    const showUsedLicensesModal = ref(false);
    const productId = ref(0);

    const showUsedLicenses = async (proId: number) => {
      productId.value = proId;
      showUsedLicensesModal.value = true;
    };

    const params = computed(() => {
      return {
        subjectId: subjectId.value,
        degreeId: degreeId.value,
        levelId: levelId.value,
      };
    });

    const getShoppingService = new GetShoppingService();

    return {
      title,
      routes,
      levels,
      degrees,
      subjects,
      levelId,
      degreeId,
      subjectId,
      shopping,
      getShoppingService,
      showUsedLicensesModal,
      showUsedLicenses,
      productId,
      params,
    };
  },
});
</script>

<style scoped>

</style>