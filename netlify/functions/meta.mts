import type { Config } from '@netlify/functions';
import cars from './data/cars.json' with { type: 'json' };

export default async () => {
  const brands = [...new Set(cars.map((c) => c.brand))].sort();
  const categories = [...new Set(cars.map((c) => c.category))].sort();
  return Response.json({ brands, categories });
};

export const config: Config = {
  path: '/api/meta',
  method: 'GET',
};
