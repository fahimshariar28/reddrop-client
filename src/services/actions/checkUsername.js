"use server";

export const checkUsername = async (username) => {
  try {
    const response = await fetch(
      ` ${process.env.BACKEND_API_URL}/api/user/check-username/${username}`
    );
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};
