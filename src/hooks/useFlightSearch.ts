import type { AirportResult } from "@/networks/airportResource";
import { searchFlights, type CabinClass } from "@/networks/flightResource";
import type { SelectChangeEvent } from "@mui/material";
import { useState } from "react";

export interface FlightSearchState {
  tripType: string;
  origin: AirportResult | null;
  destination: AirportResult | null;
  departureDate: string;
  returnDate: string;
  passengers: number;
  travelClass: CabinClass;
}

export const useFlightSearch = () => {
  const [searchData, setSearchData] = useState<FlightSearchState>({
    tripType: "roundtrip",
    origin: null,
    destination: null,
    departureDate: "",
    returnDate: "",
    passengers: 1,
    travelClass: "economy",
  });

  const { flights, trigger } = searchFlights({
    originSkyId: searchData.origin?.navigation.relevantFlightParams.skyId || "",
    destinationSkyId:
      searchData.destination?.navigation.relevantFlightParams.skyId || "",
    originEntityId:
      searchData.origin?.navigation.relevantFlightParams.entityId || "",
    destinationEntityId:
      searchData.destination?.navigation.relevantFlightParams.entityId || "",
    date: searchData.departureDate,
    cabinClass: searchData.travelClass,
    adults: searchData.passengers,
  });

  const handleTripTypeChange = (event: SelectChangeEvent) => {
    setSearchData((prev) => ({
      ...prev,
      tripType: event.target.value,
      returnDate: event.target.value === "oneway" ? "" : prev.returnDate,
    }));
  };

  const handleClassChange = (event: SelectChangeEvent) => {
    setSearchData((prev) => ({
      ...prev,
      travelClass: event.target.value as CabinClass,
    }));
  };

  const handleInputChange =
    (field: keyof FlightSearchState) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchData((prev) => ({
        ...prev,
        [field]: event.target.value,
      }));
    };

  const handleAirportChange =
    (field: "origin" | "destination") => (airport: AirportResult | null) => {
      setSearchData((prev) => ({
        ...prev,
        [field]: airport,
      }));
    };

  const handlePassengerChange = (event: SelectChangeEvent) => {
    setSearchData((prev) => ({
      ...prev,
      passengers: Number(event.target.value),
    }));
  };

  const swapLocations = () => {
    setSearchData((prev) => ({
      ...prev,
      origin: prev.destination,
      destination: prev.origin,
    }));
  };

  const isSearchValid = () => {
    return (
      searchData.origin &&
      searchData.destination &&
      searchData.departureDate &&
      (searchData.tripType === "oneway" || searchData.returnDate)
    );
  };

  const setSearchDataFromParams = (searchParams: URLSearchParams) => {
    const searchData: FlightSearchState = JSON.parse(
      atob(searchParams.get("searchData") || "")
    );

    setSearchData(searchData);
  };

  const triggerSearch = async () => {
    try {
      await trigger();
      console.log("Flight search triggered:", flights);
    } catch (error) {
      console.error("Flight search trigger failed:", error);
    }
  };

  return {
    searchData,
    flights,
    handlers: {
      handleTripTypeChange,
      handleClassChange,
      handleInputChange,
      handleAirportChange,
      handlePassengerChange,
      swapLocations,
    },
    isSearchValid,
    setSearchDataFromParams,
    triggerSearch,
  };
};
