<template>
  <AppBaseList title="Contenidos">
    <template v-slot:actions>

    </template>

    <template v-slot:content>
      <AppDatatable
          :service="getContentsWithPaginationService"
      >
        <template v-slot:filters>
          <div class="d-flex flex-column flex-md-row align-items-md-center gap-2">
              <span>
                Filtros:
              </span>

            <select class="form-select">
              <option value="" selected disabled>Nivel - Grado</option>
              <option v-for="level in levelsDegrees.value" :value="level.degreeId">
                {{ level.levelDegreeName }}
              </option>
            </select>

            <select class="form-select">
              <option value="" selected disabled>Asignatura</option>
              <option v-for="subject in subjects.value" :value="subject.id">
                {{ subject.name }}
              </option>
            </select>
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
import {defineComponent, onMounted, reactive} from 'vue';
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

    onMounted(async () => {
      const response = await getFiltersContentService.run();

      subjects.value = response.subjects;
      levelsDegrees.value = response.levelsDegrees;
      contentTypes.value = response.contentTypes;
    });

    return {
      getContentsWithPaginationService,
      subjects,
      levelsDegrees,
      contentTypes,
    };
  },
});
</script>

<style scoped>

</style>