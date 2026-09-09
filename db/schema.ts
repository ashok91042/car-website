import { pgTable, serial, text, integer, timestamp } from "drizzle-orm/pg-core";

export const inquiries = pgTable("inquiries", {
  id: serial().primaryKey(),
  name: text().notNull(),
  email: text().notNull(),
  phone: text().default(""),
  carId: integer("car_id"),
  message: text().notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});
