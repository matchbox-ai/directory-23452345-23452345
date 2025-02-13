import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const STATES = ["Maharashtra", "Delhi", "Karnataka", "Tamil Nadu"];
const CITIES = {
  "Maharashtra": ["Mumbai", "Pune", "Nagpur"],
  "Delhi": ["New Delhi", "South Delhi"],
  "Karnataka": ["Bangalore", "Mysore"],
  "Tamil Nadu": ["Chennai", "Coimbatore"]
};

interface SearchFiltersProps {
  onSearch: (params: { state?: string; city?: string; pinCode?: string }) => void;
}

export default function SearchFilters({ onSearch }: SearchFiltersProps) {
  const [state, setState] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [pinCode, setPinCode] = useState<string>("");

  const handleSearch = () => {
    onSearch({
      state: state || undefined,
      city: city || undefined,
      pinCode: pinCode || undefined
    });
  };

  const handleClear = () => {
    setState("");
    setCity("");
    setPinCode("");
    onSearch({});
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Select value={state} onValueChange={setState}>
          <SelectTrigger>
            <SelectValue placeholder="Select State" />
          </SelectTrigger>
          <SelectContent>
            {STATES.map(state => (
              <SelectItem key={state} value={state}>
                {state}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={city} onValueChange={setCity} disabled={!state}>
          <SelectTrigger>
            <SelectValue placeholder="Select City" />
          </SelectTrigger>
          <SelectContent>
            {state && CITIES[state as keyof typeof CITIES].map(city => (
              <SelectItem key={city} value={city}>
                {city}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Input
          placeholder="Search by PIN code"
          value={pinCode}
          onChange={(e) => setPinCode(e.target.value)}
        />
      </div>

      <div className="flex gap-2 justify-end">
        <Button variant="outline" onClick={handleClear}>
          Clear
        </Button>
        <Button onClick={handleSearch}>
          Search
        </Button>
      </div>
    </div>
  );
}
