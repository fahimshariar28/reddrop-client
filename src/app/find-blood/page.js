"use client";

import Image from "next/image";
import findBlood from "@/assets/FindBlood/findBlood.png";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { getDivision } from "@/services/actions/location/getDivision";
import { getDistrict } from "@/services/actions/location/getDistrict";
import { getUpazila } from "@/services/actions/location/getUpazila";
import { useRouter } from "next/navigation";

export default function RecipientForm() {
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

  const onSubmit = (data) => {
    const { bloodGroup, plasma, division, district, upazila } = data;

    router.push(
      `/find-blood/results?bloodGroup=${bloodGroup}&plasma=${plasma}&division=${division}&district=${district}&upazila=${upazila}`
    );
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
                <option value="A_POSITIVE">A+</option>
                <option value="A_NEGATIVE">A-</option>
                <option value="B_POSITIVE">B+</option>
                <option value="B_NEGATIVE">B-</option>
                <option value="O_POSITIVE">O+</option>
                <option value="O_NEGATIVE">O-</option>
                <option value="AB_POSITIVE">AB+</option>
                <option value="AB_NEGATIVE">AB-</option>
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
                onChange={(e) => {
                  const selectedDivision = divisions.find(
                    (div) => div.name === e.target.value
                  );
                  setSelectedDivisionId(
                    selectedDivision ? selectedDivision._id : ""
                  );
                }}
              >
                <option value="">Division</option>
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

            {/* District Select */}
            <div className="space-y-2">
              <select
                {...register("district", { required: "District is required" })}
                className="w-full p-3 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-red-500 appearance-none"
                onChange={(e) => {
                  const selectedDistrict = districts.find(
                    (dist) => dist.district === e.target.value
                  );
                  setSelectedDistrictId(
                    selectedDistrict ? selectedDistrict.districtId : ""
                  );
                }}
              >
                <option value="">District</option>
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
