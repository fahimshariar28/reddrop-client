"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

const divisions = [
  "Dhaka",
  "Chattogram",
  "Khulna",
  "Sylhet",
  "Barishal",
  "Rajshahi",
  "Mymensingh",
];

const districts = [
  "Dhaka",
  "Chattogram",
  "Khulna",
  "Sylhet",
  "Barishal",
  "Rajshahi",
  "Mymensingh",
];

const upazilas = [
  "Dhaka",
  "Chattogram",
  "Khulna",
  "Sylhet",
  "Barishal",
  "Rajshahi",
  "Mymensingh",
];

export default function Register() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const [emailValue, setEmailValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [emailResponse, setEmailResponse] = useState(null);

  const email = watch("email");

  const [isSameAddress, setIsSameAddress] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      // Check if the email passes validation
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
      if (email && emailRegex.test(email)) {
        setEmailValue(email); // Trigger API call for valid email
      }
    }, 500); // Debounce for 500ms

    return () => clearTimeout(timeout); // Clear timeout on unmount or change
  }, [email]);

  // Trigger API Call
  useEffect(() => {
    if (emailValue) {
      setIsLoading(true);
      // Example API Call
      fetch(`/api/check-email?email=${emailValue}`) //TODO: Change this to your API endpoint
        .then((res) => res.json())
        .then((data) => {
          setEmailResponse(data);
        })
        .catch((error) => {
          console.error("API Error:", error);
        })
        .finally(() => setIsLoading(false));
    }
  }, [emailValue]);

  const onSubmit = (data) => {
    console.log(data);
  };

  // Watch Present Address fields
  const presentAddress = {
    address: watch("presentAddress"),
    upazila: watch("presentUpazila"),
    district: watch("presentDistrict"),
    division: watch("presentDivision"),
  };

  // Handle checkbox change
  const handleSameAddressChange = (e) => {
    const checked = e.target.checked;
    setIsSameAddress(checked);

    if (checked) {
      // Auto-fill Permanent Address fields
      setValue("permanentAddress", presentAddress.address);
      setValue("permanentUpazila", presentAddress.upazila);
      setValue("permanentDistrict", presentAddress.district);
      setValue("permanentDivision", presentAddress.division);
    } else {
      // Clear Permanent Address fields
      setValue("permanentAddress", "");
      setValue("permanentUpazila", "");
      setValue("permanentDistrict", "");
      setValue("permanentDivision", "");
    }
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center px-4 mt-20 py-4">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-semibold text-white bg-gradient-to-r from-red-700 to-purple-800 py-4 text-center rounded-t-md">
          Join Us
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
          {/*  Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              {...register("name", {
                required: "Name is required",
              })}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              placeholder="Name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

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

            {/* API Response Feedback */}
            {isLoading && <p className="text-yellow-600 text-sm">Checking </p>}
            {emailResponse && (
              <p className="text-green-500 text-sm">
                Response: {emailResponse.message}
              </p>
            )}
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              {...register("phoneNumber", {
                required: "Phone number is required",
              })}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              placeholder="Phone Number"
            />
            {errors.phoneNumber && (
              <p className="text-red-500 text-sm">
                {errors.phoneNumber.message}
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
            />
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Date of Birth <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              {...register("dob", { required: "Date of birth is required" })}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
            {errors.dob && (
              <p className="text-red-500 text-sm">{errors.dob.message}</p>
            )}
          </div>

          {/* Gender & Blood Group */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Gender <span className="text-red-500">*</span>
              </label>
              <select
                {...register("gender", { required: "Gender is required" })}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              {errors.gender && (
                <p className="text-red-500 text-sm">{errors.gender.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Blood Group <span className="text-red-500">*</span>
              </label>
              <select
                {...register("bloodGroup", {
                  required: "Blood group is required",
                })}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              >
                <option value="">Select Blood Group</option>
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
          </div>

          {/* Present Address */}
          <h3 className="text-lg font-semibold text-gray-700 mt-4">
            Present Address <span className="text-red-500">*</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Division <span className="text-red-500">*</span>
              </label>
              <select
                {...register("presentDivision", {
                  required: "Present division is required",
                })}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              >
                <option value="">Select Division</option>
                {divisions.map((division, index) => (
                  <option key={index} value={division}>
                    {division}
                  </option>
                ))}
              </select>
              {errors.presentDivision && (
                <p className="text-red-500 text-sm">
                  {errors.presentDivision.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                District <span className="text-red-500">*</span>
              </label>
              <select
                {...register("presentDistrict", {
                  required: "Present district is required",
                })}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              >
                <option value="">Select District</option>
                {districts.map((district, index) => (
                  <option key={index} value={district}>
                    {district}
                  </option>
                ))}
              </select>
              {errors.presentDistrict && (
                <p className="text-red-500 text-sm">
                  {errors.presentDistrict.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Upazila <span className="text-red-500">*</span>
              </label>
              <select
                {...register("presentUpazila", {
                  required: "Present upazila is required",
                })}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              >
                <option value="">Select Upazila</option>
                {upazilas.map((upazila, index) => (
                  <option key={index} value={upazila}>
                    {upazila}
                  </option>
                ))}
              </select>
              {errors.presentUpazila && (
                <p className="text-red-500 text-sm">
                  {errors.presentUpazila.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Address
              </label>
              <input
                {...register("presentAddress", {
                  required: "Present address is required",
                })}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                placeholder="Address"
              />
              {errors.presentAddress && (
                <p className="text-red-500 text-sm">
                  {errors.presentAddress.message}
                </p>
              )}
            </div>
          </div>

          {/* Permanent Address */}
          <h3 className="text-lg font-semibold text-gray-700 mt-4">
            Permanent Address
          </h3>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={isSameAddress}
              onChange={handleSameAddressChange}
            />
            <label className="text-sm font-medium text-gray-700">
              Same as Present Address
            </label>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Division <span className="text-red-500">*</span>
              </label>
              <select
                {...register("permanentDivision", {
                  required: "Permanent division is required",
                })}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              >
                <option value="">Select Division</option>
                {divisions.map((division, index) => (
                  <option key={index} value={division}>
                    {division}
                  </option>
                ))}
              </select>
              {errors.permanentDivision && (
                <p className="text-red-500 text-sm">
                  {errors.permanentDivision.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                District <span className="text-red-500">*</span>
              </label>
              <select
                {...register("permanentDistrict", {
                  required: "Permanent district is required",
                })}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              >
                <option value="">Select District</option>
                {districts.map((district, index) => (
                  <option key={index} value={district}>
                    {district}
                  </option>
                ))}
              </select>
              {errors.permanentDistrict && (
                <p className="text-red-500 text-sm">
                  {errors.permanentDistrict.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Upazila <span className="text-red-500">*</span>
              </label>
              <select
                {...register("permanentUpazila", {
                  required: "Permanent upazila is required",
                })}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              >
                <option value="">Select Upazila</option>
                {upazilas.map((upazila, index) => (
                  <option key={index} value={upazila}>
                    {upazila}
                  </option>
                ))}
              </select>
              {errors.permanentUpazila && (
                <p className="text-red-500 text-sm">
                  {errors.permanentUpazila.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Address
              </label>
              <input
                {...register("permanentAddress", {
                  required: "Permanent address is required",
                })}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                placeholder="Address"
              />
              {errors.permanentAddress && (
                <p className="text-red-500 text-sm">
                  {errors.permanentAddress.message}
                </p>
              )}
            </div>
          </div>

          {/* Consent */}
          <div>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                {...register("consent", {
                  required: "You must agree to the terms",
                })}
              />
              <span>
                I agree to the{" "}
                <Link href="terms-and-conditions" className="text-red-600">
                  Terms & Conditions
                </Link>{" "}
                of blood donation
              </span>
            </label>
            {errors.consent && (
              <p className="text-red-500 text-sm">{errors.consent.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-red-600 to-purple-700 text-white py-2 rounded-md hover:opacity-90"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
