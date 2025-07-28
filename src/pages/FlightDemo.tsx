import { FlightItem } from "@/components/FlightItem";
import { Container, Typography, Box } from "@mui/material";
import type { Itinerary } from "@/networks/flightResource";

// Mock flight data based on the structure from flightResource.ts
const mockFlightData: Itinerary[] = [
  {
    id: "1",
    price: {
      raw: 36854713,
      formatted: "IDR 36,854,713",
      pricingOptionId: "1"
    },
    legs: [
      {
        id: "outbound-1",
        origin: {
          id: "LHR",
          entityId: "27544008",
          name: "London Heathrow",
          displayCode: "LHR",
          city: "London",
          country: "United Kingdom",
          isHighlighted: false
        },
        destination: {
          id: "BKK",
          entityId: "27537542",
          name: "Bangkok Suvarnabhumi",
          displayCode: "BKK",
          city: "Bangkok",
          country: "Thailand",
          isHighlighted: false
        },
        durationInMinutes: 895, // 14h 55m
        stopCount: 1,
        isSmallestStops: false,
        departure: "2025-08-12T20:50:00",
        arrival: "2025-08-13T17:45:00",
        timeDeltaInDays: 1,
        carriers: {
          marketing: [
            {
              id: 1,
              alternateId: "WY",
              logoUrl: "https://logos.skyscnr.com/images/airlines/favicon/WY.png",
              name: "Oman Air"
            }
          ],
          operationType: "fully_operated"
        },
        segments: []
      }
    ],
    isSelfTransfer: false,
    isProtectedSelfTransfer: false,
    farePolicy: {
      isChangeAllowed: true,
      isPartiallyChangeable: false,
      isCancellationAllowed: false,
      isPartiallyRefundable: false
    },
    fareAttributes: {},
    tags: ["Best"],
    isMashUp: false,
    hasFlexibleOptions: false,
    score: 8.5
  },
  {
    id: "2",
    price: {
      raw: 37560640,
      formatted: "IDR 37,560,640",
      pricingOptionId: "2"
    },
    legs: [
      {
        id: "outbound-2",
        origin: {
          id: "LHR",
          entityId: "27544008",
          name: "London Heathrow",
          displayCode: "LHR",
          city: "London",
          country: "United Kingdom",
          isHighlighted: false
        },
        destination: {
          id: "BKK",
          entityId: "27537542",
          name: "Bangkok Suvarnabhumi",
          displayCode: "BKK",
          city: "Bangkok",
          country: "Thailand",
          isHighlighted: false
        },
        durationInMinutes: 960, // 16h
        stopCount: 1,
        isSmallestStops: false,
        departure: "2025-08-12T07:30:00",
        arrival: "2025-08-13T05:30:00",
        timeDeltaInDays: 1,
        carriers: {
          marketing: [
            {
              id: 2,
              alternateId: "AY",
              logoUrl: "https://logos.skyscnr.com/images/airlines/favicon/AY.png",
              name: "Finnair"
            }
          ],
          operationType: "fully_operated"
        },
        segments: []
      }
    ],
    isSelfTransfer: false,
    isProtectedSelfTransfer: false,
    farePolicy: {
      isChangeAllowed: false,
      isPartiallyChangeable: true,
      isCancellationAllowed: true,
      isPartiallyRefundable: true
    },
    fareAttributes: {},
    tags: [],
    isMashUp: false,
    hasFlexibleOptions: true,
    score: 7.8
  },
  {
    id: "3",
    price: {
      raw: 38081839,
      formatted: "IDR 38,081,839",
      pricingOptionId: "3"
    },
    legs: [
      {
        id: "outbound-3",
        origin: {
          id: "LHR",
          entityId: "27544008",
          name: "London Heathrow",
          displayCode: "LHR",
          city: "London",
          country: "United Kingdom",
          isHighlighted: false
        },
        destination: {
          id: "BKK",
          entityId: "27537542",
          name: "Bangkok Suvarnabhumi",
          displayCode: "BKK",
          city: "Bangkok",
          country: "Thailand",
          isHighlighted: false
        },
        durationInMinutes: 895, // 14h 55m
        stopCount: 1,
        isSmallestStops: false,
        departure: "2025-08-12T18:30:00",
        arrival: "2025-08-13T15:25:00",
        timeDeltaInDays: 1,
        carriers: {
          marketing: [
            {
              id: 3,
              alternateId: "TK",
              logoUrl: "https://logos.skyscnr.com/images/airlines/favicon/TK.png",
              name: "Turkish Airlines"
            }
          ],
          operationType: "fully_operated"
        },
        segments: []
      }
    ],
    isSelfTransfer: false,
    isProtectedSelfTransfer: false,
    farePolicy: {
      isChangeAllowed: true,
      isPartiallyChangeable: false,
      isCancellationAllowed: true,
      isPartiallyRefundable: false
    },
    fareAttributes: {},
    tags: ["Fastest"],
    isMashUp: false,
    hasFlexibleOptions: false,
    score: 8.2
  },
  {
    id: "4",
    price: {
      raw: 40496507,
      formatted: "IDR 40,496,507",
      pricingOptionId: "4"
    },
    legs: [
      {
        id: "outbound-4",
        origin: {
          id: "LHR",
          entityId: "27544008",
          name: "London Heathrow",
          displayCode: "LHR",
          city: "London",
          country: "United Kingdom",
          isHighlighted: false
        },
        destination: {
          id: "BKK",
          entityId: "27537542",
          name: "Bangkok Suvarnabhumi",
          displayCode: "BKK",
          city: "Bangkok",
          country: "Thailand",
          isHighlighted: false
        },
        durationInMinutes: 1025, // 17h 5m
        stopCount: 1,
        isSmallestStops: false,
        departure: "2025-08-12T14:40:00",
        arrival: "2025-08-13T13:45:00",
        timeDeltaInDays: 1,
        carriers: {
          marketing: [
            {
              id: 4,
              alternateId: "SV",
              logoUrl: "https://logos.skyscnr.com/images/airlines/favicon/SV.png",
              name: "Saudia"
            }
          ],
          operationType: "fully_operated"
        },
        segments: []
      }
    ],
    isSelfTransfer: false,
    isProtectedSelfTransfer: false,
    farePolicy: {
      isChangeAllowed: false,
      isPartiallyChangeable: false,
      isCancellationAllowed: false,
      isPartiallyRefundable: true
    },
    fareAttributes: {},
    tags: [],
    isMashUp: false,
    hasFlexibleOptions: false,
    score: 7.2
  }
];

export const FlightDemo = () => {
  return (
    <section className="w-full flex flex-row items-center bg-gray-100 dark:bg-gray-900">
      <Container maxWidth="lg" className="py-6">
        <Box className="space-y-6">
          <Box className="text-center">
            <Typography variant="h4" className="font-bold text-gray-800 dark:text-gray-200 mb-2">
              FlightItem Component Demo
            </Typography>
            <Typography variant="body1" className="text-gray-600 dark:text-gray-400">
              Based on Google Flights design - London (LHR) to Bangkok (BKK)
            </Typography>
          </Box>
          
          <Box className="space-y-4">
            <Typography variant="h5" className="font-semibold text-gray-800 dark:text-gray-200">
              Flight Results
            </Typography>
            
            <Box className="space-y-2">
              <Typography variant="body2" className="text-gray-600 dark:text-gray-400 mb-4">
                Found {mockFlightData.length} flights • Sorted by best value
              </Typography>
              
              {mockFlightData.map((itinerary) => (
                <FlightItem key={itinerary.id} itinerary={itinerary} />
              ))}
            </Box>
          </Box>
        </Box>
      </Container>
    </section>
  );
};