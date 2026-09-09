import { IconStar, IconBolt, IconCarFront } from './Icons.jsx';

const badgeConfig = {
  New: { label: 'New Stock', bg: 'bg-accent', icon: IconCarFront },
  Featured: { label: 'Featured', bg: 'bg-highlight', icon: IconStar },
  Deal: { label: 'Deal', bg: 'bg-accent', icon: IconBolt },
};

export default function Badge({ badge }) {
  if (!badge) return null;
  const config = badgeConfig[badge];
  if (!config) return null;
  const Icon = config.icon;
  return (
    <span className={`tag-brutal ${config.bg}`}>
      <Icon className="h-3.5 w-3.5" />
      <span className="ml-1">{config.label}</span>
    </span>
  );
}
