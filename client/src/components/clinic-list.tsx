import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Building2 } from "lucide-react";
import ContactForm from "./contact-form";
import SignupModal from "./signup-modal";
import type { Clinic } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";

interface ClinicListProps {
  clinics: Clinic[];
  isLoading: boolean;
  searchParams?: {
    state?: string;
    city?: string;
    pinCode?: string;
  };
}

export default function ClinicList({ clinics, isLoading, searchParams }: ClinicListProps) {
  const [selectedClinic, setSelectedClinic] = useState<Clinic | null>(null);
  const [showSignupModal, setShowSignupModal] = useState(false);

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
    const location = searchParams?.city || searchParams?.state || searchParams?.pinCode || "this area";

    return (
      <>
        <Card className="shadow-md">
          <CardContent className="py-12 text-center">
            <Building2 className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              We're Expanding Our Network
            </h3>
            <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
              We're currently working on building a network of trusted dental practices in {location}. Sign up below and we'll notify you when new clinics join our network in your area.
            </p>
            <Button 
              className="bg-blue-500 hover:bg-blue-600 transition-colors"
              onClick={() => setShowSignupModal(true)}
            >
              Notify Me
            </Button>
          </CardContent>
        </Card>
        <SignupModal 
          open={showSignupModal}
          onClose={() => setShowSignupModal(false)}
        />
      </>
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
                  <MapPin className="w-5 h-5 mt-1 text-blue-500 flex-shrink-0" />
                  <div className="text-gray-600">
                    <p>{clinic.address}</p>
                    <p>{clinic.city}, {clinic.state}</p>
                    <p>PIN: {clinic.pinCode}</p>
                  </div>
                </div>

                {clinic.phone && (
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-blue-500 flex-shrink-0" />
                    <span className="text-gray-600 break-all">{clinic.phone}</span>
                  </div>
                )}

                {clinic.email && (
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-blue-500 flex-shrink-0" />
                    <span className="text-gray-600 break-all">{clinic.email.toLowerCase()}</span>
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

      <SignupModal 
        open={showSignupModal}
        onClose={() => setShowSignupModal(false)}
      />
    </>
  );
}