<template>
  <section class="book_section layout_padding">
    <div class="container">
      <div class="heading_container">
        <h2>تماس با ما</h2>
      </div>
      <div class="row">
        <div class="col-md-6">
          <div class="form_container">
            <div
              v-if="errors.length > 0"
              class="alert alert-danger"
              role="alert">
              <ul class="mb-0">
                <li v-for="(error, index) in errors" :key="index">
                  {{ error }}
                </li>
              </ul>
            </div>
            <form @submit.prevent="send">
              <div>
                <input
                  v-model="formData.name"
                  type="text"
                  class="form-control"
                  placeholder="نام و نام خانوادگی" />
              </div>
              <div>
                <input
                  v-model="formData.email"
                  type="email"
                  class="form-control"
                  placeholder="ایمیل" />
              </div>
              <div>
                <input
                  v-model="formData.subject"
                  type="text"
                  class="form-control"
                  placeholder="موضوع پیام" />
              </div>
              <div>
                <textarea
                  v-model="formData.text"
                  rows="10"
                  style="height: 100px"
                  class="form-control"
                  placeholder="متن پیام"></textarea>
              </div>
              <div class="btn_box">
                <button>
                  <div
                    v-if="loading"
                    class="spinner-border spinner-border-sm ms-2"></div>
                  ارسال پیام
                </button>
              </div>
            </form>
          </div>
        </div>
        <div class="col-md-6">
          <div class="map_container">
            <div id="map" style="height: 345px"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useToast } from "vue-toastification";
const alert = useToast();

const { $leaflet } = useNuxtApp();

const loading = ref(false);
const errors = ref([]);
const {
  public: { apiBase },
} = useRuntimeConfig();

const formData = reactive({
  name: "",
  email: "",
  subject: "",
  text: "",
});

async function send() {
  if (
    formData.name === "" ||
    formData.email === "" ||
    formData.subject === "" ||
    formData.text === ""
  ) {
    alert.error("تمام موارد فرم الزامی است");
    return;
  }
  try {
    errors.value = [];
    loading.value = true;
    const data = await $fetch(`${apiBase}/contact-us`, {
      method: "post",
      body: formData,
    });
    alert.success("با موفقیت ارسال شد");
  } catch (error) {
    errors.value = Object.values(error.data.message).flat();

    console.log(errors.value);
  } finally {
    loading.value = false;
  }
}

//map
onMounted(() => {
  var map = $leaflet.map("map").setView([35.700105, 51.400394], 14);
  var tiles = $leaflet
    .tileLayer(
      "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw",
      {
        maxZoom: 18,
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
          'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: "mapbox/streets-v11",
        tileSize: 512,
        zoomOffset: -1,
      }
    )
    .addTo(map);
  var marker = $leaflet
    .marker([35.700105, 51.400394], {
      icon: $leaflet.icon({
        popupAnchor: [12, 6],
        iconUrl: "./images/map/marker-icon.png",
        shadowUrl: "./images/map/marker-shadow.png",
      }),
    })
    .addTo(map)
    .bindPopup("<b>Hello world!</b><br />I am a popup.")
    .openPopup();
});
</script>
