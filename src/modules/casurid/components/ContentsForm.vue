<template>
  <form @submit.prevent="save">
    <AppBaseList :title="title" :routes="routes">
      <template v-slot:actions>
        <AppBackButton :to="{ name: 'casurid.contentsList' }"></AppBackButton>
        <AppButtonLoading class="btn-primary text-white">Guardar</AppButtonLoading>
      </template>

      <template v-slot:content>
        <AppLoading v-if="loadingFilters"></AppLoading>
        <div class="card" v-else>
          <div class="card-body">

            <div class="form-row">
              <AppFormField :form-control="v$.form.degreeId">
                <label for="degreeId">Nivel - Grado</label>
                <v-select
                    class="tw-flex-1"
                    inputId="degreeId"
                    v-model="v$.form.degreeId.$model"
                    :options="levelsDegrees.value"
                    label="levelDegreeName"
                    :reduce="(levelDegree) => levelDegree.degreeId"
                ></v-select>
              </AppFormField>

              <AppFormField :form-control="v$.form.subjectId">
                <label for="subjectId">Asignatura</label>
                <v-select
                    class="tw-flex-1"
                    inputId="subjectId"
                    v-model="v$.form.subjectId.$model"
                    :options="subjects.value"
                    label="name"
                    :reduce="(subject) => subject.id"
                ></v-select>
              </AppFormField>
            </div>

            <div class="form-row">
              <AppFormField :form-control="v$.form.contentTypeId">
                <label for="contentTypeId">Tipo</label>
                <v-select
                    class="tw-flex-1"
                    inputId="contentTypeId"
                    v-model="v$.form.contentTypeId.$model"
                    :options="contentTypes.value"
                    label="name"
                    :reduce="(contentType) => contentType.id"
                ></v-select>
              </AppFormField>

              <AppFormField :form-control="v$.form.title">
                <label for="title">Título</label>
                <input type="text" class="form-control" v-model="v$.form.title.$model" id="title"/>
              </AppFormField>
            </div>

            <AppFormField :form-control="v$.form.description">
              <label for="description">Descripción</label>
              <textarea type="text" class="form-control" v-model="v$.form.description.$model" id="description"
                        rows="4"></textarea>
            </AppFormField>

            <div class="form-row">
              <AppFormField :form-control="v$.form.contentPdf">
                <label for="index">Tabla de contenido</label>
                <AppUploadFile input-id="index" v-model="v$.form.contentPdf.$model"
                               :current-file="currentContentPdf" @update:error-file="handleErrorFile"></AppUploadFile>
              </AppFormField>

              <AppFormField :form-control="v$.form.contentZip">
                <label for="urlLocation">Contenido</label>
                <AppUploadFile input-id="urlLocation" v-model="v$.form.contentZip.$model"
                               :current-file="currentContentZip" @update:error-file="handleErrorFileZip"></AppUploadFile>
              </AppFormField>

              <AppFormField :form-control="v$.form.duration">
                <label for="duration">Duración (Horas)</label>
                <input type="number" class="form-control" v-model="v$.form.duration.$model" id="duration"/>
              </AppFormField>
            </div>

          </div>
        </div>
      </template>
    </AppBaseList>
  </form>
</template>

<script lang="ts">
import {defineComponent, onMounted, reactive, ref} from 'vue';
import AppButtonLoading from '../../../shared/components/AppButtonLoading.vue';
import AppFormField from '../../../shared/components/AppFormField.vue';
import AppBackButton from '../../../shared/components/AppBackButton.vue';
import AppBaseList from '../../../shared/components/AppBaseList.vue';
import {useMeta} from 'vue-meta';
import {useRouter} from 'vue-router';
import {ContentTypeDto} from '../dtos/contentType.dto';
import {SubjectDto} from '../dtos/subject.dto';
import {LevelsDegreeDto} from '../dtos/levelsDegree.dto';
import {useVuelidate} from '@vuelidate/core';
import {numeric, required, url} from '@vuelidate/validators';
import {GetFiltersContentForm} from '../services/getFiltersContentForm.service';
import {CreateOrUpdateContentService} from '../services/createOrUpdateContent.service';
import AppLoading from '../../../shared/components/AppLoading.vue';
import AppUploadFile from '../../../shared/components/AppUploadFile.vue';

const getFiltersContentForm = new GetFiltersContentForm();
const createOrUpdateContentService = new CreateOrUpdateContentService();

export default defineComponent({
  name: 'ContentsForm',
  components: {AppUploadFile, AppLoading, AppButtonLoading, AppFormField, AppBackButton, AppBaseList},
  props: ['title', 'routes', 'data'],
  setup(props) {
    const title = props.title;
    const routes = props.routes;
    const data = props.data;

    useMeta({
      title,
    });

    const router = useRouter();

    const contentTypes: { value: ContentTypeDto[] } = reactive({
      value: [],
    });
    const subjects: { value: SubjectDto[] } = reactive({
      value: [],
    });
    const levelsDegrees: { value: LevelsDegreeDto[] } = reactive({
      value: [],
    });

    const currentContentZip = data?.urlLocation;
    const currentContentPdf = data?.index;

    let errorFile = reactive({
      file: '',
      fileZip: '',
    });

    const form = reactive({
      degreeId: data?.degreeId,
      subjectId: data?.subjectId,
      title: data?.title,
      description: data?.description,
      contentTypeId: data?.contentTypeId,
      contentZip: null,
      contentPdf: null,
      duration: data?.duration,
    });

    const v$ = useVuelidate({
      form: {
        degreeId: {required},
        subjectId: {required},
        title: {required},
        description: {},
        contentZip: data?.id ? {} : {required},
        contentPdf: data?.id ? {} : {required},
        contentTypeId: {required},
        duration: {required, numeric},
      },
    }, {form});

    const loadingFilters = ref(true);

    onMounted(async () => {
      try {
        const response = await getFiltersContentForm.run();

        contentTypes.value = response.contentTypes;
        subjects.value = response.subjects;
        levelsDegrees.value = response.levelsDegrees;
      } catch (e) {
      }

      loadingFilters.value = false;
    });

    const handleErrorFile = (value: any) => {
      errorFile.file = value;
    };
    const handleErrorFileZip = (value: any) => {
      errorFile.fileZip = value;
    };

    const save = async () => {
      let levelId = 0;
      if (form.degreeId) {
        levelsDegrees.value.forEach((levelDegree) => {
          if (levelDegree.degreeId === form.degreeId) {
            levelId = levelDegree.levelId;
          }
        });
      }

      const formIsValid = await v$.value.$validate();

      if (!formIsValid || errorFile.file || errorFile.fileZip) return;

      try {
        await createOrUpdateContentService.run({
          ...form,
          levelId,
        }, data?.id);

        await router.push({
          name: 'casurid.contentsList',
        });
      } catch (e) {

      }
    };

    return {
      title,
      routes,
      loadingFilters,
      contentTypes,
      subjects,
      levelsDegrees,
      v$,
      currentContentZip,
      currentContentPdf,
      save,
      handleErrorFile,
      handleErrorFileZip,
    };
  },
});
</script>

<style scoped>

</style>