import type { Config } from '@netlify/functions';
import { db } from '../../db/index.js';
import { inquiries } from '../../db/schema.js';

export default async (req: Request) => {
  const body = await req.json().catch(() => ({}));
  const { name, email, phone, carId, message } = body;

  if (!name || !email || !message) {
    return Response.json({ error: 'Name, email and message are required.' }, { status: 400 });
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    return Response.json({ error: 'A valid email address is required.' }, { status: 400 });
  }

  const [inquiry] = await db
    .insert(inquiries)
    .values({
      name,
      email,
      phone: phone || '',
      carId: carId ? Number(carId) : null,
      message,
    })
    .returning();

  return Response.json({ success: true, inquiry }, { status: 201 });
};

export const config: Config = {
  path: '/api/inquiries',
  method: 'POST',
};
