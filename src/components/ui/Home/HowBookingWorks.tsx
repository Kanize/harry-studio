
import Link from "next/link";
import {
  Search,
  Clock3,
  CalendarCheck,
  Clapperboard,
  ArrowRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";

const bookingSteps = [
  {
    number: "01",
    title: "Discover Spaces",
    description:
      "Explore unique studios, sound stages, and creative spaces that match your vision.",
    icon: Search,
  },
  {
    number: "02",
    title: "Select Shoot Hours",
    description:
      "Choose your preferred date, available time slot, and the hours you need.",
    icon: Clock3,
  },
  {
    number: "03",
    title: "Book Instantly",
    description:
      "Review your booking details and reserve your creative space with ease.",
    icon: CalendarCheck,
  },
  {
    number: "04",
    title: "Create & Produce",
    description:
      "Show up, bring your ideas to life, and create something extraordinary.",
    icon: Clapperboard,
  },
];

export default function HowBookingWorks() {
  return (
    <section
      id="how-it-works"
      aria-labelledby="booking-heading"
      className="bg-background py-20 text-foreground sm:py-24 lg:py-28"
    >
      <div className="studio-container">
        {/* Section Heading */}
        <div className="mx-auto mb-14 max-w-2xl text-center sm:mb-16">
          <span className="mb-4 inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-primary">
            Simple Process
          </span>

          <h2
            id="booking-heading"
            className="font-heading text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
          >
            From Vision to{" "}
            <span className="text-primary">Production</span>
          </h2>

          <p className="mt-5 text-sm leading-7 text-muted-foreground sm:text-base">
            Your next creative project starts here. Find the perfect space,
            book your time, and bring your ideas to life in four simple steps.
          </p>
        </div>

        {/* Booking Steps */}
        <div className="relative grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {bookingSteps.map((step, index) => {
            const Icon = step.icon;

            return (
              <article
                key={step.number}
                className="group relative rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 sm:p-7"
              >
                {/* Step Number and Icon */}
                <div className="mb-7 flex items-start justify-between">
                  <div className="flex size-14 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon size={26} strokeWidth={1.8} aria-hidden="true" />
                  </div>

                  <span className="font-heading text-3xl font-bold text-muted-foreground/30 transition-colors group-hover:text-primary/50">
                    {step.number}
                  </span>
                </div>

                <h3 className="font-heading text-xl font-semibold tracking-tight">
                  {step.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  {step.description}
                </p>

                {/* Small step indicator */}
                <div className="mt-7 h-1 w-10 rounded-full bg-primary/30 transition-all duration-300 group-hover:w-16 group-hover:bg-primary" />

                {/* Connector arrow on desktop */}
                {index < bookingSteps.length - 1 && (
                  <ArrowRight
                    aria-hidden="true"
                    className="absolute -right-4 top-12 z-10 hidden size-7 rounded-full border border-border bg-background p-1 text-muted-foreground lg:block"
                  />
                )}
              </article>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 flex flex-col items-center justify-center gap-4 text-center sm:mt-14">
          <p className="text-sm text-muted-foreground">
            Your next great project is one booking away.
          </p>

          <Button
            asChild
            size="lg"
            className="bg-primary font-semibold text-primary-foreground hover:bg-primary/90"
          >
            <Link href="/studios">
              Explore Studios
              <ArrowRight className="ml-1 size-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
