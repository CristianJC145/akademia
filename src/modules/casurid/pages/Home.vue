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
      <CatalogFilters
          :levels="levels"
          :areas="areas"
          :loading="loadingFilters"
          v-if="showFilters"></CatalogFilters>
    </Transition>

    <div class="col-12 mt-4">
      <div class="card">
        <div class="card-body row gy-2">
          <div class="col-12 col-sm-6 col-md-4 col-lg-3" v-for="product in productsCatalogue" :key="product.id">
            <div class="card">
              <img class="card-img-top img-product" :src="product.thumbnail" :alt="product.title">
              <div class="card-body d-flex flex-column">
                <h1 class="h5 lead">{{ product.title }}</h1>
                <span>{{ product.subjectName }}</span>
                <span>{{ product.DegreeName }}</span>
              </div>
            </div>
          </div>
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
import {SearchProductsCatalogueService} from '../services/searchProductsCatalogue.service';
import {ProductCatalogueDto} from '../dtos/productCatalogue.dto';
import CatalogFilters from '../components/CatalogFilters.vue';

const catalogueRelatedDataService = new CatalogueRelatedDataService();
const searchProductsCatalogueService = new SearchProductsCatalogueService();

interface IHome {
  showFilters: Boolean,
  levels: LevelDto[],
  areas: AreaDto[],
  loadingFilters: boolean,
  productsCatalogue: ProductCatalogueDto[];
}

export default defineComponent({
  name: 'HomePage',
  components: {CatalogFilters, NavBar, AppIcon},
  data(): IHome {
    return {
      showFilters: false,
      levels: [],
      areas: [],
      loadingFilters: false,
      productsCatalogue: [],
    };
  },
  async mounted() {
    this.loadingFilters = true;
    const relatedData = await catalogueRelatedDataService.run();

    this.levels = relatedData.levels;

    this.areas = relatedData.areas;

    await this.searchProducts();

    this.loadingFilters = false;
  },
  methods: {
    async searchProducts() {
      /*const response = await searchProductsCatalogueService.run({
        page: 1,
        perPage: 10,
        levelsIds: this.levels.map((level) => level.id),
        degreesIds: this.degrees.map((degree) => degree.id),
        areasIds: this.areas.map((area) => area.id),
        subjectsIds: this.subjects.map((subject) => subject.id),
      });

      this.productsCatalogue = response.data;*/
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

.img-product {
  max-height: 250px;
  object-fit: contain;
}
</style>