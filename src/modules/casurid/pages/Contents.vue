<template>
  <AppBaseList title="Contenidos" :routes="routes">
    <template v-slot:actions>
      <router-link :to="{ name: 'casurid.contentsCreate' }" replace class="btn btn-primary text-white">
        {{ t('core.newMale') }}
      </router-link>
    </template>

    <template v-slot:content>
      <AppDatatable
          :service="getContentsWithPaginationService"
          :params="params"
      >
        <template v-slot:filters>
          <div class="d-flex flex-column flex-md-row align-items-md-center gap-2">
            <span>
              Filtros:
            </span>

            <v-select
                v-model="degreeId"
                class="tw-flex-1"
                :options="levelsDegrees.value"
                label="levelDegreeName"
                :reduce="(levelDegree) => levelDegree.degreeId"
                placeholder="Nivel - Grado">
            </v-select>

            <v-select
                class="tw-flex-1"
                v-model="subjectId"
                :options="subjects.value"
                label="name"
                :reduce="(subject) => subject.id"
                placeholder="Asignatura">
            </v-select>
          </div>
        </template>
        <template v-slot:head>
          <tr>
            <th>Asignatura</th>
            <th>Tipo de contenido</th>
            <th>Título</th>
            <th></th>
          </tr>
        </template>
        <template v-slot:body="{ data }">
          <template v-for="row in data">
            <tr>
              <td colspan="4" class="text-center tw-font-bold">{{ row.levelDegree }}</td>
            </tr>
            <tr v-for="content in row.contents">
              <td>{{ content.subject.name }}</td>
              <td>{{ content.contentType.name }}</td>
              <td>{{ content.title }}</td>
              <td class="d-flex gap-2">
                <AppButtonEdit :to="{ name:'casurid.contentsEdit', params: { contentId: content.id } }"></AppButtonEdit>
                <AppButtonDelete @click="confirmDelete(content)"></AppButtonDelete>
              </td>
            </tr>
          </template>
        </template>
      </AppDatatable>

      <AppModal v-model="showModalDelete" @close="showModalDelete = false">
        <AppConfirmDeleteModal v-if="showModalDelete" entity="Contenido"
                               @confirmDelete="deleteContent"></AppConfirmDeleteModal>
      </AppModal>

    </template>
  </AppBaseList>
</template>

<script lang="ts">
import {computed, defineComponent, onMounted, reactive, ref} from 'vue';
import {useI18n} from 'vue-i18n';
import {useMeta} from 'vue-meta';

import AppBaseList from '../../../shared/components/AppBaseList.vue';
import AppIcon from '../../../shared/components/AppIcon.vue';
import AppDatatable from '../../../shared/components/AppDatatable.vue';
import AppConfirmDeleteModal from '../../../shared/components/AppConfirmDeleteModal.vue';
import AppModal from '../../../shared/components/AppModal.vue';

import {GetFiltersContentService} from '../services/getFiltersContent.service';
import {GetContentsWithPaginationService} from '../services/getContentsWithPagination.service';
import {SubjectDto} from '../dtos/subject.dto';

import {LevelsDegreeDto} from '../dtos/levelsDegree.dto';
import {ContentTypeDto} from '../dtos/contentType.dto';
import AppButtonEdit from '../../../shared/components/AppButtonEdit.vue';
import AppButtonDelete from '../../../shared/components/AppButtonDelete.vue';
import {DeleteContentService} from '../services/deleteContent.service';
import {UpdateDatatableService} from '../../../shared/services/updateDatatable.service';

const getFiltersContentService = new GetFiltersContentService();
const deleteContentService = new DeleteContentService();
const updateDatatableService = new UpdateDatatableService();

export default defineComponent({
  name: 'Contents',
  components: {AppButtonDelete, AppButtonEdit, AppIcon, AppDatatable, AppBaseList, AppConfirmDeleteModal, AppModal},
  setup() {
    useMeta({
      title: 'Contenidos',
    });
    const {t} = useI18n();
    const getContentsWithPaginationService = new GetContentsWithPaginationService();

    const subjects: { value: SubjectDto[] } = reactive({
      value: [],
    });
    const levelsDegrees: { value: LevelsDegreeDto[] } = reactive({
      value: [],
    });
    const contentTypes: { value: ContentTypeDto[] } = reactive({
      value: [],
    });
    const subjectId = ref();
    const degreeId = ref();
    const contentTypeId = ref();
    const showModalDelete = ref(false);
    const currentContent: { value: any } = reactive({
      value: null,
    });

    const routes = [
      {
        name: 'Contenidos',
      },
    ];

    onMounted(async () => {
      const response = await getFiltersContentService.run();

      subjects.value = response.subjects;
      levelsDegrees.value = response.levelsDegrees;
      contentTypes.value = response.contentTypes;
    });

    const params = computed(() => {
      let levelId = null;

      levelsDegrees.value.forEach((levelDegree) => {
        if (levelDegree.degreeId === degreeId.value) {
          levelId = levelDegree.levelId;
        }
      });

      return {
        subjectId: subjectId.value,
        degreeId: degreeId.value,
        levelId,
      };
    });

    const updateTable = () => {
      updateDatatableService.run();
    };

    const confirmDelete = async (content: any) => {
      currentContent.value = content;
      showModalDelete.value = true;
    };

    const deleteContent = async () => {
      try {
        await deleteContentService.run(currentContent.value.id);
        showModalDelete.value = false;
        updateTable();
      } catch (e) {

      }
    };

    return {
      getContentsWithPaginationService,
      subjects,
      levelsDegrees,
      contentTypes,
      params,
      subjectId,
      contentTypeId,
      degreeId,
      t,
      routes,
      showModalDelete,
      confirmDelete,
      deleteContent,
    };
  },
});
</script>

<style scoped>

</style>