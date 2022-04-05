<template>
  <div class="row">
    <div class="col-12 col-md-8 col-lg-6 offset-md-2 offset-lg-3">
      <div class="input-group mb-3">
        <span class="input-group-text" id="basic-addon1">
          <AppIcon icon="search"></AppIcon>
        </span>
        <input type="text" placeholder="Buscar un contenido..." class="form-control" v-model="searchValue">
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
      <div v-show="showFilters">
        <AppLoading v-if="loadingFilters"></AppLoading>
        <CatalogFilters
            v-else
            :levels="levels"
            :areas="areas"
            @changeFilters="changeFilters"></CatalogFilters>
      </div>
    </Transition>

    <div class="col-12 mt-4">
      <div class="card">
        <div class="card-body row gy-2">
          <AppLoading v-if="loadingProducts"></AppLoading>
          <template v-else>
            <div class="col-12 col-sm-6 col-md-4 col-lg-3" v-for="product in productsCatalogue" :key="product.id">
              <div class="card">
                <img class="card-img-top img-product" :src="product.thumbnail" :alt="product.title">
                <div class="card-body d-flex flex-column gap-2">
                  <div class="d-flex flex-column">
                    <h1 class="h5 lead">{{ product.title }}</h1>
                    <span>{{ product.subjectName }}</span>
                    <span>{{ product.DegreeName }}</span>
                    <span>Duración: <span class="badge bg-secondary">{{ product.validityPeriod }} meses</span></span>
                  </div>

                  <div class="d-flex justify-content-between">
                    <button class="btn">
                      <AppIcon icon="shopping-cart"></AppIcon>
                    </button>
                    <router-link :to="`/${product.id}`" class="btn btn-primary text-white">
                      Ver detalle
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
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
import {SearchProductsCatalogueService} from '../services/searchProductsCatalogue.service';
import {ProductCatalogueDto} from '../dtos/productCatalogue.dto';
import CatalogFilters from '../components/CatalogFilters.vue';
import AppLoading from '../../../shared/components/AppLoading.vue';
import {debounce} from 'ts-debounce';

const catalogueRelatedDataService = new CatalogueRelatedDataService();
const searchProductsCatalogueService = new SearchProductsCatalogueService();

interface IHome extends FiltersType {
  showFilters: Boolean,
  levels: LevelDto[],
  areas: AreaDto[],
  loadingFilters: boolean;
  productsCatalogue: ProductCatalogueDto[];
  searchValue: string;
  loadingProducts: boolean;
  page: number;
  perPage: number;
}

export default defineComponent({
  name: 'HomePage',
  components: {CatalogFilters, NavBar, AppIcon, AppLoading},
  data(): IHome {
    return {
      showFilters: false,
      levels: [],
      areas: [],
      loadingFilters: false,
      loadingProducts: true,
      productsCatalogue: [],
      currentLevels: [],
      currentDegrees: [],
      currentAreas: [],
      currentSubjects: [],
      searchValue: '',
      page: 1,
      perPage: 20,
    };
  },
  watch: {
    searchValue() {
      this.searchProducts();
    },
  },
  async mounted() {
    this.loadingFilters = true;
    const relatedData = await catalogueRelatedDataService.run();

    this.levels = relatedData.levels;

    this.areas = relatedData.areas;

    // this.changeFilters = debounce(this.changeFilters, 800);
    this.searchProducts = debounce(this.searchProducts, 600);

    await this.searchProducts();

    this.loadingFilters = false;
  },
  methods: {
    changeFilters(filters: FiltersType) {
      this.currentLevels = filters.currentLevels;
      this.currentDegrees = filters.currentDegrees;
      this.currentAreas = filters.currentAreas;
      this.currentSubjects = filters.currentSubjects;

      this.searchProducts();
    },
    async searchProducts() {
      this.loadingProducts = true;

      const response = await searchProductsCatalogueService.run({
        page: this.page,
        perPage: this.perPage,
        levelsIds: this.currentLevels,
        degreesIds: this.currentDegrees,
        areasIds: this.currentAreas,
        subjectsIds: this.currentSubjects,
        search: this.searchValue,
      });

      this.productsCatalogue = response.data;

      this.loadingProducts = false;
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