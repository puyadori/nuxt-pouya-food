<template>
  <section class="food_section layout_padding-bottom">
    <div class="container">
      <div class="heading_container heading_center">
        <h2>منو محصولات</h2>
      </div>

      <div>
        <Tabs
          :options="{ disableScrollBehavior: true }"
          nav-class="filters_menu"
          nav-item-active-class="active">
          <Tab
            v-for="(tabList, index) in products.data.tabList"
            :key="index"
            :name="tabList">
            <div class="filters_content">
              <div class="row grid">
                <div
                  class="col-sm-6 col-lg-4"
                  v-for="product in products.data.tabPanel[index]"
                  :key="product.id">
                  <productCard :product="product" />
                </div>
              </div>
            </div>
          </Tab>
        </Tabs>
      </div>

      <div class="btn-box">
        <a href=""> مشاهده بیشتر </a>
      </div>
    </div>
  </section>
</template>
<script setup>
import { Tabs, Tab } from "vue3-tabs-component";

const {
  public: { apiBase },
} = useRuntimeConfig();

const { data: products, error } = await useFetch(
  `${apiBase}/products/products-tabs`
);
</script>
