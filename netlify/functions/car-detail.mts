import type { Config, Context } from '@netlify/functions';
import cars from './data/cars.json' with { type: 'json' };

export default async (_req: Request, context: Context) => {
  const car = cars.find((c) => c.id === Number(context.params.id));
  if (!car) {
    return Response.json({ error: 'Car not found' }, { status: 404 });
  }
  return Response.json(car);
};

export const config: Config = {
  path: '/api/cars/:id',
  method: 'GET',
};
