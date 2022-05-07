<template>
  <form @submit.prevent="save">
    <AppBaseList :title="title" :routes="routes" :subtitle="subtitle">
      <template v-slot:actions>
        <AppBackButton :to="{ name: 'casurid.plansList' }"></AppBackButton>

        <AppButtonLoading class="btn-primary text-white" type="button" @click="saveAndCreate">
          Guardar y crear otro
        </AppButtonLoading>

        <AppButtonLoading class="btn-primary text-white" type="button" @click="saveAndExit">
          Guardar
        </AppButtonLoading>
      </template>
      <template v-slot:content>
        <div class="card">
          <div class="card-body">
            <AppLoading v-if="loading"></AppLoading>
            <div v-else class="row">
              <div class="col-12 col-md-6">
                <AppFormField :form-control="v$.form.title">
                  <label for="title">Título</label>
                  <input type="text" class="form-control" v-model="v$.form.title.$model" id="title"/>
                </AppFormField>

                <AppFormField :form-control="v$.form.description">
                  <label for="description">Descripción</label>
                  <textarea type="text" class="form-control" v-model="v$.form.description.$model" id="description"
                            rows="4"></textarea>
                </AppFormField>

                <AppFormField :form-control="v$.form.index">
                  <label for="index">URL tabla de contenido</label>
                  <input type="text" class="form-control" v-model="v$.form.index.$model" id="index"/>
                </AppFormField>

                <div class="form-row">
                  <AppFormField :form-control="v$.form.defaultUnitValue">
                    <label for="defaultUnitValue">Valor</label>
                    <input type="number" class="form-control" v-model="v$.form.defaultUnitValue.$model"
                           id="defaultUnitValue"/>
                  </AppFormField>

                  <AppFormField :form-control="v$.form.validityPeriod">
                    <label for="validityPeriod">Vigencia (Meses)</label>
                    <input type="number" class="form-control" v-model="v$.form.validityPeriod.$model"
                           id="validityPeriod"/>
                  </AppFormField>
                </div>

                <AppFormField :form-control="v$.form.file">
                  <label for="file">Carátula</label>
                  <input type="file" class="form-control" @change="changeFile"
                         id="file"/>
                  <a :href="currentThumbnail" target="_blank" v-if="currentThumbnail">
                    <small>Ver archivo actual</small>
                  </a>
                </AppFormField>
              </div>

              <div class="col-12 col-md-6">
                <AppFormField :form-control="v$.form.contentsIds">
                  <label for="contentsIds" class="lead">Contenidos</label>
                  <v-select inputId="contentsIds" v-model="v$.form.contentsIds.$model" :options="contents.value"
                            multiple label="title"
                            :reduce="(content) => content.id"></v-select>
                </AppFormField>
              </div>
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
import AppLoading from '../../../shared/components/AppLoading.vue';
import AppFormField from '../../../shared/components/AppFormField.vue';

import {useMeta} from 'vue-meta';
import {useRoute, useRouter} from 'vue-router';
import {useVuelidate} from '@vuelidate/core';
import {numeric, required, url} from '@vuelidate/validators';

import {GetRelatedDataPlansFormService} from '../services/getRelatedDataPlansForm.service';
import AppButtonLoading from '../../../shared/components/AppButtonLoading.vue';
import {ContentDto} from '../dtos/content.dto';
import AppBackButton from '../../../shared/components/AppBackButton.vue';
import {CreateOrUpdatePlanService} from '../services/createOrUpdatePlan.service';

const getRelatedDataPlansFormService = new GetRelatedDataPlansFormService();
const createOrUpdatePlanService = new CreateOrUpdatePlanService();

export default defineComponent({
  name: 'PlansForm',
  components: {AppBackButton, AppButtonLoading, AppFormField, AppLoading, AppBaseList},
  props: ['title', 'routes', 'data'],
  setup(props) {
    const title = props.title;
    const route = useRoute();
    const router = useRouter();
    const {levelId, degreeId, subjectId} = route.query as any;
    const data = props.data;
    const loading = ref(true);
    const subtitle = ref('');
    const contents: { value: ContentDto[] } = reactive({
      value: [],
    });
    const routeBack = ref('casurid.plansList');
    const query = reactive({
      value: {},
    });
    const currentThumbnail = data?.thumbnail;

    useMeta({
      title,
    });

    const form = reactive({
      title: data?.title,
      description: data?.description,
      index: data?.index,
      defaultUnitValue: data?.defaultUnitValue,
      validityPeriod: data?.validityPeriod,
      file: null,
      contentsIds: data?.contentsIds ?? [],
    });

    const v$ = useVuelidate({
      form: {
        title: {required},
        description: {},
        index: {url},
        defaultUnitValue: {required, numeric},
        validityPeriod: {required, numeric},
        file: !data?.id ? {required} : {},
        contentsIds: {required},
      },
    }, {form});

    onMounted(async () => {
      if (levelId && degreeId && subjectId) {
        const params: any = {
          levelId: parseInt(levelId.toString()),
          degreeId: parseInt(degreeId.toString()),
          subjectId: parseInt(subjectId.toString()),
          productId: data?.id,
        };

        const response = await getRelatedDataPlansFormService.run(params);

        subtitle.value = `${response.subject.name} - ${response.degree.name} - ${response.level.name}`;
        contents.value = response.contents;

        response.contents.forEach((content) => {
          if (content.checked) {
            form.contentsIds.push(content.id);
          }
        });
      }
      loading.value = false;
    });

    const changeFile = (event: any) => {
      const files = event.target.files;

      if (files[0]) {
        form.file = files[0];
      } else {
        form.file = null;
      }
    };

    const saveAndCreate = async () => {
      routeBack.value = 'casurid.plansCreate';
      query.value = route.query;
      await save();
    };

    const saveAndExit = async () => {
      routeBack.value = 'casurid.plansList';
      query.value = {};
      await save();
    };

    const save = async () => {
      const formIsValid = await v$.value.$validate();

      if (!formIsValid || !degreeId || !levelId || !subjectId) return;

      try {
        await createOrUpdatePlanService.run({
          levelId,
          degreeId,
          subjectId,
          ...form,
          // TODO: De donde saco este campo
          productTypeId: 1,
        }, data?.id);

        await router.push({
          name: routeBack.value,
          query: query.value,
        });
      } catch (e) {

      }
    };

    return {
      title,
      v$,
      loading,
      subtitle,
      contents,
      currentFile: currentThumbnail,
      save,
      saveAndCreate,
      saveAndExit,
      changeFile,
    };
  },
});
</script>

<style scoped>

</style>