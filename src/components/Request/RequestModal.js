"use client";

import { useForm } from "react-hook-form";

export default function RequestModal({ isOpen, onClose, profileName }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // Handle form submission here
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white py-10 p-6 rounded-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">
          Request Donation from {profileName}
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label
              htmlFor="hospitalName"
              className="block text-sm font-medium text-gray-700"
            >
              Hospital/Clinic Name
            </label>
            <input
              {...register("hospitalName", {
                required: "Hospital/Clinic Name is required",
              })}
              type="text"
              id="hospitalName"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            {errors.hospitalName && (
              <span className="text-red-500 text-sm">
                {errors.hospitalName.message}
              </span>
            )}
          </div>
          <div>
            <label
              htmlFor="patientProblem"
              className="block text-sm font-medium text-gray-700"
            >
              Patient Problem
            </label>
            <textarea
              {...register("patientProblem", {
                required: "Patient Problem is required",
              })}
              id="patientProblem"
              rows="3"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            ></textarea>
            {errors.patientProblem && (
              <span className="text-red-500 text-sm">
                {errors.patientProblem.message}
              </span>
            )}
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Submit Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
