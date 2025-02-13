import { pgTable, text, serial, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const clinics = pgTable("clinics", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  address: text("address").notNull(),
  city: text("city").notNull(),
  state: text("state").notNull(),
  pinCode: text("pin_code").notNull(),
  phone: text("phone"),
  email: text("email")
});

export const contactRequests = pgTable("contact_requests", {
  id: serial("id").primaryKey(),
  clinicId: integer("clinic_id").notNull(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  city: text("city").notNull(),
  state: text("state").notNull()
});

export const contactRequestSchema = createInsertSchema(contactRequests)
  .omit({ id: true })
  .extend({
    email: z.string().email(),
    phone: z.string().min(10).max(12)
  });

export type Clinic = typeof clinics.$inferSelect;
export type ContactRequest = typeof contactRequests.$inferSelect;
export type InsertContactRequest = z.infer<typeof contactRequestSchema>;
