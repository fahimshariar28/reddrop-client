"use client";

import { useForm } from "react-hook-form";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center px-4 mt-20 py-4">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-semibold text-white bg-gradient-to-r from-red-700 to-purple-800 py-4 text-center rounded-t-md">
          Login
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "Invalid email address",
                },
              })}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              placeholder="Email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              placeholder="Password"
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-red-600 to-purple-700 text-white py-2 rounded-md hover:opacity-90"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
