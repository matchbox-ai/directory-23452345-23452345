import { clinics, contactRequests, type Clinic, type ContactRequest, type InsertContactRequest } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  getClinics(): Promise<Clinic[]>;
  getClinicsByState(state: string): Promise<Clinic[]>;
  getClinicsByCity(city: string): Promise<Clinic[]>;
  getClinicsByPinCode(pinCode: string): Promise<Clinic[]>;
  createContactRequest(request: InsertContactRequest): Promise<ContactRequest>;
}

export class DatabaseStorage implements IStorage {
  async getClinics(): Promise<Clinic[]> {
    return await db.select().from(clinics);
  }

  async getClinicsByState(state: string): Promise<Clinic[]> {
    return await db
      .select()
      .from(clinics)
      .where(eq(clinics.state, state));
  }

  async getClinicsByCity(city: string): Promise<Clinic[]> {
    return await db
      .select()
      .from(clinics)
      .where(eq(clinics.city, city));
  }

  async getClinicsByPinCode(pinCode: string): Promise<Clinic[]> {
    return await db
      .select()
      .from(clinics)
      .where(eq(clinics.pinCode, pinCode));
  }

  async createContactRequest(request: InsertContactRequest): Promise<ContactRequest> {
    const [contactRequest] = await db
      .insert(contactRequests)
      .values(request)
      .returning();
    return contactRequest;
  }
}

export const storage = new DatabaseStorage();