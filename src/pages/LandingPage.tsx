import landingPage from "@/assets/landing-page.png";
import { FlightSearch } from "@/components/FlightSearch";
import {
  useFlightSearch,
  type FlightSearchState,
} from "@/hooks/useFlightSearch";
import { useNavigate } from "react-router";

export const LandingPage = () => {
  // Use useNavigate from react-router for navigation
  const navigate = useNavigate();

  // Handler to be passed to FlightSearch
  const handleSearch = (searchData: FlightSearchState) => {
    // Build URL params from searchData
    const params = new URLSearchParams();
    const base64 = btoa(JSON.stringify(searchData));
    params.set("searchData", base64);
    navigate(`/flights?${params.toString()}`);
  };

  const { searchData, handlers, isSearchValid, triggerSearch } =
    useFlightSearch();

  return (
    <section className="w-screen flex flex-col gap-3 justify-center items-center bg-gray-100 dark:bg-gray-900">
      <div className="text-center">
        <img
          src={landingPage}
          alt="Landing Page"
          className="mx-auto object-cover dark:invert"
        />
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
          Welcome to Re-Flights
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Your journey to explore flight data starts here.
        </p>
      </div>
      {/* Pass handleSearch to FlightSearch as onSearch prop */}
      <FlightSearch
        onSearch={handleSearch}
        searchData={searchData}
        handlers={handlers}
        isSearchValid={isSearchValid}
        triggerSearch={triggerSearch}
      />
    </section>
  );
};
