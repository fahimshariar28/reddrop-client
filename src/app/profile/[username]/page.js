"use client";

import { use, useEffect, useState } from "react";
import Image from "next/image";
import RequestModal from "@/components/Request/RequestModal";
import { useGetProfileQuery } from "@/redux/api/userApi";
import LoadingComponent from "@/components/LoadingComponent/LoadingComponent";

export default function ProfileView({ params }) {

  const paramsData = use(params);
  const [lastDonationDate, setLastDonationDate] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: profile, isLoading } = useGetProfileQuery(paramsData.username);

  // Determine the closest donation date
  useEffect(() => {
    if (profile?.donated?.length > 0 || profile?.outsideDonation?.length > 0) {
      const donatedDate = profile?.donated?.[0]?.date
        ? new Date(profile.donated[0].date)
        : null;
      const outsideDonationDate = profile?.outsideDonation?.[0]?.date
        ? new Date(profile.outsideDonation[0].date)
        : null;
      const currentDate = new Date();

      let closerDate = null;
      if (donatedDate && outsideDonationDate) {
        const diffDonated = Math.abs(donatedDate - currentDate);
        const diffOutside = Math.abs(outsideDonationDate - currentDate);
        closerDate = diffDonated <= diffOutside ? donatedDate : outsideDonationDate;
      } else if (donatedDate) {
        closerDate = donatedDate;
      } else if (outsideDonationDate) {
        closerDate = outsideDonationDate;
      }

      setLastDonationDate(closerDate ? closerDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: '2-digit' }) : "No donation history found");
    } else {
      setLastDonationDate("No donation history found");
    }
  }, [profile]);

  // Set document title
  useEffect(() => {
    if (profile) {
      document.title = profile.name;
    }
  }, [profile]);

  if (isLoading) {
    return <LoadingComponent />;
  }

  if (!profile) {
    return <div className="text-center mt-8">Profile not found</div>;
  }

  return (
    <div className="max-w-screen-lg mx-auto p-4 space-y-4 mt-16 mb-4 shadow-lg rounded-lg bg-white">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Image
            src={profile.profilePicture}
            alt={`${profile.name}'s avatar`}
            width={64}
            height={64}
            className="rounded-lg"
          />
          <h1 className="text-xl font-bold">{profile.name}</h1>
        </div>
        <button
          className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800"
          onClick={() => setIsModalOpen(true)}
        >
          Request
        </button>
      </div>

      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-4">About</h2>
        <div className="space-y-3">
          {[
            { label: "Name", value: profile.name },
            { label: "Email", value: profile.email },
            { label: "Phone Number", value: profile.number },
            { label: "Blood Group", value: profile.bloodGroup },
            { label: "Division", value: profile.address?.division },
            { label: "District", value: profile.address?.district },
            { label: "Upazila", value: profile.address?.upazila },
            { label: "Age", value: new Date().getFullYear() - new Date(profile.dob).getFullYear() },
            { label: "Last Donation Date", value: lastDonationDate },
          ].map((item, index) => (
            <div
              key={index}
              className="flex justify-between border-b border-gray-200 py-2"
            >
              <span className="text-gray-600">{item.label}</span>
              <span>{item.value || "N/A"}</span>
            </div>
          ))}
        </div>
      </div>

      <RequestModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        profileName={profile.name}
      />
    </div>
  );
}
