import type { Config } from '@netlify/functions';
import cars from './data/cars.json' with { type: 'json' };

export default async (req: Request) => {
  const url = new URL(req.url);
  const search = url.searchParams.get('search');
  const category = url.searchParams.get('category');
  const brand = url.searchParams.get('brand');
  const minPrice = url.searchParams.get('minPrice');
  const maxPrice = url.searchParams.get('maxPrice');
  const sort = url.searchParams.get('sort');

  let result = [...cars];

  if (search) {
    const q = search.toLowerCase();
    result = result.filter(
      (car) =>
        car.name.toLowerCase().includes(q) ||
        car.brand.toLowerCase().includes(q) ||
        car.description.toLowerCase().includes(q)
    );
  }

  if (category) {
    result = result.filter((car) => car.category === category);
  }

  if (brand) {
    result = result.filter((car) => car.brand === brand);
  }

  if (minPrice) {
    const min = Number(minPrice);
    result = result.filter((car) => car.price >= min);
  }

  if (maxPrice) {
    const max = Number(maxPrice);
    result = result.filter((car) => car.price <= max);
  }

  if (sort === 'price-asc') {
    result.sort((a, b) => a.price - b.price);
  } else if (sort === 'price-desc') {
    result.sort((a, b) => b.price - a.price);
  } else if (sort === 'year-desc') {
    result.sort((a, b) => b.year - a.year);
  } else if (sort === 'year-asc') {
    result.sort((a, b) => a.year - b.year);
  }

  return Response.json(result);
};

export const config: Config = {
  path: '/api/cars',
  method: 'GET',
};
