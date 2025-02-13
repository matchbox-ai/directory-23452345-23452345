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
    <div className="min-h-screen bg-blue-50">
      <div className="container mx-auto py-12 px-4">
        <div className="flex items-center gap-6 mb-8">
          <img 
            src="/assets/toothlens-logo.png" 
            alt="Toothlens Logo" 
            className="h-16 w-auto object-contain"
          />
          <div>
            <h1 className="text-4xl font-bold text-gray-800">
              Find a Dental Clinic
            </h1>
            <p className="text-lg text-gray-600">
              Search our network of trusted dental clinics across India
            </p>
          </div>
        </div>

        <Card className="mb-8 shadow-md hover:shadow-lg transition-shadow duration-200">
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