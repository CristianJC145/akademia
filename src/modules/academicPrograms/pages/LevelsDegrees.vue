<template>
  <AppBaseList :title="title" :routes="routes">
    <template v-slot:content>
      <AppLoading v-if="loading"></AppLoading>
      <template v-else>
        <div>
          <h2 class="tw-text-lg tw-font-light">Niveles</h2>
          <AppContainerNewRecord @click="openLevelModal"></AppContainerNewRecord>
        </div>

        <AppAccordion class="mt-2" v-slot="{ accordionId }">
          <AppAccordionItem :accordion-id="accordionId" v-for="level in levels.value">
            <template v-slot:head>{{ level.name }}</template>
            <template v-slot:content>
              <h3 class="tw-text-lg tw-font-light">Grados</h3>
              <div :class="{ 'grid-cards': level.degrees.length }">
                <AppContainerNewRecord @click="openDegreeModal(level.id, null)"></AppContainerNewRecord>
                <AppEmptyResponse v-if="!level.degrees.length"></AppEmptyResponse>
                <div class="card" v-for="degree in level.degrees">
                  <div class="card-body">
                    <span class="tw-text-sm">{{ degree.name }}</span>
                    <hr>
                    <div class="tw-flex tw-justify-end tw-gap-2">
                      <AppButtonEdit @click="openDegreeModal(level.id, degree)"></AppButtonEdit>
                      <AppButtonDelete @click="openConfirmDelete(entityDegree, degree)"></AppButtonDelete>
                    </div>
                  </div>
                </div>
              </div>
              <hr>
              <div class="tw-flex tw-justify-end gap-2">
                <AppButtonEdit @click="openLevelModal(level)"></AppButtonEdit>
                <AppButtonDelete @click="openConfirmDelete(entityLevel, level)"
                                 v-if="!level.degrees.length"></AppButtonDelete>
              </div>
            </template>
          </AppAccordionItem>
        </AppAccordion>
      </template>

      <AppModal v-model="levelModal">
        <LevelForm v-if="levelModal" :data="currentLevel.value" @close="closeLevelModal"></LevelForm>
      </AppModal>

      <AppModal v-model="degreeModal">
        <DegreeForm v-if="degreeModal" :data="currentDegree.value" @close="closeDegreeModal"></DegreeForm>
      </AppModal>

      <AppModal v-model="deleteModal">
        <AppConfirmDeleteModal v-if="deleteModal" :entity="currentEntity"
                               @confirmDelete="confirmDelete"></AppConfirmDeleteModal>
      </AppModal>
    </template>
  </AppBaseList>
</template>

<script lang="ts">
import {defineComponent, onMounted, reactive, ref} from 'vue';
import {GetLevelsWithDegreesService} from '../services/getLevelsWithDegrees.service';
import AppAccordion from '../../../shared/components/Accordion/AppAccordion.vue';
import AppAccordionItem from '../../../shared/components/Accordion/AppAccordionItem.vue';
import AppBaseList from '../../../shared/components/AppBaseList.vue';
import AppContainerNewRecord from '../../../shared/components/AppContainerNewRecord.vue';
import AppButtonEdit from '../../../shared/components/AppButtonEdit.vue';
import AppButtonDelete from '../../../shared/components/AppButtonDelete.vue';
import AppEmptyResponse from '../../../shared/components/AppEmptyResponse.vue';
import AppModal from '../../../shared/components/AppModal.vue';
import LevelForm from '../components/LevelForm.vue';
import AppLoading from '../../../shared/components/AppLoading.vue';
import {LevelDto} from '../dtos/level.dto';
import {DeleteLevelService} from '../services/deleteLevel.service';
import AppConfirmDeleteModal from '../../../shared/components/AppConfirmDeleteModal.vue';
import {DegreeDto} from '../dtos/degree.dto';
import DegreeForm from '../components/DegreeForm.vue';


const getLevelsWithDegreesService = new GetLevelsWithDegreesService();
const deleteLevelService = new DeleteLevelService();

export default defineComponent({
  name: 'LevelsDegrees',
  components: {
    DegreeForm,
    AppConfirmDeleteModal,
    AppLoading,
    LevelForm,
    AppModal,
    AppEmptyResponse,
    AppButtonDelete, AppButtonEdit, AppContainerNewRecord, AppBaseList, AppAccordionItem, AppAccordion,
  },
  setup() {
    const title = 'Niveles y grados';

    const routes = [
      {
        name: title,
      },
    ];

    const levels: { value: LevelDto[] } = reactive({
      value: [],
    });

    const loading = ref(true);
    const levelModal = ref(false);
    const degreeModal = ref(false);
    const currentLevel: { value: LevelDto | null } = reactive({
      value: null,
    });
    const currentDegree: { value: DegreeDto | null } = reactive({
      value: null,
    });

    const getData = async () => {
      levels.value = await getLevelsWithDegreesService.run();
    };

    onMounted(async () => {
      await getData();
      loading.value = false;
    });

    const openLevelModal = (level: LevelDto | null) => {
      currentLevel.value = level;
      levelModal.value = true;
    };


    const closeLevelModal = async () => {
      levelModal.value = false;
      await getData();
    };

    const openDegreeModal = (levelId: number, degree: DegreeDto | null) => {
      currentDegree.value = degree;
      degreeModal.value = true;
    };

    const closeDegreeModal = async () => {
      degreeModal.value = false;
      await getData();
    };

    const deleteModal = ref(false);
    const entityLevel = 'Nivel';
    const entityDegree = 'Grado';
    const currentEntity = ref();
    const currentDataDelete: { value: any } = reactive({
      value: null,
    });

    const openConfirmDelete = (entity: string, data: LevelDto | DegreeDto) => {
      currentEntity.value = entity;
      deleteModal.value = true;
      currentDataDelete.value = data;
    };

    const confirmDelete = async () => {
      if (currentEntity.value === entityLevel) {
        await deleteLevelService.run(currentDataDelete.value.id);
      } else if (currentEntity.value === entityDegree) {

      }

      deleteModal.value = false;
      await getData();
    };

    return {
      title,
      routes,
      loading,
      levels,
      levelModal,
      degreeModal,
      currentLevel,
      deleteModal,
      entityLevel,
      entityDegree,
      currentEntity,
      currentDegree,
      openLevelModal,
      openDegreeModal,
      closeLevelModal,
      closeDegreeModal,
      openConfirmDelete,
      confirmDelete,
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