import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail } from "lucide-react";
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3].map(i => (
          <Card key={i}>
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
      <Card>
        <CardContent className="py-8 text-center text-muted-foreground">
          No clinics found. Try different search criteria.
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {clinics.sort((a, b) => a.name.localeCompare(b.name)).map((clinic) => (
          <Card key={clinic.id}>
            <CardHeader>
              <CardTitle className="text-xl font-bold">
                {clinic.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-2">
                  <MapPin className="w-5 h-5 mt-1 text-muted-foreground" />
                  <div>
                    <p>{clinic.address}</p>
                    <p>{clinic.city}, {clinic.state}</p>
                    <p>PIN: {clinic.pinCode}</p>
                  </div>
                </div>
                
                {clinic.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span>{clinic.phone}</span>
                  </div>
                )}
                
                {clinic.email && (
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span>{clinic.email}</span>
                  </div>
                )}

                <Button 
                  className="w-full"
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
