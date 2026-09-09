import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { IconLogo, IconMenu, IconClose, IconPhone } from './Icons.jsx';

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/inventory', label: 'Inventory' },
  { to: '/contact', label: 'Contact' },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    `font-display text-sm font-bold uppercase tracking-wide transition-colors ${
      isActive ? 'text-accent' : 'text-ink hover:text-accent'
    }`;

  return (
    <header className="sticky top-0 z-50 border-b-2 border-ink bg-paper/95 backdrop-blur-sm">
      <div className="container-site flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2" aria-label="Stellar Motorworks home">
          <span className="flex h-9 w-9 items-center justify-center border-2 border-ink bg-accent text-ink shadow-brutal-sm">
            <IconLogo className="h-5 w-5" />
          </span>
          <span className="font-display text-lg font-bold uppercase tracking-tight">
            Stellar<span className="text-accent">M</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.to === '/'} className={linkClass}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <a href="tel:+15551234567" className="flex items-center gap-2 font-mono text-sm font-semibold">
            <IconPhone className="h-4 w-4 text-accent" />
            +1 (555) 123-4567
          </a>
          <Link to="/inventory" className="btn-brutal-accent !px-4 !py-2">
            Browse Cars
          </Link>
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center border-2 border-ink bg-paper md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <IconClose className="h-5 w-5" /> : <IconMenu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <nav className="border-t-2 border-ink bg-paper md:hidden" aria-label="Mobile">
          <div className="container-site flex flex-col gap-2 py-4">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={linkClass}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}
            <Link to="/inventory" className="btn-brutal-accent mt-2" onClick={() => setOpen(false)}>
              Browse Cars
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
