import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Badge from '../components/Badge.jsx';
import InquiryForm from '../components/InquiryForm.jsx';
import CarCard from '../components/CarCard.jsx';
import { PageLoader } from '../components/Loading.jsx';
import EmptyState from '../components/EmptyState.jsx';
import { fetchCarById, fetchCars } from '../api.js';
import { formatPrice, formatMileage } from '../utils/format.js';
import {
  IconArrowRight,
  IconBolt,
  IconFuel,
  IconGauge,
  IconGearbox,
  IconUsers,
  IconCalendar,
  IconMapPin,
  IconCarFront,
} from '../components/Icons.jsx';

export default function CarDetail() {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [imageFailed, setImageFailed] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError('');
    setImageFailed(false);

    fetchCarById(id)
      .then((data) => {
        setCar(data);
        return fetchCars({ category: data.category }).then((list) =>
          setRelated(list.filter((c) => c.id !== data.id).slice(0, 3))
        );
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <PageLoader />;
  if (error || !car) {
    return (
      <section className="container-site py-16">
        <EmptyState
          title="Car not found"
          description={error || 'The car you are looking for does not exist.'}
        />
        <div className="mt-8 text-center">
          <Link to="/inventory" className="btn-brutal">Back to Inventory</Link>
        </div>
      </section>
    );
  }

  const specs = [
    { label: 'Engine', value: car.engine, icon: IconBolt },
    { label: 'Horsepower', value: `${car.horsepower} HP`, icon: IconGauge },
    { label: 'Transmission', value: car.transmission, icon: IconGearbox },
    { label: 'Fuel Type', value: car.fuelType, icon: IconFuel },
    { label: 'Seats', value: String(car.seats), icon: IconUsers },
    { label: 'Year', value: String(car.year), icon: IconCalendar },
    { label: 'Mileage', value: `${formatMileage(car.mileage)} mi`, icon: IconGauge },
    { label: 'Color', value: car.color, icon: IconMapPin },
  ];

  return (
    <section className="container-site py-10" aria-labelledby="car-title">
      <nav className="mb-6 font-mono text-sm text-muted" aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-2">
          <li><Link to="/" className="hover:text-accent">Home</Link></li>
          <li aria-hidden="true">/</li>
          <li><Link to="/inventory" className="hover:text-accent">Inventory</Link></li>
          <li aria-hidden="true">/</li>
          <li className="text-ink">{car.name}</li>
        </ol>
      </nav>

      <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
        {/* Media + details */}
        <div>
          <div className="card-brutal overflow-hidden">
            <div className="relative aspect-[16/10] bg-smoke">
              {!imageFailed ? (
                <img
                  src={car.image}
                  alt={`${car.brand} ${car.name}`}
                  onError={() => setImageFailed(true)}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-smoke">
                  <IconCarFront className="h-24 w-24 text-ink/20" />
                </div>
              )}
              <div className="absolute left-4 top-4">
                <Badge badge={car.badge} />
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="font-display text-2xl font-bold uppercase">Overview</h2>
            <p className="mt-3 max-w-2xl leading-relaxed text-ink/80">{car.description}</p>
          </div>

          <div className="mt-8">
            <h2 className="font-display text-2xl font-bold uppercase">Specifications</h2>
            <dl className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {specs.map(({ label, value, icon: Icon }) => (
                <div key={label} className="card-brutal p-4">
                  <Icon className="h-5 w-5 text-accent" />
                  <dt className="mt-2 font-mono text-xs uppercase tracking-wider text-muted">{label}</dt>
                  <dd className="mt-1 font-display text-sm font-bold">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* Sidebar: price + inquiry */}
        <aside className="space-y-6 lg:sticky lg:top-20 lg:self-start" aria-label="Enquiry">
          <div className="card-brutal p-6">
            <p className="font-mono text-xs uppercase tracking-wider text-accent">{car.brand}</p>
            <h1 id="car-title" className="mt-1 font-display text-3xl font-bold tracking-tight">
              {car.name}
            </h1>
            <p className="mt-3 font-display text-3xl font-bold">{formatPrice(car.price)}</p>
            <p className="mt-1 font-mono text-sm text-muted">or {formatPrice(Math.round(car.price / 60))}/mo · 60 mo</p>

            <ul className="mt-6 space-y-2 border-t-2 border-ink/10 pt-4 text-sm">
              <li className="flex justify-between"><span className="text-muted">Condition</span><span className="font-semibold">Certified Pre-Owned</span></li>
              <li className="flex justify-between"><span className="text-muted">Warranty</span><span className="font-semibold">3-Year / 36k mi</span></li>
              <li className="flex justify-between"><span className="text-muted">Location</span><span className="font-semibold">Los Angeles, CA</span></li>
            </ul>

            <a href={`tel:+15551234567`} className="btn-brutal mt-6 w-full">
              <IconArrowRight className="h-4 w-4" /> Call to Schedule
            </a>
          </div>

          <div className="card-brutal p-6">
            <h2 className="font-display text-lg font-bold uppercase">Enquire Now</h2>
            <div className="mt-4">
              <InquiryForm carId={car.id} carName={`${car.brand} ${car.name}`} />
            </div>
          </div>
        </aside>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div className="mt-16">
          <div className="mb-6 flex items-end justify-between">
            <h2 className="font-display text-2xl font-bold uppercase">Similar Cars</h2>
            <Link to={`/inventory?category=${car.category}`} className="inline-flex items-center gap-1 font-display text-sm font-bold uppercase tracking-wide text-accent hover:text-ink">
              View all <IconArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((c) => (
              <CarCard key={c.id} car={c} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
