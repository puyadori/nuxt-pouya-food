export default defineNuxtRouteMiddleware(() => {
  const { authUser } = useAuth();

  if (!authUser.value) {
    return navigateTo("/auth/login");
  }
});
