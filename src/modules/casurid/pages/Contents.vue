<template>
  <AppBaseList title="Contenidos">
    <template v-slot:actions>

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
                :reduce="(levelDegree) => levelDegree.degreeId">
            </v-select>

            <v-select
                class="tw-flex-1"
                v-model="subjectId"
                :options="subjects.value"
                label="name"
                :reduce="(subject) => subject.id">
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
              <td></td>
            </tr>
          </template>

        </template>
      </AppDatatable>
    </template>
  </AppBaseList>
</template>

<script lang="ts">
import {computed, defineComponent, onMounted, reactive, ref} from 'vue';
import AppBaseList from '../../../shared/components/AppBaseList.vue';
import {GetFiltersContentService} from '../services/getFiltersContent.service';
import AppDatatable from '../../../shared/components/AppDatatable.vue';
import {GetContentsWithPaginationService} from '../services/getContentsWithPagination.service';
import {SubjectDto} from '../dtos/subject.dto';

import {LevelsDegreeDto} from '../dtos/levelsDegree.dto';
import {ContentTypeDto} from '../dtos/contentType.dto';

const getFiltersContentService = new GetFiltersContentService();


export default defineComponent({
  name: 'Contents',
  components: {AppDatatable, AppBaseList},
  setup() {
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

    return {
      getContentsWithPaginationService,
      subjects,
      levelsDegrees,
      contentTypes,
      params,
      subjectId,
      contentTypeId,
      degreeId,
    };
  },
});
</script>

<style scoped>

</style>