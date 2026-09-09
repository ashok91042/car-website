import { IconSearch } from './Icons.jsx';

export default function EmptyState({ title, description }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-none border-2 border-dashed border-ink/40 bg-smoke/60 px-6 py-16 text-center">
      <IconSearch className="h-12 w-12 text-ink/30" />
      <h3 className="mt-4 font-display text-xl font-bold">{title}</h3>
      <p className="mt-2 max-w-sm text-sm text-muted">{description}</p>
    </div>
  );
}
