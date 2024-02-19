export default defineEventHandler(async (event) => {
  const {
    public: { apiBase },
  } = useRuntimeConfig();
  const loginToken = getCookie(event, "Login-token");
  try {
    const data = await $fetch(`${apiBase}/auth/resend-otp`, {
      method: "POST",
      body: { login_token: loginToken },
      headers: {
        Accept: "application/json",
      },
    });
    setCookie(event, "Login-token", data.data.login_token, {
      httpOnly: true,
      secure: true,
      maxAge: 60 * 60 * 24 * 7, //1 week,
      path: "/",
    });

    return "otp Resend";
  } catch (error) {
    return error;
  }
});

