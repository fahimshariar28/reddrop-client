"use server";

export const getDivision = async () => {
  try {
    const response = await fetch(
      ` ${process.env.BACKEND_API_URL}/api/location/divisions`
    );

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};
