<template>
  <section class="food_section layout_padding">
    <div class="container">
      <div class="row">
        <div class="col-sm-12 col-lg-3">
          <div>
            <label class="form-label">جستجو</label>
            <div class="input-group mb-3">
              <input
                v-model="search"
                @input="checkSearchBox"
                type="text"
                class="form-control"
                placeholder="نام محصول ..."
                aria-label="Recipient's username"
                aria-describedby="basic-addon2" />
              <button
                @click="search !== '' && handelFilter({ search: search })"
                class="input-group-text"
                id="basic-addon2">
                <i class="bi bi-search"></i>
              </button>
            </div>
          </div>
          <hr />
          <div class="filter-list">
            <div class="form-label">دسته بندی</div>
            <ul>
              <li
                class="my-2 cursor-pointer"
                :class="{
                  'filter-list-active': !route.query.hasOwnProperty('category'),
                }"
                @click="handelFilter({})">
                همه
              </li>
              <li
                class="my-2 cursor-pointer"
                :class="{
                  'filter-list-active':
                    route.query.hasOwnProperty('category') &&
                    route.query.category == category.id,
                }"
                v-for="category in categories.data"
                :key="category.id"
                @click="handelFilter({ category: category.id })">
                {{ category.name }}
              </li>
            </ul>
          </div>
          <hr />
          <div class="checkedLabel">
            <label class="form-label">مرتب سازی</label>
            <div class="form-check my-2">
              <input
                @click="handelFilter({ sortBy: 'max' })"
                class="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault1"
                :checked="
                  route.query.hasOwnProperty('sortBy') &&
                  route.query.sortBy == 'max'
                " />
              <label
                class="form-check-label cursor-pointer"
                :class="{
                  'filter-list-active':
                    route.query.hasOwnProperty('sortBy') &&
                    route.query.sortBy == 'max',
                }"
                for="flexRadioDefault1">
                بیشترین قیمت
              </label>
            </div>
            <div class="form-check my-2">
              <input
                @click="handelFilter({ sortBy: 'min' })"
                class="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault2"
                :checked="
                  route.query.hasOwnProperty('sortBy') &&
                  route.query.sortBy == 'min'
                " />
              <label
                class="form-check-label cursor-pointer"
                :class="{
                  'filter-list-active':
                    route.query.hasOwnProperty('sortBy') &&
                    route.query.sortBy == 'min',
                }"
                for="flexRadioDefault2">
                کمترین قیمت
              </label>
            </div>
            <div class="form-check my-2">
              <input
                @click="handelFilter({ sortBy: 'bestseller' })"
                class="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault3"
                :checked="
                  route.query.hasOwnProperty('sortBy') &&
                  route.query.sortBy == 'bestseller'
                " />
              <label
                class="form-check-label cursor-pointer"
                :class="{
                  'filter-list-active':
                    route.query.hasOwnProperty('sortBy') &&
                    route.query.sortBy == 'bestseller',
                }"
                for="flexRadioDefault3">
                پرفروش ترین
              </label>
            </div>
            <div class="form-check my-2">
              <input
                @click="handelFilter({ sortBy: 'sale' })"
                class="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault4"
                :checked="
                  route.query.hasOwnProperty('sortBy') &&
                  route.query.sortBy == 'sale'
                " />
              <label
                class="form-check-label cursor-pointer"
                :class="{
                  'filter-list-active':
                    route.query.hasOwnProperty('sortBy') &&
                    route.query.sortBy == 'sale',
                }"
                for="flexRadioDefault4">
                با تخفیف
              </label>
            </div>
          </div>
        </div>
        <div class="col-sm-12 col-lg-9">
          <div
            v-if="pending"
            class="d-flex align-items-center justify-content-center h-100">
            <div class="spinner-border"></div>
          </div>
          <template v-else>
            <div
              v-if="product.data.products.length == 0"
              class="d-flex align-items-center justify-content-center h-100">
              <h5>محصولی یافت نشد!</h5>
            </div>
            <div v-else>
              <div class="row gx-3">
                <div
                  class="col-sm-6 col-lg-4"
                  v-for="(product, index) in product.data.products"
                  :key="index">
                  <ProductCard :product="product" />
                </div>
              </div>
              <nav class="d-flex justify-content-center mt-5">
                <ul class="pagination">
                  <li
                    class="page-item"
                    :class="{ active: pagination.active }"
                    v-for="(pagination, index) in product.data.meta.links.slice(
                      1,
                      -1
                    )"
                    :key="index">
                    <button
                      class="page-link"
                      @click="handelFilter({ page: pagination.label })">
                      {{ pagination.label }}
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </template>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { watch } from "vue";
import { Tabs, Tab } from "vue3-tabs-component";

const router = useRouter();
const route = useRoute();
const queryFetchObject = ref({});
queryFetchObject.value = route.query;
const search = ref("");

const {
  public: { apiBase },
} = useRuntimeConfig();

const { data: categories } = await useFetch(`${apiBase}/categories`);

const {
  data: product,
  refresh,
  pending,
} = await useFetch(() => `${apiBase}/menu`, {
  query: queryFetchObject,
});

function handelFilter(param) {
  queryFetchObject.value = { ...route.query, ...param };

  if (!param.hasOwnProperty("page")) {
    delete queryFetchObject.value.page;
  }

  if (Object.keys(param).length == 0) {
    queryFetchObject.value = {};
    if (search.value) {
      queryFetchObject.value.search = search;
    }
  }

  router.push({
    path: "/menu",
    query: queryFetchObject.value,
  });
  refresh();
}

// watch(()=>route,()=>{
//   console.log('changed route');

// })

watch(
  () => route.query,
  () => {
    if (Object.keys(route.query).length == 0) {
      queryFetchObject.value = {};
      refresh();
    }
  }
);
function checkSearchBox(element) {
  if (element.target.value == "") {
    if (queryFetchObject.value.hasOwnProperty("search")) {
      delete queryFetchObject.value.search;
    }
    router.push({
      path: "/menu",
      query: queryFetchObject.value,
    });
  }
}
</script>
