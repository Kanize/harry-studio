
import { Suspense } from "react";

import FeaturedStudios from "@/components/ui/Home/FeaturedStudios";
import HeroSlider from "@/components/ui/Home/hero-Slider";
import HostGuarantee from "@/components/ui/Home/HostGuarantee";
import HowBookingWorks from "@/components/ui/Home/HowBookingWorks";
import StudioCategories from "@/components/ui/Home/StudioCategories";

function FeaturedStudiosSkeleton() {
  return (
    <section className="bg-background px-5 py-20 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10">
          <div className="h-4 w-36 animate-pulse rounded bg-muted" />
          <div className="mt-4 h-10 w-64 animate-pulse rounded bg-muted" />
          <div className="mt-4 h-4 max-w-xl animate-pulse rounded bg-muted" />
        </div>

        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-2xl border border-border bg-card"
            >
              <div className="h-60 animate-pulse bg-muted" />

              <div className="space-y-4 p-5">
                <div className="h-5 w-3/4 animate-pulse rounded bg-muted" />
                <div className="h-4 w-1/2 animate-pulse rounded bg-muted" />
                <div className="h-10 animate-pulse rounded bg-muted" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <main>
      <HeroSlider />

      <Suspense fallback={<FeaturedStudiosSkeleton />}>
        <FeaturedStudios />
      </Suspense>

      <StudioCategories />
      <HowBookingWorks />
      <HostGuarantee />
    </main>
  );
}
