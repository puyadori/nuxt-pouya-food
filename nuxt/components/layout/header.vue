<template>
  <header style="background-color: black" class="header_section">
    <div class="container">
      <nav class="navbar navbar-expand-lg custom_nav-container">
        <NuxtLink class="navbar-brand" to="/">
          <span> POUYA FOOD </span>
        </NuxtLink>

        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mx-auto">
            <li class="nav-item" :class="{ active: $route.path === '/' }">
              <NuxtLink class="nav-link" to="/">صفحه اصلی</NuxtLink>
            </li>
            <li class="nav-item">
              <NuxtLink class="nav-link" to="/menu">منو</NuxtLink>
            </li>
            <li
              class="nav-item"
              :class="{ active: $route.path === '/aboutUs' }">
              <NuxtLink class="nav-link" to="/aboutUs">درباره ما</NuxtLink>
            </li>
            <li
              class="nav-item"
              :class="{ active: $route.path === '/contactUs' }">
              <NuxtLink class="nav-link" to="/contactUs">تماس باما</NuxtLink>
            </li>
          </ul>
          <div class="user_option">
            <a class="cart_link position-relative" href="cart.html">
              <i class="bi bi-cart-fill text-white fs-5"></i>
              <span
                class="position-absolute top-0 translate-middle badge rounded-pill">
                3
              </span>
            </a>
            <NuxtLink to="auth/login" class="btn-auth"> ورود </NuxtLink>
          </div>
        </div>
      </nav>
    </div>
  </header>
</template>
