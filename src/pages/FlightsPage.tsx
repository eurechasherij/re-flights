import { FlightItem } from "@/components/FlightItem";
import { FlightSearch } from "@/components/FlightSearch";
import { useFlightSearch } from "@/hooks/useFlightSearch";
import { Box, Typography } from "@mui/material";
import { useEffect } from "react";
import { useSearchParams } from "react-router";

export const FlightsPage = () => {
  const [searchParams] = useSearchParams();
  const { flights, setSearchDataFromParams } = useFlightSearch();

  useEffect(() => {
    // Check if we have search parameters from navigation
    const hasSearchParams = searchParams.has("searchData");

    if (hasSearchParams) {
      // Populate search form with URL parameters
      setSearchDataFromParams(searchParams);
    }
  }, []);

  return (
    <section className="w-full flex flex-col items-center bg-gray-100 dark:bg-gray-900">
      <Box className="flex flex-col w-full max-w-5xl gap-6">
        {/* Search Form */}
        <FlightSearch />

        {/* Flight Results */}
        {flights && (
          <Box className="space-y-4">
            <Typography
              variant="h5"
              className="font-semibold text-gray-800 dark:text-gray-200"
            >
              Flight Results
            </Typography>

            {flights.itineraries.length === 0 ? (
              <Box className="text-center py-8">
                <Typography
                  variant="body1"
                  className="text-gray-600 dark:text-gray-400"
                >
                  No flights found. Try adjusting your search criteria.
                </Typography>
              </Box>
            ) : (
              <Box className="space-y-2">
                <Typography
                  variant="body2"
                  className="text-gray-600 dark:text-gray-400 mb-4"
                >
                  Found {flights.itineraries.length} flights • Sorted by best
                  value
                </Typography>

                {flights.itineraries.map((itinerary) => (
                  <FlightItem key={itinerary.id} itinerary={itinerary} />
                ))}
              </Box>
            )}
          </Box>
        )}
      </Box>
    </section>
  );
};
