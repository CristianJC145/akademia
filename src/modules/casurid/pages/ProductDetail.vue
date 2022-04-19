<template>
  <AppBreadCrumbs :routes="routes"></AppBreadCrumbs>
  <div v-if="loading">
    <AppLoading></AppLoading>
  </div>
  <div v-else-if="product" class="row gy-4">
    <div class="col-12 col-sm-12 col-md-6">
      <h1 class="h5">Detalle</h1>

      <div class="card">
        <img :src="product.thumbnail" :alt="product.title">
        <div class="card-body d-flex flex-column gap-2">
          <div class="d-flex flex-column">
            <h1 class="h5 lead">{{ product.title }}</h1>
            <p>{{ product.description }}</p>

            <span>{{ product.subjectName }} - {{ product.DegreeName }}</span>
            <div class="d-flex justify-content-between">
              <span>
                Duración: <span class="badge bg-secondary">{{ product.validityPeriod }} meses</span>
              </span>
              <span>
                $ {{ product.defaultUnitValue }}
              </span>
            </div>
          </div>

          <div class="d-flex justify-content-end">
            <button class="btn">
              <AppIcon icon="shopping-cart"></AppIcon>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="col-12 col-sm-12 col-md-6">
      <h1 class="h5">Contenidos</h1>

      <div class="d-flex flex-column gap-2">
        <div class="card bg-secondary bg-opacity-25" v-for="content in contents">
          <div class="card-body">
            <h2 class="h6">{{ content.title }}</h2>
            <p>{{ content.description }}</p>
            <router-link v-if="content.index" :to="content.index" class="btn btn-primary fa-pull-right text-white">
              Ver indice
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {GetProductCatalogueBySlugService} from '../services/getProductCatalogueBySlug.service';
import {ProductCatalogueDto} from '../dtos/productCatalogue.dto';
import {ProductContentDto} from '../dtos/productContent.dto';
import AppLoading from '../../../shared/components/AppLoading.vue';
import AppIcon from '../../../shared/components/AppIcon.vue';
import AppBreadCrumbs from '../../../shared/components/AppBreadCrumbs.vue';
import {BreadCrumbsType} from '../../../shared/types/breadCrumbs.type';

const getProductCatalogueBySlugService = new GetProductCatalogueBySlugService();

interface IProductDetail {
  slug: string,
  loading: boolean,
  product: ProductCatalogueDto | null,
  contents: ProductContentDto[],
  routes: BreadCrumbsType[],
}

export default defineComponent({
  name: 'ProductDetail',
  components: {AppBreadCrumbs, AppLoading, AppIcon},
  data(): IProductDetail {
    return {
      slug: '',
      loading: true,
      product: null,
      contents: [],
      routes: [
        {
          name: 'Inicio',
          url: '/',
        },
      ],
    };
  },
  async mounted() {
    this.loading = true;
    this.slug = this.$route.params.slug.toString();

    try {
      const {product, contents} = await getProductCatalogueBySlugService.run(this.slug);

      this.product = product;
      this.contents = contents;

      this.routes.push({
        name: this.product.title,
      });
    } catch (e) {
    }

    this.loading = false;
  },
});
</script>

<style scoped>
.card img {
  max-height: 400px;
  object-fit: contain;
}
</style>