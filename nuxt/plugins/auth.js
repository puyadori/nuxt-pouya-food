export default defineNuxtPlugin(async (nuxtApp) => {
  const { authUser } = useAuth();
  try {
    const user = await $fetch("/api/auth/me", {
      headers: useRequestHeaders(["cookie"]),
    });
    authUser.value = user;
  } catch (error) {
    authUser.value = null;
  }
});
