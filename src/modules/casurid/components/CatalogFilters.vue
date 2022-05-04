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
import ImageNotAvailable from '../../../assets/images/image-not-available.png';

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
    const {levelsIds, areasIds, degreesIds, subjectsIds} = this.$route.query;

    let imgs = {
      levels: {
        Preescolar: 'https://live.staticflickr.com/65535/52049913633_68282c2f71_b.jpg',
        Primaria: 'https://live.staticflickr.com/65535/52049913408_5e4f0b1674_b.jpg',
        Secundaria: 'https://live.staticflickr.com/65535/52049879461_6ca9bfb22e_b.jpg',
        Media: 'https://live.staticflickr.com/65535/52050374270_68a1ae5602_b.jpg',
      },
      degrees: {
        Primero: 'https://live.staticflickr.com/65535/52049884851_d3d1ecf43f_b.jpg',
        Segundo: 'https://live.staticflickr.com/65535/52048826602_cf2ff82291_b.jpg',
        Tercero: 'https://live.staticflickr.com/65535/52050118814_ee5175902f_b.jpg',
        Cuarto: 'https://live.staticflickr.com/65535/52050118809_b8dd3eecd3_b.jpg',
        Quinto: 'https://live.staticflickr.com/65535/52049884776_ffdc3a523e_b.jpg',
        Sexto: 'https://live.staticflickr.com/65535/52050118789_5035d6488d_b.jpg',
        Septimo: 'https://live.staticflickr.com/65535/52049918663_c36e8d47fe_b.jpg',
        Octavo: 'https://live.staticflickr.com/65535/52049884571_e019339c33_b.jpg',
        Noveno: 'https://live.staticflickr.com/65535/52050379355_c265ca697f_b.jpg',
      },
      subjects: {
        Algebra: 'https://live.staticflickr.com/65535/52048830772_c013e00176_b.jpg',
        Calculo: 'https://live.staticflickr.com/65535/52050383335_bbd1f56d5c_b.jpg',
        Geometria: 'https://live.staticflickr.com/65535/52050383335_bbd1f56d5c_b.jpg',
        Matematicas: 'https://live.staticflickr.com/65535/52048830912_26f51c62d6_b.jpg',
        Informatica: 'https://live.staticflickr.com/65535/52050123114_1185750ffc_b.jpg',
        Ciencias_Naurales: 'https://live.staticflickr.com/65535/52048830832_9582ccae4f_b.jpg',
        Ecologia: 'https://live.staticflickr.com/65535/52050122984_6e6e06666f_b.jpg',
        Artistica: '',
      }
    }

    console.log(this.levels);
    this.currentLevels = this.levels.map((level: LevelDto) => {
      level.thumbnail = imgs.levels[level.name] ?? ImageNotAvailable;

      level.degrees.forEach((degree) => {
        degree.thumbnail = imgs.degrees[degree.name] ?? ImageNotAvailable;

        this.currentDegrees.push({
          ...degree,
          isSelected: degreesIds?.includes(degree.id.toString()) ?? false,
        });
      });

      return {
        ...level,
        isSelected: levelsIds?.includes(level.id.toString()),
      };
    });

    this.currentAreas = this.areas.map((area: AreaDto) => {

      area.subjects.forEach((subject) => {
        let subjName = subject.name;
        subject.thumbnail = imgs.subjects[subjName.replace(' ', '_')] ?? ImageNotAvailable;

        this.currentSubjects.push({
          ...subject,
          isSelected: subjectsIds?.includes(subject.id.toString()) ?? false,
        });
      });

      return {
        ...area,
        isSelected: areasIds?.includes(area.id.toString()),
      };
    });

    this.changeFilters();
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
      const {degreesIds} = this.$route.query;

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
              isSelected: degreesIds?.includes(degree.id.toString()) ?? false,
            };
          }));
        }
      });
    },
    getSubjects() {
      this.currentSubjects = [];
      const {subjectsIds} = this.$route.query;

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
              isSelected: subjectsIds?.includes(subject.id.toString()) ?? false,
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

      this.$router.push({
        path: this.$route.path,
        query: {},
      });

      // this.changeFilters();
    },
    async changeFilters() {
      const filters: FiltersType = {
        currentLevels: this.currentLevels.filter((level) => level.isSelected).map(level => level.id),
        currentAreas: this.currentAreas.filter((area) => area.isSelected).map(area => area.id),
        currentDegrees: this.currentDegrees.filter((degree) => degree.isSelected).map(degree => degree.id),
        currentSubjects: this.currentSubjects.filter((subject) => subject.isSelected).map(subject => subject.id),
      };

      await this.$router.push({
        query: {
          ...this.$route.query,
          levelsIds: filters.currentLevels,
          degreesIds: filters.currentDegrees,
          areasIds: filters.currentAreas,
          subjectsIds: filters.currentSubjects,
        },
      });

      this.$emit('changeFilters', filters);
    },
  },
});
</script>

<style scoped>

</style>