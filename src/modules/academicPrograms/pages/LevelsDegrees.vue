<template>
  <AppBaseList :title="title" :routes="routes">
    <template v-slot:content>
      <div>
        <h2 class="tw-text-lg tw-font-light">Niveles</h2>
        <AppContainerNewRecord @click="levelModal = true"></AppContainerNewRecord>
      </div>

      <AppAccordion class="mt-2" v-slot="{ accordionId }">
        <AppAccordionItem :accordion-id="accordionId" v-for="level in levels.value">
          <template v-slot:head>{{ level.name }}</template>
          <template v-slot:content>
            <h3 class="tw-text-lg tw-font-light">Grados</h3>
            <div :class="{ 'grid-cards': level.degrees.length }">
              <AppContainerNewRecord></AppContainerNewRecord>
              <AppEmptyResponse v-if="!level.degrees.length"></AppEmptyResponse>
              <div class="card" v-for="degree in level.degrees">
                <div class="card-body">
                  <span class="tw-text-sm">{{ degree.name }}</span>
                  <hr>
                  <div class="tw-flex tw-justify-end tw-gap-2">
                    <AppButtonEdit></AppButtonEdit>
                    <AppButtonDelete></AppButtonDelete>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </AppAccordionItem>
      </AppAccordion>

      <AppModal v-model="levelModal" @close="levelModal = false">
        <LevelForm v-if="levelModal" @close="closeLevelModal"></LevelForm>
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
import {LevelDto} from '../dtos/level.dto';

const getLevelsWithDegreesService = new GetLevelsWithDegreesService();

export default defineComponent({
  name: 'LevelsDegrees',
  components: {
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

    const levelModal = ref(false);
    const degreeModal = ref(false);

    const getData = async () => {
      const response = await getLevelsWithDegreesService.run();

      levels.value = response;
    };

    onMounted(async () => {
      await getData();
    });

    const closeLevelModal = async () => {
      levelModal.value = false;
      await getData();
    };

    return {
      title,
      routes,
      levels,
      levelModal,
      degreeModal,
      closeLevelModal,
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