import { FeatureCard } from "../molecules";

interface Feature {
  id: string;
  icon: "search" | "swap" | "menu";
  title: string;
  description: string;
  iconColor: "primary" | "accent" | "secondary";
}

const features: Feature[] = [
  {
    id: "quick-search",
    icon: "search",
    title: "Quick Search",
    description: "Find items instantly with powerful search",
    iconColor: "primary",
  },
  {
    id: "compare",
    icon: "swap",
    title: "Compare",
    description: "See side-by-side differences instantly",
    iconColor: "accent",
  },
  {
    id: "analyze",
    icon: "menu",
    title: "Analyze",
    description: "Get detailed stats and comparisons",
    iconColor: "secondary",
  },
];

export function FeaturesGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-8">
      {features.map((feature) => (
        <FeatureCard
          key={feature.id}
          icon={feature.icon}
          title={feature.title}
          description={feature.description}
          iconColor={feature.iconColor}
        />
      ))}
    </div>
  );
}
