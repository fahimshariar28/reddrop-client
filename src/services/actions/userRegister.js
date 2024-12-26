"use server";

export const userRegister = async (data) => {
  try {
    const response = await fetch(` ${process.env.BACKEND_API_URL}/api/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      cache: "no-store",
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};
