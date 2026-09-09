CREATE TABLE "inquiries" (
	"id" serial PRIMARY KEY,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"phone" text DEFAULT '',
	"car_id" integer,
	"message" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);
