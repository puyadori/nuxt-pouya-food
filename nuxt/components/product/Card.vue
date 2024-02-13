<template>
  <div class="box">
    <div>
      <div class="img-box">
        <img  src="/images/preloader.png" v-img="props.product.primary_image" alt=""/>
        <!-- <img :src="props.product.primary_image" alt="" /> -->
      </div>
      <div class="detail-box d-flex flex-column justify-content-between">
        <h5>{{ props.product.name }}</h5>
        <p>
          {{ props.product.description }}
        </p>
        <div class="options">
          <h6 v-if="props.product.is_sale">
            <del>{{ numberFormat(props.product.price) }}</del>
            {{ numberFormat(props.product.sale_price) }}
            <span>تومان</span>
          </h6>
          <h6 v-else>
            {{ numberFormat(props.product.price) }}
            <span>تومان</span>
          </h6>
          <a href="">
            <i class="bi bi-cart-fill text-white fs-5"></i>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(["product"]);
</script>
