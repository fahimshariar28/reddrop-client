"use server";

export const checkEmail = async (email) => {
  try {
    const response = await fetch(
      ` ${process.env.BACKEND_API_URL}/api/user/check-email/${email}`
    );
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};
