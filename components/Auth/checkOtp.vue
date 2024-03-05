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
        <div class="mb-3">
          <label class="form-label">کد ورود</label>
          <input
            v-model="otp"
            type="text"
            class="form-control"
            id="cellphone" />
        </div>
        <div class="d-flex align-items justify-content-between">
          <button
            @click="checkOtp"
            type="submit"
            class="btn btn-primary btn-auth">
            <div
              v-if="loading"
              class="spinner-border spinner-border-sm ms-2"></div>
            تایید
          </button>
          <AuthResendOtp @resend-otp-errors="(err) => (errors = err)" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { authUser } = useAuth();
import { useToast } from "vue-toastification";

const toast = useToast();
const errors = ref([]);
const otp = ref("");
const loading = ref(false);

async function checkOtp() {
  if (otp.value == null) {
    toast.error("کد تایید الزامی است");
    return;
  }

  const regex = /^[0-9]{6}$/;
  if (!regex.test(otp.value)) {
    toast.error("فرمت کد تایید صحیح نیست");
    return;
  }

  try {
    loading.value = true;
    const data = await $fetch("/api/auth/checkOtp", {
      method: "POST",
      body: {
        otp: otp.value,
      },
    });
    toast.success("با موفقیت وارد شدید");
    authUser.value = data;
    return navigateTo("/");
  } catch (error) {
    errors.value = Object.values(error.data.data.message).flat();
  } finally {
    loading.value = false;
  }
}
</script>
