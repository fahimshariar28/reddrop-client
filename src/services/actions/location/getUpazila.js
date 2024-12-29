"use server";

export const getUpazila = async (districtId) => {
  try {
    const response = await fetch(
      ` ${process.env.BACKEND_API_URL}/api/location/${districtId}/upazilas`
    );

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};
