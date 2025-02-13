import { type Clinic, type ContactRequest, type InsertContactRequest } from "@shared/schema";

export interface IStorage {
  getClinics(): Promise<Clinic[]>;
  getClinicsByState(state: string): Promise<Clinic[]>;
  getClinicsByCity(city: string): Promise<Clinic[]>;
  getClinicsByPinCode(pinCode: string): Promise<Clinic[]>;
  createContactRequest(request: InsertContactRequest): Promise<ContactRequest>;
}

export class MemStorage implements IStorage {
  private clinics: Map<number, Clinic>;
  private contactRequests: Map<number, ContactRequest>;
  private currentClinicId: number;
  private currentRequestId: number;

  constructor() {
    this.clinics = new Map();
    this.contactRequests = new Map();
    this.currentClinicId = 1;
    this.currentRequestId = 1;

    // Add some sample clinics
    const sampleClinics: Omit<Clinic, "id">[] = [
      {
        name: "Smile Dental Care",
        address: "123 Main St",
        city: "Mumbai",
        state: "Maharashtra",
        pinCode: "400001",
        phone: "1234567890",
        email: "smile@example.com"
      },
      {
        name: "Dental Excellence",
        address: "456 Park Road",
        city: "Delhi",
        state: "Delhi",
        pinCode: "110001",
        phone: "9876543210",
        email: "excellence@example.com"
      }
    ];

    sampleClinics.forEach(clinic => {
      this.clinics.set(this.currentClinicId, {
        ...clinic,
        id: this.currentClinicId++
      });
    });
  }

  async getClinics(): Promise<Clinic[]> {
    return Array.from(this.clinics.values());
  }

  async getClinicsByState(state: string): Promise<Clinic[]> {
    return Array.from(this.clinics.values()).filter(
      clinic => clinic.state.toLowerCase() === state.toLowerCase()
    );
  }

  async getClinicsByCity(city: string): Promise<Clinic[]> {
    return Array.from(this.clinics.values()).filter(
      clinic => clinic.city.toLowerCase() === city.toLowerCase()
    );
  }

  async getClinicsByPinCode(pinCode: string): Promise<Clinic[]> {
    return Array.from(this.clinics.values()).filter(
      clinic => clinic.pinCode === pinCode
    );
  }

  async createContactRequest(request: InsertContactRequest): Promise<ContactRequest> {
    const id = this.currentRequestId++;
    const contactRequest = { ...request, id };
    this.contactRequests.set(id, contactRequest);
    return contactRequest;
  }
}

export const storage = new MemStorage();
