"use client";

import LoadingComponent from "@/components/LoadingComponent/LoadingComponent";
import ProfileList from "@/components/Search/ProfileList";
import { useGetSearchResultsQuery } from "@/redux/api/userApi";
import { useSearchParams } from "next/navigation";

export default function SearchResult() {
  const searchParams = useSearchParams();
  const params = Object.fromEntries(searchParams.entries());

  const queryString = new URLSearchParams(params).toString();

  const { data, isLoading } = useGetSearchResultsQuery(queryString);

  const profilesPerPage = 10;
  if (isLoading) {
    return <LoadingComponent />;
  }

  if (!data?.userData || data.userData.length === 0) {
    return (
      <div className="w-4/5 mx-auto p-4 space-y-4 mt-20 mb-4 shadow-lg rounded-lg text-center">
        <p className="text-black text-lg">
          No profiles found for the given search criteria. Please try again with different filters.
        </p>
      </div>
    );
  }

  return (
    <div className="w-4/5 mx-auto p-4 space-y-4 mt-16 mb-4 shadow-lg rounded-lg">
      <ProfileList profiles={data?.userData} profilesPerPage={profilesPerPage} />
    </div>
  );

}
