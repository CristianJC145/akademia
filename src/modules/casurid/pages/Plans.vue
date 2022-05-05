<template>
  <AppBaseList
      :title="title"
      :routes="routes">
    <template v-slot:content>
      <div class="card">
        <div class="card-body">
          <div class="tw-flex tw-justify-end">
            <div class="mb-3 tw-w-full md:tw-w-72">
              <label for="">Nivel - Grado</label>
              <v-select
                  v-model="degreeId"
                  :options="levelsDegrees.value" label="levelDegreeName"
                  :reduce="(levelDegree) => levelDegree.degreeId"></v-select>
            </div>
          </div>
          <AppLoading v-if="loading"></AppLoading>

          <div v-else>
            <AppEmptyResponse :show-image="true" v-if="notFound" :to="{ name: 'casurid.contentsList' }"
                              to-text="Contenidos"></AppEmptyResponse>
            <div v-else class="accordion" id="accordionExample">
              <div class="accordion-item" v-for="plan in plans.value">
                <h2 class="accordion-header" id="headingOne">
                  <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                          :data-bs-target="`#collapse-${plan.subjectId}`"
                          aria-expanded="true" aria-controls="collapseOne">
                    {{ plan.subject }}
                  </button>
                </h2>
                <div :id="`collapse-${plan.subjectId}`" class="accordion-collapse collapse" aria-labelledby="headingOne"
                     data-bs-parent="#accordionExample">
                  <div class="accordion-body">
                    <div class="grid-cards">
                      <router-link
                          :to="{ name: 'casurid.plansCreate', query:{ subjectId: plan.subjectId, levelId, degreeId } }">
                        <AppContainerNewRecord></AppContainerNewRecord>
                      </router-link>
                      <div v-for="product in plan.products" class="card">
                        <div class="card-body">
                          <span class="tw-text-sm">{{ product.title }}</span>
                          <hr>
                          <div class="tw-flex tw-justify-between tw-items-center tw-gap-2">
                            <span>{{ product.validityPeriod }} contenidos</span>

                            <div class="tw-flex tw-gap-2">
                              <AppButtonEdit
                                  :to="{ name: 'casurid.plansEdit', params: { planId: product.id }, query:{ subjectId: plan.subjectId, levelId, degreeId } }"></AppButtonEdit>
                              <AppButtonDelete @click="showModalDelete(product)"></AppButtonDelete>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <AppModal v-model="modalDelete" @close="modalDelete = false">
            <AppConfirmDeleteModel entity="Plan" @confirmDelete="deletePlan"></AppConfirmDeleteModel>
          </AppModal>
        </div>
      </div>
    </template>
  </AppBaseList>
</template>

<script lang="ts">
import {computed, defineComponent, onMounted, reactive, ref, watch} from 'vue';
import AppBaseList from '../../../shared/components/AppBaseList.vue';
import {GetFiltersPlansService} from '../services/getFiltersPlans.service';
import {LevelsDegreeDto} from '../dtos/levelsDegree.dto';
import {GetPlansService, IGetPlansService} from '../services/getPlans.service';
import AppLoading from '../../../shared/components/AppLoading.vue';
import AppContainerNewRecord from '../../../shared/components/AppContainerNewRecord.vue';
import AppButtonEdit from '../../../shared/components/AppButtonEdit.vue';
import {useMeta} from 'vue-meta';
import AppButtonDelete from '../../../shared/components/AppButtonDelete.vue';
import AppEmptyResponse from '../../../shared/components/AppEmptyResponse.vue';
import AppModal from '../../../shared/components/AppModal.vue';
import AppConfirmDeleteModel from '../../../shared/components/AppConfirmDeleteModal.vue';
import {ProductDto} from '../dtos/product.dto';
import {DeletePlanService} from '../services/deletePlan.service';

const getFiltersPlansService = new GetFiltersPlansService();
const getPlansService = new GetPlansService();
const deletePlanService = new DeletePlanService();

export default defineComponent({
  name: 'Plans',
  components: {
    AppConfirmDeleteModel,
    AppModal,
    AppEmptyResponse, AppButtonDelete, AppButtonEdit, AppContainerNewRecord, AppLoading, AppBaseList,
  },
  setup() {
    const title = 'Planes';
    useMeta({
      title,
    });

    const routes = [
      {
        name: title,
      },
    ];

    const levelsDegrees: { value: LevelsDegreeDto[] } = reactive({
      value: [],
    });
    const degreeId = ref();
    const levelId = computed(() => {
      let levelId = 0;
      if (degreeId.value) {
        levelsDegrees.value.forEach((levelDegree) => {
          if (levelDegree.degreeId === degreeId.value) {
            levelId = levelDegree.levelId;
          }
        });
      }
      return levelId;
    });

    const loading = ref(true);
    const notFound = ref(false);
    const modalDelete = ref(false);
    const currentProduct: { value: any } = reactive({
      value: null,
    });

    const plans: { value: IGetPlansService[] } = reactive({
      value: [],
    });

    onMounted(async () => {
      const response = await getFiltersPlansService.run();

      levelsDegrees.value = response.levelsDegrees;

      if (response.levelsDegrees.length) {
        degreeId.value = response.levelsDegrees[0].degreeId;
      }
    });

    const getData = async () => {
      loading.value = true;
      try {
        plans.value = await getPlansService.run({
          levelId: levelId.value,
          degreeId: degreeId.value,
        });
        notFound.value = !plans.value.length;
      } catch (e) {
      }

      loading.value = false;
    };

    watch(degreeId, async () => {
      await getData();
    });

    const showModalDelete = async (product: ProductDto) => {
      currentProduct.value = product;
      modalDelete.value = true;
    };

    const deletePlan = async () => {
      try {
        await deletePlanService.run(currentProduct.value.id);
        modalDelete.value = false;
        await getData();
      } catch (e) {

      }
    };

    return {
      title,
      routes,
      levelsDegrees,
      degreeId,
      loading,
      plans,
      notFound,
      levelId,
      modalDelete,
      showModalDelete,
      deletePlan,
    };
  },
});
</script>

<style scoped>
.grid-cards {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 18rem), 1fr));
}

a {
  text-decoration: none;
}
</style>