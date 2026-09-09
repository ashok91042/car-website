import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CarCard from '../components/CarCard.jsx';
import { GridSkeleton } from '../components/Loading.jsx';
import { fetchCars } from '../api.js';
import { IconArrowRight, IconCarFront, IconBolt, IconGauge } from '../components/Icons.jsx';

const categoryLinks = [
  { label: 'Sports', link: '/inventory?category=Sports', icon: IconGauge },
  { label: 'Electric', link: '/inventory?category=Electric', icon: IconBolt },
  { label: 'SUV', link: '/inventory?category=SUV', icon: IconCarFront },
  { label: 'Luxury', link: '/inventory?category=Luxury', icon: IconCarFront },
];

const stats = [
  { value: '120+', label: 'Cars in Stock' },
  { value: '14', label: 'Brands' },
  { value: '3 yr', label: 'Warranty' },
  { value: '4.9', label: 'Avg. Rating' },
];

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCars()
      .then((cars) => {
        const featuredCars = cars.filter((c) => c.badge === 'Featured' || c.badge === 'New');
        setFeatured(featuredCars.length ? featuredCars.slice(0, 3) : cars.slice(0, 3));
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="border-b-2 border-ink bg-accent">
        <div className="container-site grid gap-8 py-16 md:grid-cols-2 md:py-24">
          <div className="flex flex-col justify-center">
            <p className="tag-brutal bg-ink text-paper">Est. 1998 · Los Angeles</p>
            <h1 className="mt-6 font-display text-5xl font-bold leading-[0.95] tracking-tight sm:text-6xl">
              Find your
              <br />
              next <span className="bg-ink px-2 text-paper">obsession</span>.
            </h1>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-ink/80">
              A hand-picked collection of performance, luxury and electric cars. Each one inspected, certified and ready for the road.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/inventory" className="btn-brutal">
                Browse Inventory <IconArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/contact" className="btn-brutal-accent">
                Book a Test Drive
              </Link>
            </div>
          </div>

          <div className="relative hidden items-center justify-center md:flex">
            <div className="card-brutal w-full max-w-sm bg-paper p-8">
              <div className="flex items-center justify-between border-b-2 border-ink pb-4">
                <span className="font-display text-lg font-bold uppercase">Featured</span>
                <span className="tag-brutal bg-highlight">Hot</span>
              </div>
              <div className="mt-6 space-y-6">
                <div>
                  <p className="font-mono text-xs uppercase tracking-wider text-accent">Aurora</p>
                  <p className="font-display text-3xl font-bold">Volt GT</p>
                  <p className="mt-1 font-mono text-sm text-muted">620 HP · Twin-Turbo V8</p>
                </div>
                <div className="flex items-center gap-4 border-t-2 border-ink/10 pt-4">
                  <p className="font-display text-2xl font-bold">$98,000</p>
                  <Link to="/cars/1" className="btn-brutal ml-auto">View</Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t-2 border-ink bg-ink">
          <div className="container-site grid grid-cols-2 gap-6 py-6 md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="text-center md:text-left">
                <p className="font-display text-2xl font-bold text-paper">{s.value}</p>
                <p className="font-mono text-xs uppercase tracking-wider text-paper/60">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured cars */}
      <section className="container-site py-16" aria-labelledby="featured-heading">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-sm uppercase tracking-wider text-accent">Handpicked</p>
            <h2 id="featured-heading" className="mt-1 font-display text-4xl font-bold tracking-tight">
              Featured Cars
            </h2>
          </div>
          <Link to="/inventory" className="inline-flex items-center gap-2 font-display text-sm font-bold uppercase tracking-wide text-accent hover:text-ink">
            View all <IconArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {loading ? (
          <GridSkeleton count={3} />
        ) : error ? (
          <p className="border-2 border-ink bg-smoke p-6 text-sm">{error}</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        )}
      </section>

      {/* Categories */}
      <section className="border-y-2 border-ink bg-smoke py-16" aria-labelledby="categories-heading">
        <div className="container-site">
          <p className="font-mono text-sm uppercase tracking-wider text-accent">Shop by type</p>
          <h2 id="categories-heading" className="mt-1 font-display text-4xl font-bold tracking-tight">
            Browse Categories
          </h2>
          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
            {categoryLinks.map(({ label, link, icon: Icon }) => (
              <Link
                key={label}
                to={link}
                className="card-brutal group flex flex-col items-start gap-4 p-6"
              >
                <span className="flex h-12 w-12 items-center justify-center border-2 border-ink bg-paper shadow-brutal-sm group-hover:bg-accent">
                  <Icon className="h-6 w-6" />
                </span>
                <span className="font-display text-lg font-bold uppercase">{label}</span>
                <span className="flex items-center gap-1 font-mono text-xs uppercase tracking-wide text-muted group-hover:text-accent">
                  Explore <IconArrowRight className="h-3 w-3" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-site py-16">
        <div className="card-brutal grid gap-8 bg-ink p-8 text-paper md:grid-cols-2 md:p-12">
          <div>
            <h2 className="font-display text-4xl font-bold leading-tight">
              Want to sell your car?
            </h2>
            <p className="mt-4 max-w-md text-paper/70">
              Get a free valuation and a guaranteed price for your current car. Trade-in or sell outright — it takes five minutes.
            </p>
          </div>
          <div className="flex items-end justify-start md:justify-end">
            <Link to="/contact" className="btn-brutal-accent">
              Get a Valuation <IconArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
