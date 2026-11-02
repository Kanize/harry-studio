
import Link from "next/link";
import {
  ArrowDownRight,
  ArrowUpRight,
  BadgeCheck,
  Headphones,
  ShieldCheck,
  Sparkles,
  Wrench,
} from "lucide-react";

const assurances = [
  {
    number: "01",
    title: "Liability Protection",
    description:
      "Understand booking terms, responsibilities, and available protection before your session.",
    icon: ShieldCheck,
    tag: "BOOK WITH CONFIDENCE",
  },
  {
    number: "02",
    title: "Verified Profiles",
    description:
      "Use profile details and verification indicators to make more informed decisions.",
    icon: BadgeCheck,
    tag: "TRUST STARTS HERE",
  },
  {
    number: "03",
    title: "Equipment & Space Safety",
    description:
      "Review studio facilities, equipment details, and safety guidelines before arrival.",
    icon: Wrench,
    tag: "CREATE WITH CARE",
  },
  {
    number: "04",
    title: "24/7 Host Support",
    description:
      "Get help with booking questions and know where to turn when you need assistance.",
    icon: Headphones,
    tag: "HELP WHEN YOU NEED IT",
  },
];

export default function HostGuarantee() {
  return (
    <section
      id="about"
      aria-labelledby="creator-support-heading"
      className="relative overflow-hidden border-y border-border bg-card text-foreground"
    >
      <div className="studio-container py-20 sm:py-24 lg:py-28">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-20">
          {/* Left: Editorial introduction */}
          <div className="lg:sticky lg:top-28">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 px-3.5 py-2 text-xs font-bold uppercase tracking-[0.18em] text-primary">
              <Sparkles size={14} aria-hidden="true" />
              The StudioSpace Standard
            </div>

            <h2
              id="creator-support-heading"
              className="mt-7 max-w-xl font-heading text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl"
            >
              Make space for
              <br />
              <span className="text-primary">great ideas.</span>
              <br />
              Leave the worry
              <br />
              behind.
            </h2>

            <p className="mt-6 max-w-md text-base leading-8 text-muted-foreground">
              Your best work happens when you can focus on creating.
              Find the information, safety guidance, and support you need
              throughout your studio booking journey.
            </p>

            <Link
              href="/studios"
              className="group mt-8 inline-flex items-center gap-3 rounded-full bg-primary px-5 py-3.5 text-sm font-bold text-primary-foreground transition-transform hover:-translate-y-0.5"
            >
              Find your creative space
              <ArrowUpRight
                size={18}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </Link>

            {/* Decorative brand statement */}
            <div className="mt-14 hidden border-t border-border pt-6 sm:block">
              <p className="font-heading text-sm font-medium tracking-wide text-muted-foreground">
                YOUR SPACE. YOUR VISION. YOUR NEXT BIG IDEA.
              </p>
            </div>
          </div>

          {/* Right: Numbered assurance list */}
          <div className="divide-y divide-border border-y border-border">
            {assurances.map((item) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.number}
                  className="group py-7 sm:py-8"
                >
                  <div className="flex items-start gap-4 sm:gap-6">
                    <span className="pt-1 font-heading text-sm font-semibold tabular-nums text-muted-foreground/60">
                      {item.number}
                    </span>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-3">
                        <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                          <Icon size={19} aria-hidden="true" />
                        </div>

                        <h3 className="font-heading text-xl font-semibold tracking-tight sm:text-2xl">
                          {item.title}
                        </h3>
                      </div>

                      <p className="mt-4 max-w-lg text-sm leading-7 text-muted-foreground sm:ml-[52px]">
                        {item.description}
                      </p>

                      <div className="mt-4 sm:ml-[52px]">
                        <span className="text-[10px] font-bold tracking-[0.16em] text-primary">
                          {item.tag}
                        </span>
                      </div>
                    </div>

                    <ArrowDownRight
                      size={20}
                      className="mt-1 shrink-0 text-muted-foreground/50 transition-all group-hover:translate-x-1 group-hover:translate-y-1 group-hover:text-primary"
                      aria-hidden="true"
                    />
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* Bottom support banner */}
        <div className="mt-16 overflow-hidden rounded-2xl bg-primary text-primary-foreground sm:mt-20">
          <div className="flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-9 lg:p-10">
            <div className="flex items-start gap-4">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-black/10">
                <Headphones size={25} aria-hidden="true" />
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] opacity-70">
                  Creator support
                </p>

                <h3 className="mt-2 font-heading text-2xl font-bold sm:text-3xl">
                  Need a hand? Start here.
                </h3>

                <p className="mt-2 max-w-xl text-sm leading-6 opacity-80">
                  Explore available spaces and review the details you need
                  before making your next booking.
                </p>
              </div>
            </div>

            <Link
              href="/studios"
              className="inline-flex shrink-0 items-center justify-center gap-2 self-start rounded-full bg-black px-5 py-3 text-sm font-bold text-white transition-transform hover:scale-[1.02] sm:self-center"
            >
              Explore Studios
              <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
