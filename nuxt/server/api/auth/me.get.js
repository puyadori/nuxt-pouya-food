export default defineEventHandler(async (event) => {
  const {
    public: { apiBase },
  } = useRuntimeConfig();

  const token = getCookie(event, "token");

  try {
    const data = await $fetch(`${apiBase}/auth/me`, {
      method: "POST",

      headers: {
        "Accept": "application/json",
        "authorization": `Bearer ${token}`,
      },
    });
    return data.data;

  } catch (error) {
    if (error.statusCode == 401) {
      //pak kardane token ghabli
      setCookie(event, "token", "", {
        httpOnly: true,
        secure: true,
        maxAge: new Date(0), //tarikhe az ghable,
        path: "/",
      });
    }
    return error;
  }
});
