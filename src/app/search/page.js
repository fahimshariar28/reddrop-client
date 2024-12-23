import { profiles } from "@/data/profiles";
import ProfileList from "@/components/Search/ProfileList";

export default function SearchResult() {
  const profilesPerPage = 10;

  return (
    <div className="w-4/5 mx-auto p-4 space-y-4 mt-16 mb-4 shadow-lg rounded-lg">
      <ProfileList profiles={profiles} profilesPerPage={profilesPerPage} />
    </div>
  );
}
