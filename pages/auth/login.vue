<template>
  <!-- login section -->
  <section class="auth_section book_section">
    <div class="container">
      <div class="row mt-5">
        <div class="col-md-4 offset-md-4">
          <AuthLogin
            v-if="!showOtpForm"
            @show-check-otp-form="() => (showOtpForm = true)" />
          <AuthCheckOtp v-else />
        </div>
      </div>
    </div>
  </section>
  <!-- end login section -->
</template>

<script setup>
definePageMeta({ middleware: "auth-middle" });
const showOtpForm = ref(false);
</script>
