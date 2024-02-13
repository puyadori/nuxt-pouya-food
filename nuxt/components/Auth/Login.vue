<template>
  <div class="card">
    <div class="card-body">
      <div v-if="errors.length > 0" class="alert alert-danger" role="alert">
        <ul class="mb-0">
          <li v-for="(error, index) in errors" :key="index">
            {{ error }}
          </li>
        </ul>
      </div>
      <div class="form_container">
        <form @submit.prevent="login">
          <div class="mb-3">
            <label class="form-label">شماره موبایل</label>
            <input
              v-model="cellphone"
              type="text"
              class="form-control"
              id="cellphone" />
          </div>
          <button type="submit" class="btn btn-primary btn-auth">
            <div
              v-if="loading"
              class="spinner-border spinner-border-sm ms-2"></div>
            ورود
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(['showCheckOtpForm'])
import { useToast } from "vue-toastification";
const toast = useToast();
const errors = ref([]);
const cellphone = ref("");
const loading = ref(false);

async function login() {
  const regex = /^(\+98|0)?9\d{9}$/;
  if (cellphone.value == "" || !regex.test(cellphone.value)) {
    toast.error("فرمت شماره موبایل معتبر نمی باشد");
    return;
  }
  try {
    loading.value = true;
    const data = await $fetch("/api/auth/login", {
      method: "POST",
      body: {
        cellphone: cellphone.value,
      },
     
    });
    toast.success('کد ورود برای شما ارسال شد')
    emit('showCheckOtpForm')
  } catch (error) {
    errors.value = Object.values(error.data.data.message).flat();
  } finally {
    loading.value = false;
  }
}
</script>
