<template>
  <ClientOnly>
    <div class="d-flex align-items-center">
      <div class="mt-3 me-3" v-if="!showBtn">
        <vue-countdown
          :time="20 * 1000"
          v-slot="{ minutes, seconds }"
          :transform="transformSlotProps"
          @end="showBtn = true">
          {{ seconds }} : {{ minutes }}
        </vue-countdown>
      </div>
      <button loading="loading" @click="resend" v-else class="btn btn-dark">
        ارسال دوباره
      </button>
    </div>
  </ClientOnly>
</template>

<script setup>
import VueCountdown from "@chenfengyuan/vue-countdown";
const toast = useToast();
import { useToast } from "vue-toastification";
const loading = ref(false);
const emit = defineEmits(["resendOtpErrors"]);
const showBtn = ref(false);
function transformSlotProps(props) {
  const formattedProps = {};

  Object.entries(props).forEach(([key, value]) => {
    formattedProps[key] = value < 10 ? `0${value}` : String(value);
  });

  return formattedProps;
}
async function resend() {
  try {
    loading.value = true;
    $fetch("/api/auth/resendOtp", {
      method: "POST",
    });
    toast.success("کد جدید ارسال شد");
  } catch (error) {
    emit("resendOtpErrors", Object.values(error.data.data.message).flat());
  } finally {
    loading.value = false;
  }
}
</script>
