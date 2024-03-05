export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const {
    public: { apiBase },
  } = useRuntimeConfig();

  const loginToken = getCookie(event, "Login-token");

  try {
    const data = await $fetch(`${apiBase}/auth/check-otp`, {
      method: "POST",
      body: {
        ...body,
        login_token: loginToken,
      },
      headers: {
        "Accept": "application/json",
      },
    });

    setCookie(event, "token", data.data.token, {
      httpOnly: true,
      secure: true,
      maxAge: 60 * 60 * 24 * 7, //1 week,
      path: "/",
    });
    //pak kardane token ghabli
    setCookie(event, "Login-token", "", {
      httpOnly: true,
      secure: true,
      maxAge: new Date(0), //tarikhe az ghable,
      path: "/",
    });
    
    return data.data.user;
  } catch (error) {
  
    
    return error;
  }
});
