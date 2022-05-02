<template>
  <form @submit.prevent="save">
    <AppBaseList title="Nuevo contenido" :routes="routes">
      <template v-slot:actions>
        <AppBackButton :route="{ name: 'casurid.contentList' }"></AppBackButton>
        <AppButtonLoading class="btn-primary text-white">Guardar</AppButtonLoading>
      </template>

      <template v-slot:content>
        <div class="card">
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
              <AppFormField :form-control="v$.form.index">
                <label for="index">URL tabla de contenido</label>
                <input type="text" class="form-control" v-model="v$.form.index.$model" id="index"/>
              </AppFormField>

              <AppFormField :form-control="v$.form.urlLocation">
                <label for="urlLocation">URL Contenido</label>
                <input type="text" class="form-control" v-model="v$.form.urlLocation.$model" id="urlLocation"/>
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
import AppBaseList from '../../../shared/components/AppBaseList.vue';
import AppBackButton from '../../../shared/components/AppBackButton.vue';
import {GetFiltersContentForm} from '../services/getFiltersContentForm.service';
import {ContentTypeDto} from '../dtos/contentType.dto';
import {SubjectDto} from '../dtos/subject.dto';
import {LevelsDegreeDto} from '../dtos/levelsDegree.dto';
import AppFormField from '../../../shared/components/AppFormField.vue';
import {useVuelidate} from '@vuelidate/core';
import {required, numeric, url} from '@vuelidate/validators';
import AppButtonLoading from '../../../shared/components/AppButtonLoading.vue';

const getFiltersContentForm = new GetFiltersContentForm();

export default defineComponent({
  name: 'ContentsCreate',
  components: {AppButtonLoading, AppFormField, AppBackButton, AppBaseList},
  setup() {
    const routes = [
      {
        name: 'Contenidos',
        url: {
          name: 'casurid.contentList',
        },
      },
      {
        name: 'Nuevo contenido',
      },
    ];

    const contentTypes: { value: ContentTypeDto[] } = reactive({
      value: [],
    });
    const subjects: { value: SubjectDto[] } = reactive({
      value: [],
    });
    const levelsDegrees: { value: LevelsDegreeDto[] } = reactive({
      value: [],
    });

    const form = reactive({
      degreeId: null,
      subjectId: null,
      title: null,
      description: null,
      contentTypeId: null,
      urlLocation: null,
      index: null,
      duration: null,
    });

    const v$ = useVuelidate({
      form: {
        degreeId: {required},
        subjectId: {required},
        title: {required},
        description: {},
        urlLocation: {url},
        index: {url},
        contentTypeId: {required},
        duration: {required, numeric},
      },
    }, {form});

    onMounted(async () => {
      const response = await getFiltersContentForm.run();

      contentTypes.value = response.contentTypes;
      subjects.value = response.subjects;
      levelsDegrees.value = response.levelsDegrees;
    });

    const save = async () => {
      let levelId = null;
      if (form.degreeId) {
        levelsDegrees.value.forEach((levelDegree) => {
          if (levelDegree.degreeId.toString() === form.degreeId) {
            levelId = levelDegree.levelId.toString();
          }
        });
      }

      const formIsValid = await v$.value.$validate();

      if (!formIsValid) return;

      console.log(form);
      try {

      } catch (e) {

      }


    };

    return {
      routes,
      contentTypes,
      subjects,
      levelsDegrees,
      v$,
      save,
    };
  },
});
</script>

<style scoped>

</style>