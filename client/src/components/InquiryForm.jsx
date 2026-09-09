import { useState } from 'react';
import { submitInquiry } from '../api.js';
import { IconCheck, IconAlert } from './Icons.jsx';

const initialForm = { name: '', email: '', phone: '', message: '' };

export default function InquiryForm({ carId, carName }) {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [error, setError] = useState('');

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setStatus('submitting');

    try {
      await submitInquiry({ ...form, carId: carId || null });
      setStatus('success');
      setForm(initialForm);
    } catch (err) {
      setStatus('error');
      setError(err.message);
    }
  }

  if (status === 'success') {
    return (
      <div className="border-2 border-ink bg-highlight p-8 text-center">
        <span className="mx-auto flex h-12 w-12 items-center justify-center border-2 border-ink bg-paper">
          <IconCheck className="h-6 w-6 text-ink" />
        </span>
        <h3 className="mt-4 font-display text-xl font-bold">Request Sent</h3>
        <p className="mt-2 text-sm">
          Thanks for your interest{carName ? ` in the ${carName}` : ''}. Our team will
          get back to you within 24 hours.
        </p>
        <button type="button" className="btn-brutal mt-6" onClick={() => setStatus('idle')}>
          Send another request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      {carName && (
        <p className="mb-4 font-mono text-sm text-muted">
          Enquiring about: <span className="font-semibold text-ink">{carName}</span>
        </p>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={`name-${carId || 'contact'}`} className="label-brutal">Full Name *</label>
          <input
            id={`name-${carId || 'contact'}`}
            name="name"
            type="text"
            required
            value={form.name}
            onChange={handleChange}
            placeholder="Jane Doe"
            className="input-brutal"
          />
        </div>
        <div>
          <label htmlFor={`email-${carId || 'contact'}`} className="label-brutal">Email *</label>
          <input
            id={`email-${carId || 'contact'}`}
            name="email"
            type="email"
            required
            value={form.email}
            onChange={handleChange}
            placeholder="jane@example.com"
            className="input-brutal"
          />
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor={`phone-${carId || 'contact'}`} className="label-brutal">Phone</label>
        <input
          id={`phone-${carId || 'contact'}`}
          name="phone"
          type="tel"
          value={form.phone}
          onChange={handleChange}
          placeholder="+1 (555) 000-0000"
          className="input-brutal"
        />
      </div>

      <div className="mt-4">
        <label htmlFor={`message-${carId || 'contact'}`} className="label-brutal">Message *</label>
        <textarea
          id={`message-${carId || 'contact'}`}
          name="message"
          required
          rows={4}
          value={form.message}
          onChange={handleChange}
          placeholder="Tell us about your requirements, trade-in, financing, etc."
          className="input-brutal resize-none"
        />
      </div>

      {status === 'error' && (
        <p className="mt-4 flex items-center gap-2 border-2 border-ink bg-accent/10 p-3 text-sm">
          <IconAlert className="h-4 w-4 shrink-0 text-accent" /> {error}
        </p>
      )}

      <button type="submit" className="btn-brutal-accent mt-6 w-full" disabled={status === 'submitting'}>
        {status === 'submitting' ? 'Sending…' : 'Submit Request'}
      </button>
    </form>
  );
}
