"use client";

import Image from "next/image";
import findBlood from "@/assets/FindBlood/findBlood.png";
import { useForm } from "react-hook-form";

export default function RecipientForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // Handle form submission here
  };

  return (
    <div className="bg-white flex items-center justify-center mt-10 p-4">
      <div className="w-full max-w-4xl flex flex-col md:flex-row rounded-xl overflow-hidden shadow-lg p-4">
        {/* Left side image */}
        <div className="w-full md:w-1/2 relative aspect-square md:aspect-auto">
          <Image
            src={findBlood}
            alt="Recipient form illustration"
            layout="fill"
            objectFit="cover"
          />
        </div>

        {/* Right side form */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-xl font-semibold mb-8">Recipient Details</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Blood Group Select */}
            <div className="space-y-2">
              <select
                {...register("bloodGroup", {
                  required: "Blood Group is required",
                })}
                className="w-full p-3 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-red-500 appearance-none"
                defaultValue=""
              >
                <option value="" disabled>
                  Blood Group
                </option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </select>
              {errors.bloodGroup && (
                <p className="text-red-500 text-sm">
                  {errors.bloodGroup.message}
                </p>
              )}
            </div>

            {/* Plasma Toggle */}
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="plasma"
                {...register("plasma")}
                className="w-4 h-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
              />
              <label
                htmlFor="plasma"
                className="text-sm font-medium text-gray-700"
              >
                Plasma Required
              </label>
            </div>

            {/* Division Select */}
            <div className="space-y-2">
              <select
                {...register("division", { required: "Division is required" })}
                className="w-full p-3 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-red-500 appearance-none"
                defaultValue=""
              >
                <option value="" disabled>
                  Division
                </option>
                <option value="division1">Division 1</option>
                <option value="division2">Division 2</option>
              </select>
              {errors.division && (
                <p className="text-red-500 text-sm">
                  {errors.division.message}
                </p>
              )}
            </div>

            {/* District Select */}
            <div className="space-y-2">
              <select
                {...register("district", { required: "District is required" })}
                className="w-full p-3 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-red-500 appearance-none"
                defaultValue=""
              >
                <option value="" disabled>
                  District
                </option>
                <option value="district1">District 1</option>
                <option value="district2">District 2</option>
              </select>
              {errors.district && (
                <p className="text-red-500 text-sm">
                  {errors.district.message}
                </p>
              )}
            </div>

            {/* Upazilas Select */}
            <div className="space-y-2">
              <select
                {...register("upazila", { required: "Upazila is required" })}
                className="w-full p-3 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-red-500 appearance-none"
                defaultValue=""
              >
                <option value="" disabled>
                  Upazila
                </option>
                <option value="upazila1">Upazila 1</option>
                <option value="upazila2">Upazila 2</option>
                <option value="upazila3">Upazila 3</option>
              </select>
              {errors.upazila && (
                <p className="text-red-500 text-sm">{errors.upazila.message}</p>
              )}
            </div>

            {/* Proceed Button */}
            <div className="flex items-end justify-end">
              <button
                type="submit"
                className="bg-white hover:bg-red-600 text-black hover:text-white py-2 px-4 rounded-lg border border-black hover:border-red-600 transition-colors flex items-center justify-center gap-2"
              >
                Proceed
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
