"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Pagination from "@/components/Pagination/Pagination";

export default function ProfileList({ profiles, profilesPerPage }) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(profiles.length / profilesPerPage);

  const indexOfLastProfile = currentPage * profilesPerPage;
  const indexOfFirstProfile = indexOfLastProfile - profilesPerPage;
  const currentProfiles = profiles.slice(
    indexOfFirstProfile,
    indexOfLastProfile
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      {currentProfiles.map((profile) => (
        <div
          key={profile.name}
          className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm"
        >
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <Image
                src={profile.image}
                alt={`${profile.name}'s avatar`}
                width={40}
                height={40}
                className="rounded-full"
                loading="lazy"
              />
            </div>
            <h3 className="font-medium">{profile.name}</h3>
          </div>
          <Link
            href={`/profile/${profile._id}`}
            className="bg-white hover:bg-red-600 text-black hover:text-white py-2 px-2 rounded-lg border border-black hover:border-red-600 transition-colors"
          >
            View Profile
          </Link>
        </div>
      ))}
      <Pagination totalPages={totalPages} onPageChange={handlePageChange} />
    </>
  );
}
