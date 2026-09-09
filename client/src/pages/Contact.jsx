import InquiryForm from '../components/InquiryForm.jsx';
import { IconMapPin, IconPhone, IconMail, IconClock } from '../components/Icons.jsx';

const contactInfo = [
  { icon: IconMapPin, label: 'Visit Us', lines: ['1200 Motorway Dr', 'Los Angeles, CA 90001'] },
  { icon: IconPhone, label: 'Call Us', lines: ['+1 (555) 123-4567'], href: 'tel:+15551234567' },
  { icon: IconMail, label: 'Email Us', lines: ['sales@stellarmotorworks.com'], href: 'mailto:sales@stellarmotorworks.com' },
  { icon: IconClock, label: 'Opening Hours', lines: ['Mon–Fri: 9am–7pm', 'Sat–Sun: 10am–5pm'] },
];

export default function Contact() {
  return (
    <section className="container-site py-12" aria-labelledby="contact-heading">
      <header className="mb-10 max-w-2xl">
        <p className="font-mono text-sm uppercase tracking-wider text-accent">Get in touch</p>
        <h1 id="contact-heading" className="mt-1 font-display text-4xl font-bold tracking-tight sm:text-5xl">
          Contact Us
        </h1>
        <p className="mt-3 text-muted">
          Questions about a car, financing, trade-ins or a test drive? Send us a message and our team will respond within one business day.
        </p>
      </header>

      <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr]">
        <div className="card-brutal p-6 sm:p-8">
          <h2 className="font-display text-xl font-bold uppercase">Send a Message</h2>
          <p className="mt-2 text-sm text-muted">
            Whether you're enquiring about a specific vehicle, a trade-in valuation, or financing options, we're here to help.
          </p>
          <div className="mt-6">
            <InquiryForm />
          </div>
        </div>

        <div className="card-brutal bg-ink p-6 text-paper sm:p-8">
          <h2 className="font-display text-xl font-bold uppercase">Showroom Details</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {contactInfo.map(({ icon: Icon, label, lines, href }) => (
              <div key={label}>
                <span className="flex h-11 w-11 items-center justify-center border-2 border-paper bg-accent text-ink">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-3 font-display text-sm font-bold uppercase tracking-wider text-accent">
                  {label}
                </h3>
                <div className="mt-2 space-y-0.5 text-sm text-paper/80">
                  {lines.map((line) =>
                    href ? (
                      <a key={line} href={href} className="block hover:text-accent">
                        {line}
                      </a>
                    ) : (
                      <p key={line}>{line}</p>
                    )
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 border-t border-paper/20 pt-6">
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-accent">Directions</h3>
            <p className="mt-2 text-sm text-paper/70">
              We are located two blocks north of the 110 Freeway, with free customer parking on site.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
