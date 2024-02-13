import bootstrap from "bootstrap/dist/js/bootstrap.bundle";

export default defineNuxtPlugin((nuxt) => {
  return nuxt.provide("bootstrap", bootstrap);
});
