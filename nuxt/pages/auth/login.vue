<template>
  <!-- login section -->
  <section class="auth_section book_section">
    <div class="container">
      <div class="row mt-5">
        <div class="col-md-4 offset-md-4">
          <div class="card">
            <div class="card-body">
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
                    ورود
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- end login section -->
</template>

<script setup>
import { useToast } from "vue-toastification";
const toast = useToast();

const cellphone = ref("");

async function login() {
  const regex = /^(\+98|0)?9\d{9}$/;
  if (cellphone.value == "" || !regex.test(cellphone.value)) {
    toast.error("فرمت شماره موبایل معتبر نمی باشد");
    return;
  }
  try {
    const data = await $fetch('/api/auth/login' , {
        method: 'POST',
        body:{
            cellphone : cellphone.value
        }
    });
    console.log(data);
    
  } catch (error) {
    console.log(error);
  }
}
</script>
