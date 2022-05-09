<template>
    <AppLoading v-if="loading"></AppLoading>
    <AppBaseList v-else :title="title.value" :routes="routes">
        <template v-slot:actions>
            <AppBackButton :to="{ name: 'casurid.institutionsList' }"></AppBackButton>
        </template>

        <AppLoading v-if="loadingData"></AppLoading>
        <template v-slot:content>
            <div class="card">
                <div class="card-body">
                    <div class="tw-flex tw-justify-end">
                        <div class="mb-3 tw-w-full md:tw-w-72">
                            <label for="">Nivel - Grado</label>
                            <v-select
                                v-model="degreeId" :options="levelsDegrees.value" 
                                label="levelDegreeName" @change="updateData($event)"
                                :reduce="(levelDegree) => levelDegree.degreeId"
                            ></v-select>
                        </div>
                    </div>

                    <AppEmptyResponse :show-image="true" v-if="notFound" :to="{ name: 'casurid.institutionsList' }"
                            to-text="Instituciones"></AppEmptyResponse>

                    <div class="grid-cards">

                        <div v-for="product in plans.value" class="card">
                            <div class="card-body">
                                <span class="tw-text-sm fs-5">{{ product.title }}</span>

                                <ul class="list-group list-group-flush border-top mt-1">
                                    <li class="list-group-item border-bottom" v-for="content in product.contents">
                                        {{ content.title }}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </AppBaseList>
</template>

<script lang="ts">
import {computed, defineComponent, onMounted, reactive, ref, watch} from "vue";
import {useRoute} from "vue-router";
import {useMeta} from "vue-meta";

import AppLoading from '../../../shared/components/AppLoading.vue';
import AppBaseList from '../../../shared/components/AppBaseList.vue';
import AppBackButton from '../../../shared/components/AppBackButton.vue';
import AppEmptyResponse from '../../../shared/components/AppEmptyResponse.vue';

import {LevelsDegreeDto} from "../dtos/levelsDegree.dto";

import {GetFiltersContentService} from '../services/getFiltersContent.service';
import {GetInstitutionByIdService} from '../services/getInstitutionById.service';
import {GetContentPlanByInstitutionIdService} from '../services/getContentPlanByInstitutionId.service';
import {ContentPlan} from "../dtos/contentPlan.dto";

const getFiltersContentService = new GetFiltersContentService();
const getInstitutionByIdService = new GetInstitutionByIdService();
const getContentPlanByInstitutionIdService = new GetContentPlanByInstitutionIdService();

export default defineComponent({
    name: 'contentPlanByInstitution',
    components: {AppBaseList, AppLoading, AppBackButton, AppEmptyResponse},

    setup() {
        useMeta({
          title: 'Plan de contenidos',
        });
        const loading = ref(true);
        const loadingData = ref(true);
        const notFound = ref(false);
        const route = useRoute();
        const title = reactive({
            value: '',
        });

        const routes = [
            {
                name: 'Instituciones',
                url: {
                    name: 'casurid.institutionsList',
                },
            },
            {
                name: 'Plan de contenidos',
            },
        ];

        const levelsDegrees: { value: LevelsDegreeDto[] } = reactive({
            value: [],
        });
        const plans: { value: ContentPlan[] } = reactive({
            value: [],
        });

        const degreeId = ref();
        const institutionId = route.params.institutionId as string;

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


        onMounted(async () => {
            try {
                const institution = await getInstitutionByIdService.run(institutionId);
                const filters = await getFiltersContentService.run();
                const contentPlan = await getContentPlanByInstitutionIdService.run(institutionId);

                title.value = `Plan de Contenidos - ${institution.institution.name}`;
                levelsDegrees.value = filters.levelsDegrees;
                levelsDegrees.value.unshift({degreeId: 0, levelId: 0, levelDegreeName: 'Ver Todo'});
                plans.value = contentPlan;

                if (filters.levelsDegrees.length) {
                    degreeId.value = 'Ver Todo';
                }
            } catch (e) {

            }

            loading.value = false;
        });

        const updateData = async () => {
            loadingData.value = true;

            try {
                const filters = await getFiltersContentService.run();
                const params = {
                    levelId: 0,
                    degreeId: 0,
                };
                let  contentPlan: any;

                filters.levelsDegrees.forEach((level) => {
                    if (level.degreeId == degreeId.value) {
                        params.levelId = level.levelId;
                        params.degreeId = level.degreeId;
                    }
                });

                if (params.levelId == 0 && params.degreeId == 0) {
                    contentPlan = await getContentPlanByInstitutionIdService.run(institutionId);
                } else {
                    contentPlan = await getContentPlanByInstitutionIdService.run(institutionId, params);
                }

                plans.value = contentPlan;
                notFound.value = !plans.value.length;
            } catch (e) {

            }

            loadingData.value = false;
        };

        watch(degreeId, async () => {
            await updateData();
        });

        return {
            title,
            routes,
            loading,
            degreeId,
            levelsDegrees,
            plans,
            updateData,
            notFound,
            loadingData,
        };
    }
});
</script>

<style scoped>
.grid-cards {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 18rem), 1fr));
}

</style>