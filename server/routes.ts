import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { contactRequestSchema } from "@shared/schema";
import { sendClinicContactEmail, sendNotifyMeEmail } from "./lib/email";

export function registerRoutes(app: Express): Server {
  app.get("/api/clinics", async (_req, res) => {
    const clinics = await storage.getClinics();
    res.json(clinics);
  });

  app.get("/api/clinics/state/:state", async (req, res) => {
    const clinics = await storage.getClinicsByState(req.params.state);
    res.json(clinics);
  });

  app.get("/api/clinics/city/:city", async (req, res) => {
    const clinics = await storage.getClinicsByCity(req.params.city);
    res.json(clinics);
  });

  app.get("/api/clinics/pincode/:pincode", async (req, res) => {
    const clinics = await storage.getClinicsByPinCode(req.params.pincode);
    res.json(clinics);
  });

  app.post("/api/contact", async (req, res) => {
    const parsed = contactRequestSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error });
    }

    const contact = await storage.createContactRequest(parsed.data);

    // Send email notification
    await sendClinicContactEmail({
      firstName: parsed.data.firstName,
      lastName: parsed.data.lastName,
      email: parsed.data.email,
      phone: parsed.data.phone,
      clinicName: parsed.data.clinicName,
      clinicLocation: parsed.data.clinicLocation,
      message: parsed.data.message
    });

    res.json(contact);
  });

  app.post("/api/notify-me", async (req, res) => {
    const { firstName, lastName, email, phone, location } = req.body;

    if (!firstName || !lastName || !email || !phone || !location) {
      return res.status(400).json({ 
        error: "All fields are required" 
      });
    }

    try {
      await sendNotifyMeEmail({
        firstName,
        lastName,
        email,
        phone,
        location
      });

      res.json({ success: true });
    } catch (error) {
      console.error('Failed to send notification email:', error);
      res.status(500).json({ 
        error: "Failed to process notification request" 
      });
    }
  });

  return createServer(app);
}