"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { profiles } from "@/data/profiles";
import RequestModal from "@/components/Request/RequestModal";

export default function ProfileView({ params }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const profile = profiles.find((p) => p._id === params.id);

  useEffect(() => {
    if (profile) {
      document.title = profile.name;
    }
  }, [profile]);

  if (!profile) {
    return <div className="text-center mt-8">Profile not found</div>;
  }

  return (
    <div className="max-w-screen-lg mx-auto p-4 space-y-4 mt-16 mb-4 shadow-lg rounded-lg bg-white">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Image
            src={profile.image}
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
          <div className="flex justify-between border-b border-gray-200 py-2">
            <span className="text-gray-600">Name</span>
            <span>{profile.name}</span>
          </div>
          <div className="flex justify-between border-b border-gray-200 py-2">
            <span className="text-gray-600">Email</span>
            <span>{profile.email}</span>
          </div>
          <div className="flex justify-between border-b border-gray-200 py-2">
            <span className="text-gray-600">District</span>
            <span>{profile.district}</span>
          </div>
          <div className="flex justify-between border-b border-gray-200 py-2">
            <span className="text-gray-600">Phone Number</span>
            <span>{profile.phone}</span>
          </div>
          <div className="flex justify-between border-b border-gray-200 py-2">
            <span className="text-gray-600">Pincode</span>
            <span>{profile.pincode}</span>
          </div>
          <div className="flex justify-between border-b border-gray-200 py-2">
            <span className="text-gray-600">Age</span>
            <span>{profile.age}</span>
          </div>
          <div className="flex justify-between border-b border-gray-200 py-2">
            <span className="text-gray-600">Blood Group</span>
            <span>{profile.bloodGroup}</span>
          </div>
          <div className="flex justify-between border-b border-gray-200 py-2">
            <span className="text-gray-600">Address</span>
            <span>{profile.address}</span>
          </div>
          <div className="flex justify-between border-b border-gray-200 py-2">
            <span className="text-gray-600">Last Donation Date</span>
            <span>{profile.lastDonationDate}</span>
          </div>
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
