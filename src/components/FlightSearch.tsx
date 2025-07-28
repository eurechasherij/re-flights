import { useFlightSearch } from "@/hooks/useFlightSearch";
import {
  CalendarToday,
  FlightLand,
  FlightTakeoff,
  Search,
  SwapHoriz,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { AirportSearch } from "./AirportSearch";

export const FlightSearch = () => {
  const { searchData, handlers, isSearchValid } = useFlightSearch();

  return (
    <Card className="w-full max-w-5xl mx-auto shadow-lg rounded-xl!">
      <CardContent className="p-6 flex flex-col gap-4">
        {/* Trip Type and Class Selection */}
        <div className="w-full flex flex-wrap gap-4">
          <FormControl className="flex-1">
            <InputLabel id="trip-type-label">Trip Type</InputLabel>
            <Select
              labelId="trip-type-label"
              value={searchData.tripType}
              label="Trip Type"
              onChange={handlers.handleTripTypeChange}
              size="small"
            >
              <MenuItem value="roundtrip">Round trip</MenuItem>
              <MenuItem value="oneway">One way</MenuItem>
              <MenuItem value="multicity">Multi-city</MenuItem>
            </Select>
          </FormControl>

          <FormControl className="flex-1">
            <InputLabel id="passengers-label">Passengers</InputLabel>
            <Select
              labelId="passengers-label"
              value={searchData.passengers.toString()}
              label="Passengers"
              onChange={handlers.handlePassengerChange}
              size="small"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                <MenuItem key={num} value={num.toString()}>
                  {num}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl className="flex-1">
            <InputLabel id="class-label">Class</InputLabel>
            <Select
              labelId="class-label"
              value={searchData.travelClass}
              label="Class"
              onChange={handlers.handleClassChange}
              size="small"
            >
              <MenuItem value="economy">Economy</MenuItem>
              <MenuItem value="premium_economy">Premium Economy</MenuItem>
              <MenuItem value="business">Business</MenuItem>
              <MenuItem value="first">First</MenuItem>
            </Select>
          </FormControl>
        </div>

        {/* Location and Date Selection */}
        <div className="w-full flex flex-row gap-4 items-end">
          {/* Origin */}
          <div className="grow w-3/13">
            <AirportSearch
              label="From"
              placeholder="Where from?"
              startIcon={<FlightTakeoff className="mr-" />}
              value={searchData.origin}
              onChange={handlers.handleAirportChange("origin")}
            />
          </div>

          {/* Swap Button */}
          <div className="flex-1 flex justify-center w-1/13">
            <IconButton
              onClick={handlers.swapLocations}
              className="bg-blue-50 hover:bg-blue-100 border border-blue-200"
              size="large"
            >
              <SwapHoriz className="text-black dark:text-gray-300" />
            </IconButton>
          </div>

          {/* Destination */}
          <div className="grow w-3/13">
            <AirportSearch
              label="To"
              placeholder="Where to?"
              startIcon={<FlightLand className="mr-" />}
              value={searchData.destination}
              onChange={handlers.handleAirportChange("destination")}
            />
          </div>

          {/* Departure Date */}
          <div className="grow w-3/13">
            <TextField
              fullWidth
              label="Departure"
              type="date"
              value={searchData.departureDate}
              onChange={handlers.handleInputChange("departureDate")}
              slotProps={{
                input: {
                  startAdornment: <CalendarToday className="mr-" />,
                },
              }}
              variant="outlined"
            />
          </div>

          {/* Return Date */}
          {searchData.tripType !== "oneway" && (
            <div className="grow w-3/13">
              <TextField
                fullWidth
                label="Return"
                type="date"
                value={searchData.returnDate}
                onChange={handlers.handleInputChange("returnDate")}
                slotProps={{
                  input: {
                    startAdornment: <CalendarToday className="mr-" />,
                  },
                }}
                variant="outlined"
              />
            </div>
          )}
        </div>

        {/* Search Button */}
        <div>
          <Button
            fullWidth
            variant="contained"
            size="large"
            onClick={handlers.handleSearch}
            disabled={!isSearchValid()}
            startIcon={<Search />}
            className="font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-200 bg-gray-700 dark:bg-gray-500!"
            sx={{
              textTransform: "none",
              fontSize: "1rem",
              fontWeight: 500,
            }}
          >
            Explore
          </Button>
        </div>

        {/* Search Summary */}
        <Box className="pt-4 border-t border-gray-200">
          <Typography variant="body2" className="mb-2">
            Search Summary:
          </Typography>
          <div className="flex flex-wrap gap-2">
            <Chip
              label={`${
                searchData.tripType.charAt(0).toUpperCase() +
                searchData.tripType.slice(1)
              }`}
              size="small"
              variant="outlined"
            />
            <Chip
              label={`${searchData.passengers} passenger${
                searchData.passengers > 1 ? "s" : ""
              }`}
              size="small"
              variant="outlined"
            />
            <Chip
              label={searchData.travelClass
                .split("_")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")}
              size="small"
              variant="outlined"
            />
            {searchData.origin && (
              <Chip
                label={`From: ${searchData.origin.presentation.title}`}
                size="small"
                variant="outlined"
              />
            )}
            {searchData.destination && (
              <Chip
                label={`To: ${searchData.destination.presentation.title}`}
                size="small"
                variant="outlined"
              />
            )}
          </div>
        </Box>
      </CardContent>
    </Card>
  );
};
