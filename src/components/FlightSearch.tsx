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
  type SelectChangeEvent,
} from "@mui/material";
import { useState } from "react";

interface FlightSearchState {
  tripType: string;
  origin: string;
  destination: string;
  departureDate: string;
  returnDate: string;
  passengers: number;
  travelClass: string;
}

export const FlightSearch = () => {
  const [searchData, setSearchData] = useState<FlightSearchState>({
    tripType: "roundtrip",
    origin: "",
    destination: "",
    departureDate: "",
    returnDate: "",
    passengers: 1,
    travelClass: "economy",
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
      travelClass: event.target.value,
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

  const handleSearch = () => {
    console.log("Search flights:", searchData);
    // TODO: Implement flight search logic
  };

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
              onChange={handleTripTypeChange}
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
              onChange={handlePassengerChange}
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
              onChange={handleClassChange}
              size="small"
            >
              <MenuItem value="economy">Economy</MenuItem>
              <MenuItem value="premium">Premium economy</MenuItem>
              <MenuItem value="business">Business</MenuItem>
              <MenuItem value="first">First</MenuItem>
            </Select>
          </FormControl>
        </div>

        {/* Location and Date Selection */}
        <div className="w-full flex flex-row gap-4 items-end">
          {/* Origin */}
          <div className="grow">
            <TextField
              fullWidth
              label="From"
              placeholder="Where from?"
              value={searchData.origin}
              onChange={handleInputChange("origin")}
              slotProps={{
                input: {
                  startAdornment: <FlightTakeoff className="mr-" />,
                },
              }}
              variant="outlined"
            />
          </div>

          {/* Swap Button */}
          <div className="flex-1 flex justify-center">
            <IconButton
              onClick={swapLocations}
              className="bg-blue-50 hover:bg-blue-100 border border-blue-200"
              size="large"
            >
              <SwapHoriz className="text-blue-600" />
            </IconButton>
          </div>

          {/* Destination */}
          <div className="grow">
            <TextField
              fullWidth
              label="To"
              placeholder="Where to?"
              value={searchData.destination}
              onChange={handleInputChange("destination")}
              slotProps={{
                input: {
                  startAdornment: <FlightLand className="mr-" />,
                },
              }}
              variant="outlined"
            />
          </div>

          {/* Departure Date */}
          <div className="grow">
            <TextField
              fullWidth
              label="Departure"
              type="date"
              value={searchData.departureDate}
              onChange={handleInputChange("departureDate")}
              slotProps={{
                input: {
                  startAdornment: <CalendarToday className="mr-" />,
                },
              }}
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
            />
          </div>

          {/* Return Date */}
          {searchData.tripType !== "oneway" && (
            <div className="grow">
              <TextField
                fullWidth
                label="Return"
                type="date"
                value={searchData.returnDate}
                onChange={handleInputChange("returnDate")}
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
            onClick={handleSearch}
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
              label={
                searchData.travelClass.charAt(0).toUpperCase() +
                searchData.travelClass.slice(1)
              }
              size="small"
              variant="outlined"
            />
            {searchData.origin && (
              <Chip
                label={`From: ${searchData.origin}`}
                size="small"
                variant="outlined"
              />
            )}
            {searchData.destination && (
              <Chip
                label={`To: ${searchData.destination}`}
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
