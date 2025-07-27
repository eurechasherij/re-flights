import { searchAirports, type AirportResult } from "@/networks/airportResource";
import { Autocomplete, TextField, CircularProgress } from "@mui/material";
import { debounce, capitalize } from "radash";
import { useMemo, useState, useCallback, type FC, type ReactNode } from "react";

interface AirportSearchProps {
  value: AirportResult | null;
  onChange: (airport: AirportResult | null) => void;
  label: string;
  placeholder: string;
  startIcon?: ReactNode;
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
}

export const AirportSearch: FC<AirportSearchProps> = ({
  value,
  onChange,
  label,
  placeholder,
  startIcon,
  disabled = false,
  error = false,
  helperText,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { airports, trigger } = searchAirports({
    query: inputValue,
    locale: "en-US",
  });

  const debouncedTrigger = useMemo(
    () => debounce({ delay: 300 }, async () => {
      setIsLoading(true);
      try {
        await trigger();
      } catch (error) {
        console.error("Failed to search airports:", error);
      } finally {
        setIsLoading(false);
      }
    }),
    [trigger]
  );

  const handleInputChange = useCallback(
    (_event: React.SyntheticEvent, newInputValue: string) => {
      setInputValue(newInputValue);

      if (newInputValue.length > 2) {
        debouncedTrigger();
      } else {
        setIsLoading(false);
      }
    },
    [debouncedTrigger]
  );

  const handleSelectionChange = useCallback(
    (_event: React.SyntheticEvent, newValue: AirportResult | null) => {
      onChange(newValue);
    },
    [onChange]
  );

  const getOptionLabel = useCallback((option: AirportResult) => {
    return option.presentation.title;
  }, []);

  const isOptionEqualToValue = useCallback(
    (option: AirportResult, value: AirportResult) => {
      return option.navigation.entityId === value.navigation.entityId;
    },
    []
  );

  const renderOption = useCallback(
    (props: React.HTMLAttributes<HTMLLIElement>, option: AirportResult) => (
      <li {...props} key={option.navigation.entityId}>
        <div>
          <div style={{ fontWeight: 500 }}>
            {option.presentation.title} - {capitalize(option.navigation.entityType)}
          </div>
          <div style={{ fontSize: "0.875rem", color: "text.secondary" }}>
            {option.presentation.subtitle}
          </div>
        </div>
      </li>
    ),
    []
  );

  return (
    <Autocomplete
      fullWidth
      value={value}
      onChange={handleSelectionChange}
      inputValue={inputValue}
      onInputChange={handleInputChange}
      options={airports || []}
      getOptionLabel={getOptionLabel}
      isOptionEqualToValue={isOptionEqualToValue}
      renderOption={renderOption}
      loading={isLoading}
      disabled={disabled}
      noOptionsText={
        inputValue.length <= 2
          ? "Type at least 3 characters to search"
          : "No airports found"
      }
      filterOptions={(x) => x} // Disable client-side filtering since we use server-side search
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          placeholder={placeholder}
          error={error}
          helperText={helperText}
          variant="outlined"
          slotProps={{
            input: {
              ...params.InputProps,
              startAdornment: (
                <>
                  {startIcon}
                  {params.InputProps.startAdornment}
                </>
              ),
              endAdornment: (
                <>
                  {isLoading && <CircularProgress color="inherit" size={20} />}
                  {params.InputProps.endAdornment}
                </>
              ),
            },
          }}
        />
      )}
    />
  );
};
