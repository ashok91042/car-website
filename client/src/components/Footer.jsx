import { Link } from 'react-router-dom';
import { IconLogo, IconPhone, IconMail, IconMapPin, IconClock } from './Icons.jsx';

export default function Footer() {
  return (
    <footer className="border-t-2 border-ink bg-ink text-paper">
      <div className="container-site grid gap-10 py-12 md:grid-cols-4">
        <div>
          <Link to="/" className="flex items-center gap-2" aria-label="Stellar Motorworks home">
            <span className="flex h-9 w-9 items-center justify-center border-2 border-paper bg-accent text-ink">
              <IconLogo className="h-5 w-5" />
            </span>
            <span className="font-display text-lg font-bold uppercase tracking-tight">
              Stellar<span className="text-accent">M</span>
            </span>
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-paper/70">
            A curated collection of new, electric, luxury and performance cars. Drive the future today.
          </p>
        </div>

        <div>
          <h3 className="font-display text-sm font-bold uppercase tracking-wider text-accent">Explore</h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link to="/" className="hover:text-accent">Home</Link></li>
            <li><Link to="/inventory" className="hover:text-accent">Inventory</Link></li>
            <li><Link to="/contact" className="hover:text-accent">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-bold uppercase tracking-wider text-accent">Visit Us</h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <IconMapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <span>1200 Motorway Dr,<br />Los Angeles, CA 90001</span>
            </li>
            <li className="flex items-center gap-2">
              <IconPhone className="h-4 w-4 shrink-0 text-accent" />
              <a href="tel:+15551234567" className="hover:text-accent">+1 (555) 123-4567</a>
            </li>
            <li className="flex items-center gap-2">
              <IconMail className="h-4 w-4 shrink-0 text-accent" />
              <a href="mailto:sales@stellarmotorworks.com" className="hover:text-accent">sales@stellarmotorworks.com</a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-bold uppercase tracking-wider text-accent">Opening Hours</h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <IconClock className="h-4 w-4 shrink-0 text-accent" />
              <span>Mon–Fri: 9am–7pm</span>
            </li>
            <li className="flex items-center gap-2">
              <IconClock className="h-4 w-4 shrink-0 text-accent" />
              <span>Sat–Sun: 10am–5pm</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-paper/20 py-5">
        <p className="container-site text-center text-xs text-paper/60">
          &copy; {new Date().getFullYear()} Stellar Motorworks. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
