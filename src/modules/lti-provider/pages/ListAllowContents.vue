<template>
  <AppBaseList
      :title="title"
  >
    <template v-slot:content>
      <div class="card">
        <div class="card-body d-flex flex-column">
          <div class="d-flex flex-column flex-md-row align-items-md-center gap-2">
            <span>
              Filtros:
            </span>

            <select class="form-select">
              <option value="" selected disabled>Grado</option>
              <option v-for="degree in levelsDegrees.value" :value="degree.degreeId">
                {{ degree.levelDegreeName }}
              </option>
            </select>

            <select class="form-select">
              <option value="" selected disabled>Asignatura</option>
              <option v-for="subject in subjects.value" :value="subject.id">
                {{ subject.name }}
              </option>
            </select>
          </div>
          <div class="mt-4">
            <div class="row" v-for="content in contents.value">
              <div class="col-9">
                <h6>{{ content.title }}</h6>
              </div>
              <div class="col-3">
                <button class="btn btn-sm" @click="prepareDeepLinkData(content.title, content.urlLocation)" v-tooltip="'Agregar Tema al LMS'">
                  Agregar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </AppBaseList>
</template>

<script lang="ts">
import {defineComponent, onMounted, reactive, ref} from 'vue';
import AppBaseList from '../../../shared/components/AppBaseList.vue';
import {GetAllowContentsCasuridService} from "../services/getAllowContentsCasurid.service";
import {LevelDegreeDto} from "../dtos/levelDegree.dto";
import {SubjectDto} from "../dtos/subject.dto";
import {SendDeepLinkService} from "../services/sendDeepLink.service";

const getContents = new GetAllowContentsCasuridService();

export default defineComponent({
  name: 'ListAllowContents',
  components: {AppBaseList},
  setup() {

    const title = 'Contenidos disponibles en CASURID';

    const levelsDegrees: { value: LevelDegreeDto[] } = reactive({
      value: [],
    });

    const subjects: { value: SubjectDto[] } = reactive({
      value: [],
    });

    const contents = reactive({
      value: [],
    });


    onMounted(async () => {

      const filters = await getContents.run();

      levelsDegrees.value = filters.levelsDegrees;
      subjects.value = filters.subjects;
      contents.value = filters.contents;
    });

    const prepareDeepLinkData = async (title: string, urlContent:string,) => {
      const data = {
        title,
        name: title,
        value: urlContent,
      }

      const sendDeepLink = new SendDeepLinkService();
      await sendDeepLink.run(data);
    };

    return {
      title,
      levelsDegrees,
      subjects,
      contents,
      prepareDeepLinkData
    };
  },
});
</script>

<style scoped>

</style>