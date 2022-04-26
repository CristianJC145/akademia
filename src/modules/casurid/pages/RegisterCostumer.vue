<template>
  <AppBaseList
      title="Registrarse"
      subtitle="Deseas implementar contenidos de calidad en tu Institución Educativa?. Regístrate y nos pondremos en contacto contigo"
  >
    <template v-slot:content>
      <form @submit.prevent="register">
        <div class="card">
          <div class="card-body">
            <p>Datos de la institución educativa</p>

            <AppErrorAlert></AppErrorAlert>

            <AppFormField :form-control="v$.form.institution.identification">
              <label for="identification">Nit</label>
              <input type="text" class="form-control" name="identification" id="identification"
                     v-model="v$.form.institution.identification.$model"/>
            </AppFormField>

            <AppFormField :form-control="v$.form.institution.name">
              <label for="name">Nombre</label>
              <input type="text" class="form-control" name="name" id="name" v-model="v$.form.institution.name.$model"/>
            </AppFormField>

            <AppFormField :form-control="v$.form.institution.phone">
              <label for="phone">Celular / Teléfono</label>
              <input type="text" class="form-control" name="phone" id="phone"
                     v-model="v$.form.institution.phone.$model"/>
            </AppFormField>

            <AppFormField :form-control="v$.form.institution.municipalityId">
              <label for="municipalityId">Ciudad</label>
              <!--              <input type="text" class="form-control" name="municipalityId" id="municipalityId"
                                   v-model="v$.form.institution.municipalityId.$model"/>-->
              <v-select
                  v-model="v$.form.institution.municipalityId.$model"
                  :filterable="false"
                  @search="searchMunicipalities"
                  :options="municipalities.value"
                  label="MunicipalityRegionName"
                  :reduce="(municipality) => municipality.id">
              </v-select>
            </AppFormField>

            <AppFormField :form-control="v$.form.user.userToken">
              <label for="email">Email</label>
              <input type="text" class="form-control" name="email" id="email" v-model="v$.form.user.userToken.$model"/>
            </AppFormField>

            <AppFormField :form-control="v$.form.user.password">
              <label for="password">Contraseña</label>
              <input type="password" class="form-control" name="password" id="password"
                     v-model="v$.form.user.password.$model"/>
            </AppFormField>

            <AppFormField :form-control="v$.form.user.passwordConfirmation">
              <label for="confirm_password">Confirmar contraseña</label>
              <input type="password" class="form-control" name="confirm_password" id="confirm_password"
                     v-model="v$.form.user.passwordConfirmation.$model"/>
            </AppFormField>

            <div class="d-flex justify-content-center">
              <AppButtonLoading class="btn-primary text-white" :loading="loading">
                Registrarme
              </AppButtonLoading>
            </div>
          </div>
        </div>
      </form>
    </template>
  </AppBaseList>
</template>

<script lang="ts">
import {defineComponent, reactive, ref} from 'vue';
import {useVuelidate} from '@vuelidate/core';
import {required} from '@vuelidate/validators';
import {debounce} from 'ts-debounce';

import AppBaseList from '../../../shared/components/AppBaseList.vue';
import AppFormField from '../../../shared/components/AppFormField.vue';
import AppLoading from '../../../shared/components/AppLoading.vue';
import AppButtonLoading from '../../../shared/components/AppButtonLoading.vue';
import {GetMunicipalitiesService} from '../services/getMunicipalities.service';
import {MunicipalityDto} from '../../../shared/dto/municipality.dto';
import {RegisterCustomerService} from '../services/registerCustomer.service';
import AppErrorAlert from '../../../shared/components/AppErrorAlert.vue';
import {useRouter} from 'vue-router';

const getMunicipalitiesService = new GetMunicipalitiesService();
const registerCustomerService = new RegisterCustomerService();

export default defineComponent({
  name: 'RegisterCostumer',
  components: {AppErrorAlert, AppButtonLoading, AppLoading, AppBaseList, AppFormField},
  setup() {
    const loading = ref(false);
    const router = useRouter();

    const form = reactive({
      institution: {
        identification: '',
        name: '',
        phone: '',
        municipalityId: '',
        email: '',
      },
      user: {
        userToken: '',
        password: '',
        passwordConfirmation: '',
      },
    });

    const v$ = useVuelidate({
      form: {
        institution: {
          identification: {required},
          name: {required},
          phone: {required},
          municipalityId: {required},
          email: {required},
        },
        user: {
          userToken: {required},
          password: {required},
          passwordConfirmation: {required},
        },
      },
    }, {form});

    const register = async () => {
      form.institution.email = form.user.userToken;
      const formIsValid = await v$.value.$validate();

      if (!formIsValid) {
        return;
      }

      loading.value = true;

      try {
        await registerCustomerService.run(form);
        await router.push('/');
      } catch (e) {

      }

      loading.value = false;
    };

    const municipalities: { value: MunicipalityDto[] } = reactive({
      value: [],
    });

    const searchMunicipalities = debounce(async (search: string, loading: Function) => {
      if (search) {
        loading(true);
        const response = await getMunicipalities(search);
        municipalities.value = response.data;
        loading(false);
      }
    }, 800);

    const getMunicipalities = (search: string) => {
      return getMunicipalitiesService.run({
        search,
        page: 1,
        perPage: 25,
      });
    };

    return {
      v$,
      form,
      loading,
      municipalities,
      register,
      getMunicipalities,
      searchMunicipalities,
    };
  },
});
</script>

<style scoped>

</style>