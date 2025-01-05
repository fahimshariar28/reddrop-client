"use client";

import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { getUserInfo } from "@/services/actions/authServices";
import { useCreateRequestMutation } from "@/redux/api/requestApi";
import toast from "react-hot-toast";

export default function RequestModal({ isOpen, onClose, profileName, donorId, bloodGroup }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [createRequest] = useCreateRequestMutation();

  const user = getUserInfo();

  const [minTime, setMinTime] = useState('');

  useEffect(() => {
    const now = new Date();
    setMinTime(now.toISOString().slice(0, 19));
  }, []);

  const onSubmit = async (data) => {
    const { time, ...otherData } = data;
    const formattedTime = new Date(time).toISOString();
    data = {
      ...otherData,
      time: formattedTime,
      donorId,
      bloodGroup,
      receiverId: user.id,
    };
    console.log(data);
    const res = await createRequest(JSON.stringify(data))
    if (res.data._id) {
      toast.success("Request submitted successfully");
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-red-50 py-10 p-6 rounded-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">
          Request Donation from {profileName}
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label
              htmlFor="hospital"
              className="block text-sm font-medium text-gray-700"
            >
              Hospital/Clinic Name
            </label>
            <input
              {...register("hospital", {
                required: "Hospital/Clinic Name is required",
              })}
              type="text"
              id="hospital"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            {errors.hospital && (
              <span className="text-red-500 text-sm">
                {errors.hospital.message}
              </span>
            )}
          </div>
          <div>
            <label
              htmlFor="time"
              className="block text-sm font-medium text-gray-700"
            >
              Date and Time
            </label>
            <input
              {...register("time", {
                required: "Date and Time is required",
                validate: (value) => {
                  const selectedDate = new Date(value);
                  const now = new Date();
                  return selectedDate > now || "Please select a future date and time";
                },
              })}
              type="datetime-local"
              id="time"
              step="1"
              min={minTime}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            {errors.time && (
              <span className="text-red-500 text-sm">
                {errors.time.message}
              </span>
            )}
          </div>
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

