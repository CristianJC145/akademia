<template>
  <div class="col-12">
    <div class="card">

      <div class="card-body">

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
                <div class="col-12 col-md-4 col-lg-3" v-for="level in currentLevels" :key="level.id">
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
                <div class="col-12 col-md-4 col-lg-2" v-for="degree in currentDegrees" :key="degree.id">
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
                <div class="col-12 col-md-4 col-lg-3" v-for="area in currentAreas" :key="area.id">
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
                <div class="col-12 col-md-4 col-lg-2" v-for="subject in currentSubjects" :key="subject.id">
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
          <button class="btn" @click="removeFilters()">
            Quitar Filtros
          </button>
          <button class="btn" :disabled="currentStep == 1" @click="currentStep -= 1">
            Atras
          </button>
          <button class="btn btn-primary text-white" @click="nextStep()">
            {{ currentStep < 4 ? 'Siguiente' : 'Aplicar' }}
          </button>
        </div>

      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import CardFilter from './CardFilter.vue';
import AppStepperContent from '../../../shared/components/Stepper/AppStepperContent.vue';
import AppStepperStep from '../../../shared/components/Stepper/AppStepperStep.vue';
import AppStepper from '../../../shared/components/Stepper/AppStepper.vue';
import AppLoading from '../../../shared/components/AppLoading.vue';
import {LevelDto} from '../dtos/level.dto';
import {AreaDto} from '../dtos/area.dto';
import {DegreeDto} from '../dtos/degree.dto';
import {SubjectDto} from '../dtos/subject.dto';

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

interface ICatalogueFilters {
  currentStep: number;
  currentLevels: ILevel[];
  currentDegrees: IDegree[],
  currentAreas: IArea[],
  currentSubjects: ISubject[],
}

export default defineComponent({
  name: 'CatalogFilters',
  components: {CardFilter, AppStepperContent, AppStepperStep, AppStepper, AppLoading},
  props: ['levels', 'areas'],
  data(): ICatalogueFilters {
    return {
      currentStep: 1,
      currentLevels: [],
      currentDegrees: [],
      currentAreas: [],
      currentSubjects: [],
    };
  },
  mounted() {
    this.currentLevels = this.levels.map((level: LevelDto) => {
      return {
        ...level,
        isSelected: false,
      };
    });

    this.currentAreas = this.areas.map((area: AreaDto) => {
      return {
        ...area,
        isSelected: false,
      };
    });
  },
  watch: {
    currentStep(value) {
      if (value == 2) {
        this.getDegrees();
      } else if (value == 4) {
        this.getSubjects();
      }
      this.changeFilters();
    },
    /*currentLevels: {
      deep: true,
      handler() {
        this.changeFilters();
      },
    },
    currentDegrees: {
      deep: true,
      handler() {
        this.changeFilters();
      },
    },
    currentAreas: {
      deep: true,
      handler() {
        this.changeFilters();
      },
    },
    currentSubjects: {
      deep: true,
      handler() {
        this.changeFilters();
      },
    },*/
  },
  methods: {
    getDegrees() {
      this.currentDegrees = [];

      let allSelected = true;

      this.currentLevels.forEach((level) => {
        if (level.isSelected) {
          allSelected = false;
        }
      });

      this.currentLevels.forEach((level) => {
        if (level.isSelected || allSelected) {
          this.currentDegrees.push(...level.degrees.map(degree => {
            return {
              ...degree,
              isSelected: false,
            };
          }));
        }
      });
    },
    getSubjects() {
      this.currentSubjects = [];

      let allSelected = true;

      this.currentAreas.forEach((area) => {
        if (area.isSelected) {
          allSelected = false;
        }
      });

      this.currentAreas.forEach((area) => {
        if (area.isSelected || allSelected) {
          this.currentSubjects.push(...area.subjects.map((subject) => {
            return {
              ...subject,
              isSelected: false,
            };
          }));
        }
      });
    },
    nextStep() {
      if (this.currentStep == 4) {
        this.changeFilters();
      } else {
        this.currentStep += 1;
      }

    },
    removeFilters() {
      this.currentLevels = this.currentLevels.map((level) => {
        level.isSelected = false;
        return level;
      });
      this.currentDegrees.forEach((degree) => {
        degree.isSelected = false;
      });
      this.currentAreas.forEach((area) => {
        area.isSelected = false;
      });
      this.currentSubjects.forEach((subject) => {
        subject.isSelected = false;
      });
      this.changeFilters();
    },
    changeFilters() {
      const filters: FiltersType = {
        currentLevels: this.currentLevels.filter((level) => level.isSelected).map(level => level.id),
        currentAreas: this.currentAreas.filter((area) => area.isSelected).map(area => area.id),
        currentDegrees: this.currentDegrees.filter((degree) => degree.isSelected).map(degree => degree.id),
        currentSubjects: this.currentSubjects.filter((subject) => subject.isSelected).map(subject => subject.id),
      };

      this.$emit('changeFilters', filters);
    },
  },
});
</script>

<style scoped>

</style>