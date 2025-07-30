import type { Itinerary } from "@/networks/flightResource";
import { Co2, FlightTakeoff } from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Typography,
} from "@mui/material";
import type { FC } from "react";

interface FlightItemProps {
  itinerary: Itinerary;
}

export const FlightItem: FC<FlightItemProps> = ({ itinerary }) => {
  const outboundLeg = itinerary.legs[0];
  const returnLeg = itinerary.legs[1];

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const getStopText = (stopCount: number) => {
    if (stopCount === 0) return "Nonstop";
    if (stopCount === 1) return "1 stop";
    return `${stopCount} stops`;
  };

  const getTimeDelta = (timeDelta: number) => {
    if (timeDelta === 0) return "";
    if (timeDelta === 1) return "+1";
    if (timeDelta === -1) return "-1";
    return `+${timeDelta}`;
  };

  const renderLeg = (leg: typeof outboundLeg, isReturn = false) => (
    <Box className="flex items-center justify-between w-full">
      {/* Airline Logo and Info */}
      <Box className="flex items-center gap-3 min-w-0 flex-1">
        <Box className="flex-shrink-0">
          {leg.carriers.marketing[0]?.logoUrl ? (
            <img
              src={leg.carriers.marketing[0].logoUrl}
              alt={leg.carriers.marketing[0].name}
              className="w-8 h-8 object-contain"
            />
          ) : (
            <Box className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center">
              <FlightTakeoff className="w-4 h-4 text-gray-500 dark:text-gray-200" />
            </Box>
          )}
        </Box>

        <Box className="min-w-0 flex-1">
          <Typography
            variant="body2"
            className="text-gray-600 dark:text-gray-200 truncate"
          >
            {leg.carriers.marketing[0]?.name || "Unknown Airline"}
          </Typography>
          {leg.carriers.operationType === "operated_by" &&
            leg.carriers.operating?.[0] && (
              <Typography
                variant="caption"
                className="text-gray-500 dark:text-gray-200 truncate"
              >
                Operated by {leg.carriers.operating[0].name}
              </Typography>
            )}
        </Box>
      </Box>

      {/* Flight Times and Route */}
      <Box className="flex items-center gap-4 flex-1 justify-center">
        <Box className="text-center">
          <Typography variant="h6" className="font-semibold">
            {formatTime(leg.departure)}
          </Typography>
          <Typography
            variant="body2"
            className="text-gray-600 dark:text-gray-400"
          >
            {leg.origin.displayCode}
          </Typography>
        </Box>

        <Box className="flex flex-col items-center gap-1 min-w-[120px]">
          <Typography
            variant="body2"
            className="text-gray-600 dark:text-gray-400"
          >
            {formatDuration(leg.durationInMinutes)}
          </Typography>
          <Box className="flex items-center gap-2 w-full">
            <Divider className="flex-1" />
            {leg.stopCount > 0 && (
              <Box className="w-2 h-2 bg-gray-400 rounded-full" />
            )}
            <Divider className="flex-1" />
          </Box>
          <Typography
            variant="caption"
            className="text-gray-500 dark:text-gray-200"
          >
            {getStopText(leg.stopCount)}
          </Typography>
        </Box>

        <Box className="text-center">
          <Box className="flex items-center gap-1">
            <Typography variant="h6" className="font-semibold">
              {formatTime(leg.arrival)}
            </Typography>
            {leg.timeDeltaInDays !== 0 && (
              <Typography
                variant="caption"
                className="text-red-500 font-medium"
              >
                {getTimeDelta(leg.timeDeltaInDays)}
              </Typography>
            )}
          </Box>
          <Typography
            variant="body2"
            className="text-gray-600 dark:text-gray-400"
          >
            {leg.destination.displayCode}
          </Typography>
        </Box>
      </Box>

      {/* Price (only show on outbound leg) */}
      {!isReturn && (
        <Box className="text-right min-w-[100px]">
          <Typography variant="h5" className="font-bold text-blue-600">
            {itinerary.price.formatted}
          </Typography>
          <Typography
            variant="caption"
            className="text-gray-500 dark:text-gray-200"
          >
            per person
          </Typography>
        </Box>
      )}
    </Box>
  );

  return (
    <Card className="mb-2 hover:shadow-md transition-shadow cursor-pointer">
      <CardContent className="p-4">
        <Box className="space-y-4">
          {/* Outbound Flight */}
          {renderLeg(outboundLeg)}

          {/* Return Flight (if exists) */}
          {returnLeg && (
            <>
              <Divider />
              {renderLeg(returnLeg, true)}
            </>
          )}

          {/* Additional Info */}
          <Box className="flex items-center justify-between pt-2 border-t border-gray-100">
            <Box className="flex items-center gap-4">
              {/* Emissions Info */}
              <Box className="flex items-center gap-1">
                <Co2 className="w-4 h-4 text-green-600" />
                <Typography variant="caption" className="text-green-600">
                  -8% emissions
                </Typography>
              </Box>

              {/* Flight Tags */}
              {itinerary.tags?.map((tag, index) => (
                <Chip
                  key={index}
                  label={tag}
                  size="small"
                  variant="outlined"
                  className="text-xs"
                />
              ))}

              {/* Fare Policy Indicators */}
              <Box className="flex gap-2">
                {itinerary.farePolicy.isChangeAllowed && (
                  <Chip
                    label="Changeable"
                    size="small"
                    color="success"
                    variant="outlined"
                    className="text-xs"
                  />
                )}
                {itinerary.farePolicy.isCancellationAllowed && (
                  <Chip
                    label="Refundable"
                    size="small"
                    color="info"
                    variant="outlined"
                    className="text-xs"
                  />
                )}
              </Box>
            </Box>

            {/* Flight Score */}
            <Typography
              variant="caption"
              className="text-gray-500 dark:text-gray-200"
            >
              Score: {itinerary.score.toFixed(1)}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};
