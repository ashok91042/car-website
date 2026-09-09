import { useState } from 'react';
import { Link } from 'react-router-dom';
import Badge from './Badge.jsx';
import { IconFuel, IconGauge, IconGearbox, IconArrowRight, IconCarFront } from './Icons.jsx';
import { formatPrice, formatMileage } from '../utils/format.js';

export default function CarCard({ car }) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <article className="card-brutal group flex flex-col overflow-hidden">
      <Link to={`/cars/${car.id}`} className="relative block aspect-[4/3] overflow-hidden border-b-2 border-ink bg-smoke">
        {!imageFailed ? (
          <img
            src={car.image}
            alt={`${car.brand} ${car.name}`}
            loading="lazy"
            onError={() => setImageFailed(true)}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-smoke">
            <IconCarFront className="h-16 w-16 text-ink/20" />
          </div>
        )}
        <div className="absolute left-3 top-3">
          <Badge badge={car.badge} />
        </div>
        <span className="absolute right-3 top-3 tag-brutal bg-ink text-paper">{car.category}</span>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <p className="font-mono text-xs uppercase tracking-wider text-accent">{car.brand}</p>
        <h3 className="mt-1 font-display text-2xl font-bold leading-tight">
          <Link to={`/cars/${car.id}`} className="hover:text-accent">
            {car.name}
          </Link>
        </h3>

        <ul className="mt-4 grid grid-cols-3 gap-2 border-y-2 border-ink/10 py-3 text-center">
          <li className="flex flex-col items-center gap-1">
            <IconFuel className="h-4 w-4 text-muted" />
            <span className="font-mono text-xs font-semibold">{car.fuelType}</span>
          </li>
          <li className="flex flex-col items-center gap-1">
            <IconGauge className="h-4 w-4 text-muted" />
            <span className="font-mono text-xs font-semibold">{car.horsepower} HP</span>
          </li>
          <li className="flex flex-col items-center gap-1">
            <IconGearbox className="h-4 w-4 text-muted" />
            <span className="font-mono text-xs font-semibold">{car.transmission}</span>
          </li>
        </ul>

        <dl className="mt-4 space-y-1 text-sm">
          <div className="flex justify-between">
            <dt className="text-muted">Mileage</dt>
            <dd className="font-mono">{(formatMileage(car.mileage))} mi</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted">Year</dt>
            <dd className="font-mono">{car.year}</dd>
          </div>
        </dl>

        <div className="mt-5 flex items-center justify-between border-t-2 border-ink/10 pt-4">
          <p className="font-display text-xl font-bold">{formatPrice(car.price)}</p>
          <Link
            to={`/cars/${car.id}`}
            className="inline-flex items-center gap-1 font-display text-sm font-bold uppercase tracking-wide text-accent hover:text-ink"
          >
            View <IconArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}
