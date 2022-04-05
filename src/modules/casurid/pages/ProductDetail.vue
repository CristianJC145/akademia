<template>
  <div v-if="loading">
    <AppLoading></AppLoading>
  </div>
  <div v-else class="row gy-4">
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
            <button class="btn btn-primary fa-pull-right text-white">
              Ver indice
            </button>
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

const getProductCatalogueBySlugService = new GetProductCatalogueBySlugService();

interface IProductDetail {
  slug: string,
  loading: boolean,
  product: ProductCatalogueDto | null,
  contents: ProductContentDto[],
}

export default defineComponent({
  name: 'ProductDetail',
  components: {AppLoading, AppIcon},
  data(): IProductDetail {
    return {
      slug: '',
      loading: true,
      product: null,
      contents: [],
    };
  },
  async mounted() {
    this.loading = true;
    this.slug = this.$route.params.slug.toString();

    try {
      const {product, contents} = await getProductCatalogueBySlugService.run(this.slug);
      console.log(contents);
      this.product = product;
      this.contents = contents;
    } catch (e) {
    }

    this.loading = false;
  },
});
</script>

<style scoped>
.card img {
  max-height: 450px;
  object-fit: contain;
}
</style>