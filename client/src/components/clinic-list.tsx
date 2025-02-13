import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Building2 } from "lucide-react";
import ContactForm from "./contact-form";
import type { Clinic } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";

interface ClinicListProps {
  clinics: Clinic[];
  isLoading: boolean;
}

export default function ClinicList({ clinics, isLoading }: ClinicListProps) {
  const [selectedClinic, setSelectedClinic] = useState<Clinic | null>(null);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map(i => (
          <Card key={i} className="shadow-md hover:shadow-lg transition-shadow duration-200">
            <CardHeader>
              <Skeleton className="h-8 w-3/4" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (clinics.length === 0) {
    return (
      <Card className="shadow-md">
        <CardContent className="py-12 text-center">
          <Building2 className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <p className="text-lg text-gray-600">
            No clinics found. Try different search criteria.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clinics.sort((a, b) => a.name.localeCompare(b.name)).map((clinic) => (
          <Card 
            key={clinic.id}
            className="shadow-md hover:shadow-lg transition-all duration-200 hover:translate-y-[-2px]"
          >
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-800">
                {clinic.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 mt-1 text-blue-500" />
                  <div className="text-gray-600">
                    <p>{clinic.address}</p>
                    <p>{clinic.city}, {clinic.state}</p>
                    <p>PIN: {clinic.pinCode}</p>
                  </div>
                </div>

                {clinic.phone && (
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-blue-500" />
                    <span className="text-gray-600">{clinic.phone}</span>
                  </div>
                )}

                {clinic.email && (
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-blue-500" />
                    <span className="text-gray-600">{clinic.email}</span>
                  </div>
                )}

                <Button 
                  className="w-full bg-blue-500 hover:bg-blue-600 transition-colors"
                  onClick={() => setSelectedClinic(clinic)}
                >
                  Contact Clinic
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <ContactForm
        clinic={selectedClinic}
        onClose={() => setSelectedClinic(null)}
      />
    </>
  );
}