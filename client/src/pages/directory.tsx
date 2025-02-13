import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import SearchFilters from "@/components/search-filters";
import ClinicList from "@/components/clinic-list";
import type { Clinic } from "@shared/schema";

export default function Directory() {
  const [searchParams, setSearchParams] = useState<{
    state?: string;
    city?: string;
    pinCode?: string;
  }>({});

  const queryKey = searchParams.pinCode 
    ? [`/api/clinics/pincode/${searchParams.pinCode}`]
    : searchParams.city
    ? [`/api/clinics/city/${searchParams.city}`]
    : searchParams.state
    ? [`/api/clinics/state/${searchParams.state}`]
    : ['/api/clinics'];

  const { data: clinics, isLoading } = useQuery<Clinic[]>({
    queryKey,
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
          Dental Clinic Directory
        </h1>
        
        <Card className="mb-8">
          <CardContent className="pt-6">
            <SearchFilters
              onSearch={setSearchParams}
            />
          </CardContent>
        </Card>

        <ClinicList 
          clinics={clinics || []} 
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
