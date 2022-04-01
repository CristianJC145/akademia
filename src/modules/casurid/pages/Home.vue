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

    <Transition name="slide-fade">
      <div class="col-12" v-if="showFilters">
        <div class="card">

          <div class="card-body">
            <AppLoading v-if="loadingFilters"/>

            <template v-else>
              <small>Búsqueda avanzada</small>

              <AppStepper class="mt-3" v-model.lazy="currentStep">
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
                        <CardFilter
                            :name="level.name"
                            :thumbnail="level.thumbnail"
                            :id="level.id"
                            v-model="level.isSelected"
                        ></CardFilter>
                      </div>
                    </div>
                  </AppStepperContent>

                  <AppStepperContent step="2">
                    <div class="row g-2 mt-2">
                      <div class="col-12 col-md-4 col-lg-2" v-for="degree in degrees">
                        <CardFilter
                            :name="degree.name"
                            :thumbnail="degree.thumbnail"
                            :id="degree.id"
                            v-model="degree.isSelected"
                        ></CardFilter>
                      </div>
                    </div>
                  </AppStepperContent>

                  <AppStepperContent step="3">
                    <div class="row g-2 mt-2">
                      <div class="col-12 col-md-4 col-lg-3" v-for="area in areas">
                        <CardFilter
                            :name="area.name"
                            :thumbnail="area.thumbnail"
                            :id="area.id"
                            v-model="area.isSelected"
                        ></CardFilter>
                      </div>
                    </div>
                  </AppStepperContent>

                  <AppStepperContent step="4">
                    <div class="row g-2 mt-2">
                      <div class="col-12 col-md-4 col-lg-2" v-for="subject in subjects">
                        <CardFilter
                            :name="subject.name"
                            :thumbnail="subject.thumbnail"
                            :id="subject.id"
                            v-model="subject.isSelected"
                        ></CardFilter>
                      </div>
                    </div>
                  </AppStepperContent>
                </template>
              </AppStepper>

              <div class="d-flex justify-content-end gap-2 mt-3">
                <button class="btn" :disabled="currentStep == 1" @click="currentStep -= 1">
                  Atras
                </button>
                <button class="btn btn-primary text-white" @click="nextStep()" :disabled="currentStep == 4">
                  Siguiente
                </button>
              </div>

            </template>
          </div>
        </div>
      </div>
    </Transition>

    <div class="col-12">
      aqui!!!
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
import {DegreeDto} from '../dtos/degree.dto';
import CardFilter from '../components/CardFilter.vue';
import {SubjectDto} from '../dtos/subject.dto';

const catalogueRelatedDataService = new CatalogueRelatedDataService();

interface ILevel extends LevelDto {
  isSelected: boolean;
}

interface IDegree extends DegreeDto {
  isSelected: boolean;
}

interface IArea extends AreaDto {
  isSelected: boolean;
}

interface ISubject extends SubjectDto {
  isSelected: boolean;
}

interface IHome {
  showFilters: Boolean,
  levels: ILevel[],
  degrees: IDegree[],
  areas: IArea[],
  subjects: ISubject[],
  loadingFilters: boolean,
  currentStep: number,
}

export default defineComponent({
  name: 'HomePage',
  components: {CardFilter, AppStepperContent, AppStepperStep, AppStepper, AppLoading, NavBar, AppIcon},
  data(): IHome {
    return {
      showFilters: true,
      levels: [],
      degrees: [],
      areas: [],
      subjects: [],
      loadingFilters: false,
      currentStep: 1,
    };
  },
  async mounted() {
    this.loadingFilters = true;
    const relatedData = await catalogueRelatedDataService.run();

    this.levels = relatedData.levels.map((level) => {
      return {
        ...level,
        thumbnail: level.thumbnail ?? ImageNotAvailable,
        isSelected: false,
      };
    });

    this.areas = relatedData.areas.map((area) => {
      return {
        ...area,
        thumbnail: area.thumbnail ?? ImageNotAvailable,
        isSelected: false,
      };
    });

    this.loadingFilters = false;
  },
  watch: {
    currentStep(value) {
      if (value == 2) {
        this.getDegrees();
      } else if (value == 4) {
        this.getSubjects();
      }
    },
  },
  methods: {
    getDegrees() {
      this.degrees = [];

      let allSelected = true;

      this.levels.forEach((level) => {
        if (level.isSelected) {
          allSelected = false;
        }
      });

      this.levels.forEach((level) => {
        if (level.isSelected || allSelected) {
          this.degrees.push(...level.degrees.map(degree => {
            return {
              ...degree,
              thumbnail: degree.thumbnail ?? ImageNotAvailable,
              isSelected: false,
            };
          }));
        }
      });
    },
    getSubjects() {
      this.subjects = [];

      let allSelected = true;

      this.areas.forEach((area) => {
        if (area.isSelected) {
          allSelected = false;
        }
      });

      this.areas.forEach((area) => {
        if (area.isSelected || allSelected) {
          this.subjects.push(...area.subjects.map((subject) => {
            return {
              ...subject,
              thumbnail: subject.thumbnail ?? ImageNotAvailable,
              isSelected: false,
            };
          }));
        }
      });
    },
    nextStep() {
      this.currentStep += 1;
    },
  },
});
</script>

<style scoped>
/*
  Enter and leave animations can use different
  durations and timing functions.
*/
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translate(-20px);
  opacity: 0;
}

.input-group {
  height: 48px;
}
</style>