import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { contactRequestSchema } from "@shared/schema";

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
    res.json(contact);
  });

  return createServer(app);
}
