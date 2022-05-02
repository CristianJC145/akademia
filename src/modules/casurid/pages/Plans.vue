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
            <AppEmptyResponse :show-image="true" v-if="notFound" :to="{ name: 'casurid.contentsList' }" to-text="Contenidos"></AppEmptyResponse>
            <div v-else class="accordion" id="accordionExample">
              <div class="accordion-item" v-for="plan in plans.value">
                <h2 class="accordion-header" id="headingOne">
                  <button class="accordion-button" type="button" data-bs-toggle="collapse"
                          :data-bs-target="`#collapse-${plan.subjectId}`"
                          aria-expanded="true" aria-controls="collapseOne">
                    {{ plan.subject }}
                  </button>
                </h2>
                <div :id="`collapse-${plan.subjectId}`" class="accordion-collapse collapse" aria-labelledby="headingOne"
                     data-bs-parent="#accordionExample">
                  <div class="accordion-body">
                    <div class="grid-cards">
                      <AppContainerNewRecord></AppContainerNewRecord>
                      <div v-for="product in plan.products" class="card">
                        <div class="card-body">
                          <span class="tw-text-sm">{{ product.title }}</span>
                          <hr>
                          <div class="tw-flex tw-justify-between tw-items-center tw-gap-2">
                            <span>{{ product.validityPeriod }} contenidos</span>

                            <div class="tw-flex tw-gap-2">
                              <AppButtonEdit></AppButtonEdit>
                              <AppButtonDelete></AppButtonDelete>
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

const getFiltersPlansService = new GetFiltersPlansService();
const getPlansService = new GetPlansService();

export default defineComponent({
  name: 'Plans',
  components: {AppEmptyResponse, AppButtonDelete, AppButtonEdit, AppContainerNewRecord, AppLoading, AppBaseList},
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

    return {
      title,
      routes,
      levelsDegrees,
      degreeId,
      loading,
      plans,
      notFound,
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
</style>