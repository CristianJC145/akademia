<template>
  <AppBaseList
    :title="title"
    :subtitle="subtitle"
    :routes="routes"
  >
    <template v-slot:content>
      <AppLoading v-if="loading"></AppLoading>
      <div content class="flex flex-col gap-2.5">
        <h2 class="tw-text-lg tw-font-light">Áreas</h2>
        <AppContainerNewRecord @click="openAreaModal()">
        </AppContainerNewRecord>
      </div>
      <AppAccordion class="mt-2" v-slot="{ accordionId }">
        <AppAccordionItem
          :accordion-id="accordionId"
          v-for="area in areas.value"
        >
          <template v-slot:head>
            {{ area.name }}
          </template>
          <template v-slot:content>
            <h6 class="tw-text-lg tw-font-light">Asignaturas</h6>
            <div :class="{ 'grid-cards': area.subjects.length }">
              <AppContainerNewRecord
                @click="openSubjectModal(area.id, null)"
              ></AppContainerNewRecord>
              <AppEmptyResponse v-if="!area.subjects.length"></AppEmptyResponse>
              <div class="card" v-for="subject in area.subjects">
                <div class="card-body">
                  <span class="tw-text-sm">{{ subject.name }}</span>
                  <hr />
                  <div class="tw-flex tw-justify-end tw-gap-2">
                    <AppButtonEdit
                      @click="openSubjectModal(area.id, subject)"
                    ></AppButtonEdit>
                    <AppButtonDelete
                      @click="openConfirmDelete(entitySubject, subject)"
                    ></AppButtonDelete>
                  </div>
                </div>
              </div>
            </div>
            <div class="tw-flex tw-justify-end tw-gap-2">
              <AppButtonEdit @click="openAreaModal(area)"></AppButtonEdit>
              <AppButtonDelete
                @click="openConfirmDelete(entityArea, area)"
                v-if="!area.subjects.length"
              ></AppButtonDelete>
            </div>
          </template>
        </AppAccordionItem>
      </AppAccordion>
      <AppModal v-model="areaModal">
        <AreaForm
          v-if="areaModal"
          :data="currentArea.value"
          @close="closeAreaModal"
        ></AreaForm>
      </AppModal>
      <AppModal v-model="subjectModal">
        <SubjectForm
          v-if="subjectModal"
          :data="currentSubject.value"
          @close="closeSubjectModal"
          :area-id="currentAreaId"
        ></SubjectForm>
      </AppModal>
      <AppModal v-model="modalDelete">
        <AppConfirmDeleteModal
          v-if="modalDelete"
          :entity="currentEntity"
          @confirmDelete="confirmDelete"
        ></AppConfirmDeleteModal>
      </AppModal>
    </template>
  </AppBaseList>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from "vue";
import AppBaseList from "../../../shared/components/AppBaseList.vue";
import AppContainerNewRecord from "../../../shared/components/AppContainerNewRecord.vue";
import AppModal from "../../../shared/components/AppModal.vue";
import AppAccordion from "../../../shared/components/Accordion/AppAccordion.vue";
import AppAccordionItem from "../../../shared/components/Accordion/AppAccordionItem.vue";
import AppEmptyResponse from "../../../shared/components/AppEmptyResponse.vue";
import AppButtonEdit from "../../../shared/components/AppButtonEdit.vue";
import AppButtonDelete from "../../../shared/components/AppButtonDelete.vue";
import AppConfirmDeleteModal from "../../../shared/components/AppConfirmDeleteModal.vue";

import SubjectForm from "../components/SubjectForm.vue";
import AreaForm from "../components/AreaForm.vue";

import { AreaDto } from "../dtos/area.dto";
import { SubjectDto } from "../dtos/subject.dto";
import { GetAreasWithSubjectsService } from "../services/getAreasWithSubjects.service";
import { DeleteAreaService } from "../services/deleteArea.service";
import { DeleteSubjectService } from "../services/deleteSubject.service";

const deleteAreaService = new DeleteAreaService();
const deleteSubjectService = new DeleteSubjectService();
const getAreasWithSubjectsService = new GetAreasWithSubjectsService();

export default defineComponent({
  name: "AreasSubjects",

  components: {
    AppBaseList,
    SubjectForm,
    AppContainerNewRecord,
    AppModal,
    AreaForm,
    AppAccordion,
    AppAccordionItem,
    AppEmptyResponse,
    AppButtonEdit,
    AppButtonDelete,
    AppConfirmDeleteModal,
  },
  setup() {
    const title = "Áreas y Asignaturas";
    const subtitle = "Administra las Áreas y Asignaturas que usarás en la configuración de tus Plan de estudios";
    const routes = [
      {
        name: title,
        
      },
    ];

    const areas: { value: AreaDto[] } = reactive({
      value: [],
    });
    const areaModal = ref(false);
    const subjectModal = ref(false);
    const loading = ref(true);
    const currentAreaId = ref();

    const currentArea: { value: AreaDto | null } = reactive({
      value: null,
    });
    const currentSubject: { value: SubjectDto | null } = reactive({
      value: null,
    });

    const getData = async () => {
      areas.value = await getAreasWithSubjectsService.run();
    };
    onMounted(async () => {
      await getData();
      loading.value = false;
    });

    const openAreaModal = (area: AreaDto | null) => {
      currentArea.value = area;
      areaModal.value = true;
    };
    const closeAreaModal = async () => {
      areaModal.value = false;
      await getData();
    };
    const openSubjectModal = (areaId: number, subject: SubjectDto | null) => {
      currentSubject.value = subject;
      subjectModal.value = true;
      currentAreaId.value = areaId;
    };
    const closeSubjectModal = async () => {
      subjectModal.value = false;
      await getData();
    };
    const modalDelete = ref(false);
    const entityArea = "Area";
    const entitySubject = "Asignatura";
    const currentEntity = ref();

    const currentDataDelete: { value: any } = reactive({
      value: null,
    });

    const openConfirmDelete = async (
      entity: string,
      data: AreaDto | SubjectDto
    ) => {
      currentEntity.value = entity;
      modalDelete.value = true;
      currentDataDelete.value = data;
    };
    const confirmDelete = async () => {
      if (currentEntity.value === entityArea) {
        await deleteAreaService.run(currentDataDelete.value.id);
      } else if (currentEntity.value === entitySubject) {
        await deleteSubjectService.run(currentDataDelete.value.id);
      }
      modalDelete.value = false;
      await getData();
    };
    return {
      title,
      subtitle,
      routes,
      areas,
      areaModal,
      subjectModal,
      currentArea,
      currentEntity,
      currentSubject,
      entityArea,
      entitySubject,
      loading,
      modalDelete,
      currentAreaId,
      openAreaModal,
      closeAreaModal,
      openSubjectModal,
      closeSubjectModal,
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
