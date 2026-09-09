import express from 'express';
import cors from 'cors';
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Load car data
const cars = JSON.parse(readFileSync(join(__dirname, 'data', 'cars.json'), 'utf8'));

// Serve the built React app in production
const clientDist = join(__dirname, '..', 'client', 'dist');
if (existsSync(clientDist)) {
  app.use(express.static(clientDist));
}

// GET /api/cars — list all cars, with optional filters
app.get('/api/cars', (req, res) => {
  const { search, category, brand, minPrice, maxPrice, sort } = req.query;

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

  res.json(result);
});

// GET /api/cars/:id — single car
app.get('/api/cars/:id', (req, res) => {
  const car = cars.find((c) => c.id === Number(req.params.id));
  if (!car) {
    return res.status(404).json({ error: 'Car not found' });
  }
  res.json(car);
});

// GET /api/meta — distinct brands and categories for filter UI
app.get('/api/meta', (req, res) => {
  const brands = [...new Set(cars.map((c) => c.brand))].sort();
  const categories = [...new Set(cars.map((c) => c.category))].sort();
  res.json({ brands, categories });
});

// POST /api/inquiries — save a contact inquiry
const inquiriesFile = join(__dirname, 'data', 'inquiries.json');
if (!existsSync(inquiriesFile)) {
  writeFileSync(inquiriesFile, '[]');
}

app.post('/api/inquiries', (req, res) => {
  const { name, email, phone, carId, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email and message are required.' });
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    return res.status(400).json({ error: 'A valid email address is required.' });
  }

  const inquiry = {
    id: Date.now(),
    name,
    email,
    phone: phone || '',
    carId: carId || null,
    message,
    createdAt: new Date().toISOString(),
  };

  try {
    const existing = JSON.parse(readFileSync(inquiriesFile, 'utf8'));
    existing.push(inquiry);
    writeFileSync(inquiriesFile, JSON.stringify(existing, null, 2));
  } catch (err) {
    console.error('Failed to persist inquiry:', err);
    return res.status(500).json({ error: 'Unable to save inquiry.' });
  }

  res.status(201).json({ success: true, inquiry });
});

// SPA fallback for production build
if (existsSync(clientDist)) {
  app.get('*', (req, res) => {
    res.sendFile(join(clientDist, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Car showroom API running on http://localhost:${PORT}`);
});
