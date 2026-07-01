import { Icon } from "../atoms";

interface FeatureCardProps {
  icon: "search" | "swap" | "menu";
  title: string;
  description: string;
  iconColor: "primary" | "accent" | "secondary";
}

export function FeatureCard({
  icon,
  title,
  description,
  iconColor,
}: FeatureCardProps) {
  const colorClass = {
    primary: "text-primary",
    accent: "text-accent",
    secondary: "text-secondary",
  }[iconColor];

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-colors">
      <div className="flex justify-center mb-3">
        <Icon name={icon} size={24} className={colorClass} />
      </div>
      <h3 className="font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
