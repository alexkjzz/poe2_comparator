import { Button } from "../atoms";
import { Icon } from "../atoms";
import { useNavigation } from "../../hooks";

export function HeroSection() {
  const { goComparator } = useNavigation();

  return (
    <div className="space-y-8 max-w-2xl text-center">
      {/* Logo/Title */}
      <div className="space-y-3">
        <h1 className="text-5xl md:text-7xl font-bold text-primary">
          Path of Exile 2
        </h1>
        <h2 className="text-2xl md:text-3xl font-semibold text-foreground">
          Item Comparator
        </h2>
        <p className="text-lg text-muted-foreground">
          Analyze and compare items side by side with precision
        </p>
      </div>

      {/* CTA Button */}
      <div className="pt-4">
        <Button
          variant="primary"
          size="lg"
          onClick={goComparator}
          className="px-8"
        >
          <Icon name="search" size={20} />
          Start Comparing
        </Button>
      </div>
    </div>
  );
}
