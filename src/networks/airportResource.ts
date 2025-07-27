import useSWRMutation from "swr/mutation";
import { fetcher } from "./baseResource";

interface SearchAirportParams {
  query: string;
  locale?: string;
}

export interface RelevantParams {
  skyId?: string; // Only present in flightParams
  entityId: string;
  flightPlaceType?: "CITY" | "AIRPORT"; // Only in flightParams
  entityType?: "CITY" | "AIRPORT"; // Sometimes appears here
  localizedName: string;
}

export interface Navigation {
  entityId: string;
  entityType: "CITY" | "AIRPORT";
  localizedName: string;
  relevantFlightParams: RelevantParams;
  relevantHotelParams: RelevantParams;
}

export interface Presentation {
  title: string;
  suggestionTitle: string;
  subtitle: string;
}

export interface AirportResult {
  presentation: Presentation;
  navigation: Navigation;
}

export interface AirportSearchResponse {
  status: boolean;
  timestamp: number;
  data: AirportResult[];
}

export const searchAirports = ({ query, locale }: SearchAirportParams) => {
  const url = "/searchAirport";

  const searchParams = new URLSearchParams();

  if (query) searchParams.append("query", query);
  if (locale) searchParams.append("locale", locale);

  const fullUrl = `${url}?${searchParams.toString()}`;

  const { data, trigger } = useSWRMutation<AirportSearchResponse>(
    fullUrl,
    fetcher
  );

  return {
    airports: data?.data,
    trigger,
  };
};
