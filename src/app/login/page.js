"use client";

import { useForm } from "react-hook-form";
import { userLogin } from "@/services/actions/userLogin";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { storeUserInfo } from "@/services/actions/authServices";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";

  const onSubmit = async (data) => {
    try {
      const res = await userLogin(data);
      if (res.success === "true") {
        storeUserInfo(res.data.accessToken);
        toast.success("Login successful");
        router.push(redirect);
      } else {
        toast.error(res.errorMessage);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center px-4 mt-20 py-4">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-semibold text-white bg-gradient-to-r from-red-700 to-purple-800 py-4 text-center rounded-t-md">
          Login
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
          {/* Email or Username */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email or Username
              <span className="text-red-500">*</span>
            </label>
            <input
              {...register("emailOrUsername", {
                required: "Email or Username is required",
              })}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              placeholder="Email or Username"
              autoComplete="email"
            />
            {errors.emailOrUsername && (
              <p className="text-red-500 text-sm">
                {errors.emailOrUsername.message}
              </p>
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
              autoComplete="current-password"
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
