<template>
  <div class="row">
    <div class="col-12 col-md-8 col-lg-6 offset-md-2 offset-lg-3">
      <div class="input-group mb-3">
        <span class="input-group-text" id="basic-addon1">
          <AppIcon icon="search"></AppIcon>
        </span>
        <input type="text" placeholder="Buscar un contenido..." class="form-control">
        <button class="input-group-text btn btn-primary d-flex text-white" id="basic-addon2"
                @click="showFilters = !showFilters">
          <AppIcon icon="filter" class="me-2"></AppIcon>
          <span class="d-none d-md-block">
            Búsqueda Avanzada
          </span>
        </button>
      </div>
    </div>

    <div class="col-12" v-if="showFilters">
      <div class="card">

        <div class="card-body">
          <AppLoading v-if="loadingFilters"/>

          <template v-else>
            <small>Búsqueda avanzada</small>

            <AppStepper class="mt-3" v-model="currentStep">
              <template v-slot:header>
                <AppStepperStep step="1">
                  Nivel Academico
                </AppStepperStep>

                <AppStepperStep step="2">
                  Grados
                </AppStepperStep>

                <AppStepperStep step="3">
                  Áreas
                </AppStepperStep>

                <AppStepperStep step="4">
                  Asignaturas
                </AppStepperStep>
              </template>

              <template v-slot:items>
                <AppStepperContent step="1">
                  <div class="row g-2 mt-2">
                    <div class="col-12 col-md-4 col-lg-3" v-for="level in levels">
                      <div class="card">
                        <img :src="level.thumbnail" class="card-img-top img-filters" :alt="level.name" @error="imageError">
                        <div class="card-body d-flex justify-content-center">
                          <div class="form-check form-switch">
                            <input class="form-check-input" type="checkbox" :id="`levelCheck-${level.id}`">
                            <label class="form-check-label" :for="`levelCheck-${level.id}`">{{ level.name }}</label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </AppStepperContent>

                <AppStepperContent step="2">
                  Grados
                </AppStepperContent>

                <AppStepperContent step="3">
                  Áreas
                </AppStepperContent>

                <AppStepperContent step="4">
                  Asignaturas
                </AppStepperContent>
              </template>
            </AppStepper>
          </template>

        </div>
      </div>
    </div>

  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import NavBar from '../components/NavBar.vue';
import AppIcon from '@/shared/components/AppIcon.vue';
import {CatalogueRelatedDataService} from '../services/catalogueRelatedData.service';
import {LevelDto} from '../dtos/level.dto';
import {AreaDto} from '../dtos/area.dto';
import ImageNotAvailable from '../../../assets/images/image-not-available.png';
import AppLoading from '../../../shared/components/AppLoading.vue';
import AppStepper from '../../../shared/components/Stepper/AppStepper.vue';
import AppStepperStep from '../../../shared/components/Stepper/AppStepperStep.vue';
import AppStepperContent from '../../../shared/components/Stepper/AppStepperContent.vue';

const catalogueRelatedDataService = new CatalogueRelatedDataService();

export default defineComponent({
  name: 'HomePage',
  components: {AppStepperContent, AppStepperStep, AppStepper, AppLoading, NavBar, AppIcon},
  data(): { showFilters: Boolean, levels: LevelDto[], areas: AreaDto[], loadingFilters: boolean, currentStep: number } {
    return {
      showFilters: true,
      levels: [],
      areas: [],
      loadingFilters: false,
      currentStep: 3,
    };
  },
  async mounted() {
    this.loadingFilters = true;
    const relatedData = await catalogueRelatedDataService.run();

    this.levels = relatedData.levels.map((level) => {
      const newLevel = level;
      if (!newLevel.thumbnail) {
        newLevel.thumbnail = ImageNotAvailable;
      }
      return newLevel;
    });
    this.areas = relatedData.areas;

    this.loadingFilters = false;
  },
  methods: {
    imageError() {
      console.log('aqui');
    },
  },
});
</script>

<style scoped>
.input-group {
  height: 48px;
}

.img-filters {
  max-height: 250px;
  object-fit: contain;
  /*width: 250px;*/
}
</style>