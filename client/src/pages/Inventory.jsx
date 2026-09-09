import { useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import CarCard from '../components/CarCard.jsx';
import { GridSkeleton } from '../components/Loading.jsx';
import EmptyState from '../components/EmptyState.jsx';
import { fetchCars, fetchMeta } from '../api.js';
import { IconSearch, IconClose, IconChevronDown } from '../components/Icons.jsx';

const sortOptions = [
  { value: '', label: 'Recommended' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'year-desc', label: 'Year: Newest' },
  { value: 'year-asc', label: 'Year: Oldest' },
];

export default function Inventory() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [cars, setCars] = useState([]);
  const [meta, setMeta] = useState({ brands: [], categories: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const search = searchParams.get('search') || '';
  const category = searchParams.get('category') || '';
  const brand = searchParams.get('brand') || '';
  const maxPrice = searchParams.get('maxPrice') || '';
  const sort = searchParams.get('sort') || '';

  const [searchInput, setSearchInput] = useState(search);
  const debounceRef = useRef(null);

  // Sync local search input when URL changes externally
  useEffect(() => {
    setSearchInput(search);
  }, [search]);

  // Debounce search input -> URL
  useEffect(() => {
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      if (searchInput !== search) {
        updateParam('search', searchInput);
      }
    }, 300);
    return () => clearTimeout(debounceRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchInput]);

  useEffect(() => {
    fetchMeta().then(setMeta).catch(() => {});
  }, []);

  useEffect(() => {
    setLoading(true);
    const params = {};
    if (search) params.search = search;
    if (category) params.category = category;
    if (brand) params.brand = brand;
    if (maxPrice) params.maxPrice = maxPrice;
    if (sort) params.sort = sort;

    fetchCars(params)
      .then((data) => {
        setCars(data);
        setError('');
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [search, category, brand, maxPrice, sort]);

  function updateParam(key, value) {
    const next = new URLSearchParams(searchParams);
    if (value) {
      next.set(key, value);
    } else {
      next.delete(key);
    }
    setSearchParams(next, { replace: true });
  }

  function clearAll() {
    setSearchInput('');
    setSearchParams({}, { replace: true });
  }

  const hasFilters = Boolean(search || category || brand || maxPrice || sort);

  const resultCountLabel = useMemo(() => {
    if (loading) return 'Loading…';
    return `${cars.length} ${cars.length === 1 ? 'car' : 'cars'} found`;
  }, [cars.length, loading]);

  return (
    <section className="container-site py-12" aria-labelledby="inventory-heading">
      <header className="mb-8">
        <p className="font-mono text-sm uppercase tracking-wider text-accent">Showroom</p>
        <h1 id="inventory-heading" className="mt-1 font-display text-4xl font-bold tracking-tight sm:text-5xl">
          Browse Inventory
        </h1>
        <p className="mt-3 max-w-xl text-muted">
          Explore our full collection. Filter by category, brand, price or search by name.
        </p>
      </header>

      <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
        {/* Filters */}
        <aside className="lg:sticky lg:top-20 lg:self-start" aria-label="Filters">
          <div className="card-brutal space-y-6 p-6">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-lg font-bold uppercase">Filters</h2>
              {hasFilters && (
                <button
                  type="button"
                  onClick={clearAll}
                  className="inline-flex items-center gap-1 font-mono text-xs uppercase tracking-wide text-accent hover:text-ink"
                >
                  <IconClose className="h-3 w-3" /> Clear all
                </button>
              )}
            </div>

            {/* Search */}
            <div>
              <label htmlFor="search" className="label-brutal">Search</label>
              <div className="relative">
                <IconSearch className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                <input
                  id="search"
                  type="search"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Name, brand, keyword…"
                  className="input-brutal !pl-10"
                />
              </div>
            </div>

            {/* Category */}
            <div>
              <label htmlFor="category" className="label-brutal">Category</label>
              <div className="relative">
                <select
                  id="category"
                  value={category}
                  onChange={(e) => updateParam('category', e.target.value)}
                  className="input-brutal appearance-none"
                >
                  <option value="">All categories</option>
                  {meta.categories.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
                <IconChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
              </div>
            </div>

            {/* Brand */}
            <div>
              <label htmlFor="brand" className="label-brutal">Brand</label>
              <div className="relative">
                <select
                  id="brand"
                  value={brand}
                  onChange={(e) => updateParam('brand', e.target.value)}
                  className="input-brutal appearance-none"
                >
                  <option value="">All brands</option>
                  {meta.brands.map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
                <IconChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
              </div>
            </div>

            {/* Max price */}
            <div>
              <label htmlFor="maxPrice" className="label-brutal">Max Price</label>
              <div className="relative">
                <select
                  id="maxPrice"
                  value={maxPrice}
                  onChange={(e) => updateParam('maxPrice', e.target.value)}
                  className="input-brutal appearance-none"
                >
                  <option value="">Any price</option>
                  <option value="30000">Under $30k</option>
                  <option value="60000">Under $60k</option>
                  <option value="100000">Under $100k</option>
                  <option value="150000">Under $150k</option>
                  <option value="200000">Under $200k</option>
                </select>
                <IconChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
              </div>
            </div>
          </div>
        </aside>

        {/* Results */}
        <div>
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <p className="font-mono text-sm uppercase tracking-wide text-muted">{resultCountLabel}</p>
            <div className="relative">
              <label htmlFor="sort" className="sr-only">Sort by</label>
              <select
                id="sort"
                value={sort}
                onChange={(e) => updateParam('sort', e.target.value)}
                className="input-brutal appearance-none !py-2 !pr-10 !text-xs font-mono uppercase tracking-wide"
              >
                {sortOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              <IconChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            </div>
          </div>

          {loading ? (
            <GridSkeleton count={6} />
          ) : error ? (
            <EmptyState title="Something went wrong" description={error} />
          ) : cars.length === 0 ? (
            <EmptyState
              title="No cars found"
              description="Try adjusting your filters or clearing the search to see more results."
            />
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {cars.map((car) => (
                <CarCard key={car.id} car={car} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
