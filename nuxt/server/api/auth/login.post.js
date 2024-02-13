export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const {public: { apiBase }} = useRuntimeConfig();


  try {
    const data = await $fetch(`${apiBase}/auth/login`, {
      method: "POST",
      body: body,
      headers: {
        Accept: "application/json",
      },
    });
    console.log(data)
    return "login success";
;
    
  } catch (error) {
    console.log(error);
  }
});
