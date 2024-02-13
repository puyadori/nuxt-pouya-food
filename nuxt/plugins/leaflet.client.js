import leaflet from "leaflet/dist/leaflet.js";
import "leaflet/dist/leaflet.css"

export default defineNuxtPlugin((nuxt) => {
  return nuxt.provide("leaflet", leaflet);
});
