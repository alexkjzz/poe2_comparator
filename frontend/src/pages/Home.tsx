import { HeroSection, FeaturesGrid, HomeFooter } from "../components/organisms";

export function HomePage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Hero Section */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-16 md:py-24">
        <HeroSection />
        <div className="mt-12 w-full max-w-4xl">
          <FeaturesGrid />
        </div>
      </div>

      {/* Footer */}
      <HomeFooter />
    </div>
  );
}
