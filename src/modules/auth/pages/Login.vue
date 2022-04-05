<template>
  <div class="d-flex flex-column w-100 h-100 justify-content-center align-items-center p-4">
    <div class="w-100 text-center">
      <img class="img-main" src="https://academia-user-serverless-deployment.s3.amazonaws.com/files/prod/2/2022/institution/logo1.png"/>
    </div>

    <div class="card login-container shadow-sm w-100">
      <div class="card-body px-4 py-5">
        <form @submit.prevent="login">
          <AppFormField><label for="username">Nombre de usuario</label>
            <input v-on:keydown="c = 0" type="text" class="form-control" :class="{ 'is-invalid': v$.form.username.$error }" id="username" v-model="v$.form.username.$model"/>
            <!--            <small class="text-danger" v-if="formControl.$errors.length">
                          {{ formControl.$errors[0].$message }}
                        </small>-->
          </AppFormField>
          <!--          <div class="mb-3 ">
                      <label for="username">Nombre de usuario</label>
                      <input type="text" class="form-control" :class="{ 'is-invalid': v$.form.username.$error }" id="username" v-model="v$.form.username.$model"/>
                      <small class="text-danger" v-if="v$.form.username.$errors.length">
                        {{ v$.form.username.$errors[0].$message }}
                      </small>
                    </div>-->

          <div class="mb-3">
            <label for="password">Contraseña</label>
            <div class="input-group">
              <input v-on:keydown="c = 0" :type="showPassword ? 'text' : 'password'" class="form-control" :class="{ 'is-invalid': v$.form.password.$error }" id="password" v-model="v$.form.password.$model"/>
              <button class="btn btn-outline-secondary" type="button" @click="showPassword = !showPassword">
                <AppIcon :icon="showPassword ? 'eye-slash' : 'eye'"></AppIcon>
              </button>
            </div>

            <small class="text-danger" v-if="v$.form.password.$errors.length">
              {{ v$.form.password.$errors[0].$message }}
            </small>
          </div>

          <div class="d-grid"> 
            <button class="btn btn-primary text-white btn-block" v-on:click="c += 1" :disabled="btnDisabled">
              Iniciar sesión
            </button>
          </div>

          <div class="message-alert alert alert-danger d-flex mt-4 col-auto" role="alert" v-if="messageAlert">
            <AppIcon class="me-4" icon="exclamation-triangle"></AppIcon>
            <span>{{ messageAlert }}</span>          
          </div>

          <div class="toast show bg-light" role="alert" aria-live="assertive" aria-atomic="true" v-if="messageWelcome">
            <div class="toast-header">
                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body">
                {{ messageWelcome }}
            </div>
          </div>

        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from "vue";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { IsAuthenticatedService } from "../../../shared/services/isAuthenticated.service";
import AppIcon from "../../../shared/components/AppIcon.vue";
import AppFormField from "../../../shared/components/AppFormField.vue";
import { LoginService } from "../services/login.service";
import { router } from "../../../app.routing";

const isAuthenticatedService: IsAuthenticatedService = new IsAuthenticatedService();
const defaultRouteRedirect = "/admin/home";
const loginService = new LoginService();

export default defineComponent({
  name: "Login",
  components: { AppFormField, AppIcon },
  setup() {
    return {
      showPassword: ref(false),
      v$: useVuelidate(),
    };
  },
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
      messageAlert: null,
      messageWelcome: '',
      c: 0
    };
  },
  validations() {
    return {
      form: {
        username: { required },
        password: { required },
      },
    };
  },
  computed: {
    btnDisabled() {
      let bd = false;
      if (this.c>1) {
        bd = true
      }else{
        bd = false
      }
      return bd;
    }
  },
  methods: {
    async login() {
      const formIsValid = await this.v$.$validate();

      if (!formIsValid) {
        return false;
      }

      try {
        var welcome = await loginService.run({
          username: this.form.username,
          password: this.form.password,
        });

        this.messageWelcome = welcome.data.message;

        this.$toast.open({message: this.messageWelcome, type: 'default', position: 'top-right', duration: 5000});      
        
        await this.$router.push(defaultRouteRedirect);
        //await this.$router.push({name: "defaultRouteRedirect", params: {welcome: this.messageAlert}});
      } catch (e: any) {
        console.log("Error desde catch", e);
        this.messageAlert = e.response.data.message;
      }
    },
  },
});
</script>

<style scoped>
.login-container {
  max-width: 450px;
}

.img-main {
  max-width: 350px;
}

.message-alert {
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>