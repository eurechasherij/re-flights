import useSWRMutation from "swr/mutation";
import { fetcher } from "./baseResource";

export type CabinClass = "economy" | "premium_economy" | "business" | "first";

export type SortBy = "best" | "price_high" | "fastest";

interface SearchFlightParams {
  originSkyId: string;
  destinationSkyId: string;
  originEntityId: string;
  destinationEntityId: string;
  date: string;
  returnDate?: string;
  cabinClass?: CabinClass;
  adults?: number;
  children?: number;
  infants?: number;
  sortBy?: string;
  currency?: string;
  market?: string;
  countryCode?: string;
}

export interface FlightPlace {
  id: string;
  entityId: string;
  name: string;
  displayCode: string;
  city: string;
  country: string;
  isHighlighted: boolean;
}

export interface FlightPlaceSegment {
  flightPlaceId: string;
  displayCode: string;
  parent: {
    flightPlaceId: string;
    displayCode: string;
    name: string;
    type: string;
  };
  name: string;
  type: string;
  country: string;
}

export interface Carrier {
  id: number;
  name: string;
  alternateId: string;
  allianceId: number;
  displayCode: string;
  logoUrl?: string;
}

export interface Segment {
  id: string;
  origin: FlightPlaceSegment;
  destination: FlightPlaceSegment;
  departure: string;
  arrival: string;
  durationInMinutes: number;
  flightNumber: string;
  marketingCarrier: Carrier;
  operatingCarrier: Carrier;
  transportMode: string;
}

export interface CarrierInfo {
  id: number;
  alternateId: string;
  logoUrl: string;
  name: string;
}

export interface Carriers {
  marketing: CarrierInfo[];
  operating?: CarrierInfo[];
  operationType: string;
}

export interface Leg {
  id: string;
  origin: FlightPlace;
  destination: FlightPlace;
  durationInMinutes: number;
  stopCount: number;
  isSmallestStops: boolean;
  departure: string;
  arrival: string;
  timeDeltaInDays: number;
  carriers: Carriers;
  segments: Segment[];
}

export interface Price {
  raw: number;
  formatted: string;
  pricingOptionId: string;
}

export interface FarePolicy {
  isChangeAllowed: boolean;
  isPartiallyChangeable: boolean;
  isCancellationAllowed: boolean;
  isPartiallyRefundable: boolean;
}

export interface Itinerary {
  id: string;
  price: Price;
  legs: Leg[];
  isSelfTransfer: boolean;
  isProtectedSelfTransfer: boolean;
  farePolicy: FarePolicy;
  fareAttributes: Record<string, any>;
  tags?: string[];
  isMashUp: boolean;
  hasFlexibleOptions: boolean;
  score: number;
}

export interface Context {
  status: string;
  sessionId: string;
  totalResults: number;
}

export interface Airport {
  id: string;
  entityId: string;
  name: string;
}

export interface FilterAirport {
  city: string;
  airports: Airport[];
}

export interface FilterCarrier {
  id: number;
  alternateId: string;
  logoUrl: string;
  name: string;
  minPrice?: string;
  allianceId: number;
}

export interface StopPrice {
  isPresent: boolean;
  formattedPrice?: string;
  rawPrice?: number;
}

export interface StopPrices {
  direct: StopPrice;
  one: StopPrice;
  twoOrMore: StopPrice;
}

export interface Alliance {
  id: number;
  name: string;
}

export interface Duration {
  min: number;
  max: number;
  multiCityMin: number;
  multiCityMax: number;
}

export interface MultipleCarriers {
  minPrice: string;
  rawMinPrice: number | null;
}

export interface FilterStats {
  duration: Duration;
  total: number;
  hasCityOpenJaw: boolean;
  multipleCarriers: MultipleCarriers;
  airports: FilterAirport[];
  carriers: FilterCarrier[];
  stopPrices: StopPrices;
  alliances: Alliance[];
}

export interface FlightData {
  context: Context;
  itineraries: Itinerary[];
  messages: any[];
  filterStats: FilterStats;
  flightsSessionId: string;
  destinationImageUrl: string;
}

export interface FlightSearchResponse {
  status: boolean;
  timestamp: number;
  data: FlightData;
}

export const searchFlights = ({
  originSkyId,
  destinationSkyId,
  originEntityId,
  destinationEntityId,
  date,
  cabinClass = "economy",
  adults = 1,
  sortBy = "best",
  currency = "USD",
  market = "en-US",
  countryCode = "US"
}: SearchFlightParams) => {
  const url = "/searchFlights";

  const searchParams = new URLSearchParams();

  searchParams.append("originSkyId", originSkyId);
  searchParams.append("destinationSkyId", destinationSkyId);
  searchParams.append("originEntityId", originEntityId);
  searchParams.append("destinationEntityId", destinationEntityId);
  searchParams.append("date", date);
  searchParams.append("cabinClass", cabinClass);
  searchParams.append("adults", adults.toString());
  searchParams.append("sortBy", sortBy);
  searchParams.append("currency", currency);
  searchParams.append("market", market);
  searchParams.append("countryCode", countryCode);

  const fullUrl = `${url}?${searchParams.toString()}`;

  const { data, trigger } = useSWRMutation<FlightSearchResponse>(
    fullUrl,
    fetcher
  );

  return {
    flights: data?.data,
    trigger,
  };
};