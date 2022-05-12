<template>
  <form @submit.prevent="save">
    <AppBaseList :title="title" :routes="routes">
      <template v-slot:actions>
        <AppBackButton v-if="!fromProfile" :to="{ name: 'casurid.institutionsList' }"></AppBackButton>
        <AppButtonLoading class="btn-primary text-white">Guardar</AppButtonLoading>
      </template>

      <template v-slot:content>
        <AppLoading v-if="loadingMunicipalities"></AppLoading>

        <div class="card" v-else>
          <div class="card-body">
            <div class="form-row">
              <AppFormField :form-control="v$.form.institution.name">
                <label for="name">Nombre</label>
                <input type="text" class="form-control" v-model="v$.form.institution.name.$model" id="name"/>
              </AppFormField>

              <AppFormField :form-control="v$.form.institution.identification">
                <label for="identification">NIT</label>
                <input type="text" class="form-control" v-model="v$.form.institution.identification.$model"
                       id="identification"/>
              </AppFormField>
            </div>

            <div class="form-row">
              <AppFormField :form-control="v$.form.institution.phone">
                <label for="phone">Teléfono</label>
                <input type="tel" class="form-control" v-model="v$.form.institution.phone.$model" id="phone"/>
              </AppFormField>

              <AppFormField :form-control="v$.form.institution.municipalityId">
                <label for="municipalityId">Ciudad</label>
                <v-select
                    v-model="v$.form.institution.municipalityId.$model"
                    class="tw-flex-1"
                    :filterable="false"
                    @search="searchMunicipalities"
                    :options="municipalities.value"
                    label="MunicipalityRegionName"
                    :reduce="(municipality) => municipality.id">
                </v-select>
              </AppFormField>
            </div>

            <div class="form-row">
              <AppFormField :form-control="v$.form.institution.email">
                <label for="email">Correo</label>
                <input type="text" class="form-control" v-model="v$.form.institution.email.$model" id="email"
                       :disabled="data?.institution?.id >= 0"/>
              </AppFormField>

              <AppFormField :form-control="v$.form.user.password">
                <label for="password">Contraseña</label>
                <div class="row g-2">
                  <div class="col">
                    <input type="password" class="form-control" v-model="v$.form.user.password.$model" id="password"
                           placeholder="Contraseña"/>
                  </div>
                  <div class="col">
                    <input type="password" class="form-control" v-model="v$.form.user.passwordConfirmation.$model"
                           id="passwordConfirmation" placeholder="Confirmar contraseña"/>
                  </div>
                </div>
              </AppFormField>
            </div>

            <div class="form-row" v-if="!fromProfile">
              <AppFormField :form-control="v$.form.institution.active">
                <label>Estado</label>
                <v-select
                    v-model="v$.form.institution.active.$model"
                    class="tw-flex-1"
                    :filterable="false"
                    :options="status.value"
                    label="name"
                    :reduce="(status) => status.id">
                </v-select>
              </AppFormField>

              <AppFormField :form-control="v$.form.institution.isClient">
                <div class="form-check mt-4">
                  <input type="checkbox" class="form-check-input" v-model="v$.form.institution.isClient.$model"
                         id="isClient"/>
                  <label for="isClient" class="form-check-label"> Habilitar como cliente</label>
                </div>
              </AppFormField>
            </div>

            <div class="form-row">
              <AppFormField :form-control="v$.form.institution.secretKey">
                <label for="secretKey">Llave Secreta</label>
                <input type="text" class="form-control" v-model="v$.form.institution.secretKey.$model" id="secretKey"/>
              </AppFormField>

              <AppFormField :form-control="v$.form.institution.lmsUrlApiRest">
                <label for="lmsUrlApiRest">Url LMS</label>
                <input type="text" class="form-control" v-model="v$.form.institution.lmsUrlApiRest.$model"
                       id="lmsUrlApiRest"/>
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
import {useMeta} from 'vue-meta';
import {useRouter} from 'vue-router';
import {debounce} from 'ts-debounce';
import useVuelidate from '@vuelidate/core';
import {numeric, required, url} from '@vuelidate/validators';

import AppButtonLoading from '../../../shared/components/AppButtonLoading.vue';
import AppFormField from '../../../shared/components/AppFormField.vue';
import AppBackButton from '../../../shared/components/AppBackButton.vue';
import AppBaseList from '../../../shared/components/AppBaseList.vue';
import AppLoading from '../../../shared/components/AppLoading.vue';

import {MunicipalityDto} from '../../../shared/dto/municipality.dto';
import {StatusInstitutionFormDto} from '../dtos/statusInstitucionForm.dto';

import {GetMunicipalitiesService} from '../services/getMunicipalities.service';
import {CreateOrUpdateInstitutionService} from '../services/createOrUpdateInstitution.service';

const getMunicipalitiesService = new GetMunicipalitiesService();
const createOrUpdateInstitutionService = new CreateOrUpdateInstitutionService();

export default defineComponent({
  name: 'institutionsForm',
  components: {AppLoading, AppButtonLoading, AppFormField, AppBackButton, AppBaseList},
  props: ['title', 'routes', 'data', 'fromProfile'],

  setup(props) {
    const title = props.title;
    const routes = props.routes;
    const data = props.data;

    useMeta({
      title,
    });

    const router = useRouter();
    const loadingMunicipalities = ref(true);

    const municipalities: { value: MunicipalityDto[] } = reactive({
      value: [],
    });
    const status: { value: StatusInstitutionFormDto[] } = reactive({
      value: [],
    });

    const form = reactive({
      institution: {
        name: data?.institution?.name,
        identification: data?.institution?.identification,
        phone: data?.institution?.phone ?? null,
        municipalityId: data?.institution?.municipalityId,
        email: data?.user?.userToken,
        active: data?.institution?.active ?? 0,
        isClient: !!data?.institution?.isClient,
        secretKey: data?.institution?.secretKey,
        publicKey: data?.institution?.publicKey ?? null,
        lmsUrlApiRest: data?.institution?.lmsUrlApiRest,
      },
      user: {
        id: data?.user?.id ?? null,
        userToken: data?.user?.userToken,
        password: '',
        passwordConfirmation: '',
      },
    });

    const v$ = useVuelidate({
      form: {
        institution: {
          name: {required},
          identification: {required, numeric},
          phone: {required},
          municipalityId: {required},
          email: {required},
          active: {numeric},
          isClient: {},
          secretKey: {},
          publicKey: {},
          lmsUrlApiRest: {url},
        },
        user: {
          id: {numeric},
          userToken: {},
          password: data?.user?.id ? {} : {required},
          passwordConfirmation: data?.user?.id ? {} : {required},
        },
      },
    }, {form});

    onMounted(async () => {
      try {
        getMunicipalities('a').then((res) => {
          municipalities.value = res.data;
        });

        status.value = [
          {
            id: 0,
            name: 'Inactivo',
          },
          {
            id: 1,
            name: 'Activo',
          },
        ];
      } catch (e) {
        console.log(e);
      }

      loadingMunicipalities.value = false;

    });

    const getMunicipalities = (search: string) => {
      return getMunicipalitiesService.run({
        search,
        page: 1,
        perPage: 25,
      });
    };

    const searchMunicipalities = debounce(async (search: string, loading: Function) => {
      if (search) {
        loading(true);
        const response = await getMunicipalities(search);
        municipalities.value = response.data;
        loading(false);
      }
    }, 800);

    const save = async () => {
      const formIsValid = await v$.value.$validate();

      if (!formIsValid) return;

      try {
        form.user.userToken = form.institution.email;

        /*if (!form.user.password) {
          form.user.password = data?.user.password;
          form.user.passwordConfirmation = data?.user.password;
        }*/

        form.institution.isClient = form.institution.isClient ? 1 : 0;

        await createOrUpdateInstitutionService.run({
          ...form,
        }, data?.institution.id);


        if (!props.fromProfile) {
          await router.push({
            name: 'casurid.institutionsList',
          });
        }
      } catch (e) {
        console.log(e);
      }
    };

    return {
      title,
      routes,
      loadingMunicipalities,
      municipalities,
      searchMunicipalities,
      status,
      v$,
      save,
    };
  },
});
</script>

<style scoped>

</style>