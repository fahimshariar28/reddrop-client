"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { checkEmail } from "@/services/actions/checkEmail";
import { checkUsername } from "@/services/actions/checkUsername";
import { userRegister } from "@/services/actions/userRegister";
import { getDivision } from "@/services/actions/location/getDivision";
import { getDistrict } from "@/services/actions/location/getDistrict";
import { getUpazila } from "@/services/actions/location/getUpazila";

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const router = useRouter();

  // Division
  const [divisions, setDivisions] = useState([]);
  const [selectedDivisionId, setSelectedDivisionId] = useState("");

  // District
  const [districts, setDistricts] = useState([]);
  const [selectedDistrictId, setSelectedDistrictId] = useState("");

  // Upazila
  const [upazilas, setUpazilas] = useState([]);

  // Fetch divisions data
  useEffect(() => {
    const fetchDivisions = async () => {
      const divisions = await getDivision();

      setDivisions(divisions.data);
    };
    fetchDivisions();
  }, []);

  // Fetch districts data
  useEffect(() => {
    const fetchDistricts = async () => {
      if (selectedDivisionId) {
        const districts = await getDistrict(selectedDivisionId);
        setDistricts(districts.data.districts);
      }
    };
    fetchDistricts();
  }, [selectedDivisionId]);

  // Fetch upazilas data
  useEffect(() => {
    const fetchUpazilas = async () => {
      if (selectedDistrictId) {
        const upazilas = await getUpazila(selectedDistrictId);
        setUpazilas(upazilas.data);
      }
    };
    fetchUpazilas();
  }, [selectedDistrictId]);

  const onSubmit = async (data) => {
    // Check if email already exists
    const emailDuplicate = await checkEmail(data.email);
    if (emailDuplicate?.data?.exists === true) {
      toast.error("Email already exists");
      return;
    }

    // Check if username already exists
    const usernameDuplicate = await checkUsername(data.username);
    if (usernameDuplicate?.data?.exists === true) {
      toast.error("Username already exists");
      return;
    }

    delete data.consent;

    data.plasma = data.plasma === "true";

    data.address = {
      division: data.division,
      district: data.district,
      upazila: data.upazila,
      address: data.address,
    };

    try {
      const res = await userRegister(data);
      console.log(res);
      if (res?.success === "true") {
        toast.success(`${res?.message}, Please login to continue`);
        // Redirect to login page
        router.push("/login");
      }
    } catch (error) {
      console.error(error);
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
          </div>

          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Username <span className="text-red-500">*</span>
            </label>
            <input
              {...register("username", {
                required: "Username is required",
              })}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              placeholder="Username"
            />
            {errors.username && (
              <p className="text-red-500 text-sm">{errors.username.message}</p>
            )}
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              {...register("number", {
                required: "Phone number is required",
                pattern: {
                  value: /^[0-9]{11}$/,
                  message: "Phone number must be 11 digits",
                },
              })}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              placeholder="01999999999"
            />
            {errors.number && (
              <p className="text-red-500 text-sm">{errors.number.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium</p>um text-gray-700">
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

            {/* Radio for Plasma value will be true of false */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Willing to donate Plasma
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  {...register("plasma", {
                    required: "Plasma is required",
                  })}
                  value="true"
                />
                <label>Yes</label>
                <input
                  type="radio"
                  {...register("plasma", {
                    required: "Plasma is required",
                  })}
                  value="false"
                />
                <label>No</label>
              </div>
            </div>
          </div>

          {/*  Address */}
          <h3 className="text-lg font-semibold text-gray-700 mt-4">
            Address <span className="text-red-500">*</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Division <span className="text-red-500">*</span>
              </label>
              <select
                {...register("division", {
                  required: "Division is required",
                })}
                onChange={(e) => {
                  const selectedDivision = divisions.find(
                    (div) => div.name === e.target.value
                  );
                  setSelectedDivisionId(
                    selectedDivision ? selectedDivision._id : ""
                  );
                }}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              >
                <option value="">Select Division</option>
                {divisions.map(({ _id, name }) => (
                  <option key={_id} value={name}>
                    {name}
                  </option>
                ))}
              </select>
              {errors.division && (
                <p className="text-red-500 text-sm">
                  {errors.division.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                District <span className="text-red-500">*</span>
              </label>
              <select
                {...register("district", {
                  required: "District is required",
                })}
                onChange={(e) => {
                  const selectedDistrict = districts.find(
                    (dist) => dist.district === e.target.value
                  );
                  setSelectedDistrictId(
                    selectedDistrict ? selectedDistrict.districtId : ""
                  );
                }}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              >
                <option value="">Select District</option>
                {districts.map(({ districtId, district }) => (
                  <option key={districtId} value={district}>
                    {district}
                  </option>
                ))}
              </select>
              {errors.district && (
                <p className="text-red-500 text-sm">
                  {errors.district.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Upazila <span className="text-red-500">*</span>
              </label>
              <select
                {...register("upazila", {
                  required: "Upazila is required",
                })}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              >
                <option value="">Select Upazila</option>
                {upazilas.map(({ _id, name }) => (
                  <option key={_id} value={name}>
                    {name}
                  </option>
                ))}
              </select>
              {errors.upazila && (
                <p className="text-red-500 text-sm">{errors.upazila.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Address
              </label>
              <input
                {...register("address", {
                  required: "Address is required",
                })}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                placeholder="Address"
              />
              {errors.address && (
                <p className="text-red-500 text-sm">{errors.address.message}</p>
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
