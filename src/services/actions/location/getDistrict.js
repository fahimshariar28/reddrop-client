"use server";

export const getDistrict = async (divisionId) => {
  try {
    const response = await fetch(
      ` ${process.env.BACKEND_API_URL}/api/location/${divisionId}/districts`
    );

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};
