
import Link from "next/link";
import {
  ArrowUpRight,
  Camera,
  Clapperboard,
  Mic2,
  Music2,
  Palette,
} from "lucide-react";

const categories = [
  {
    title: "Photo Studios",
    description: "Perfect spaces for photography and creative shoots.",
    value: "Photo Studios",
    icon: Camera,
    number: "01",
    gradient: "from-amber-500/20 to-orange-500/5",
  },
  {
    title: "Sound Stages",
    description: "Professional stages for film and video production.",
    value: "Sound Stages",
    icon: Clapperboard,
    number: "02",
    gradient: "from-blue-500/20 to-cyan-500/5",
  },
  {
    title: "Podcast Rooms",
    description: "Create podcasts with professional recording setups.",
    value: "Podcast Rooms",
    icon: Mic2,
    number: "03",
    gradient: "from-purple-500/20 to-pink-500/5",
  },
  {
    title: "Music Suites",
    description: "Inspiring spaces for musicians and sound creators.",
    value: "Music Suites",
    icon: Music2,
    number: "04",
    gradient: "from-emerald-500/20 to-lime-500/5",
  },
  {
    title: "Art Workshops",
    description: "Creative environments for art, design and craft.",
    value: "Art Workshops",
    icon: Palette,
    number: "05",
    gradient: "from-rose-500/20 to-orange-500/5",
  },
];

export default function StudioCategories() {
  return (
    <section className="bg-background px-5 py-20 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">

        {/* Section Heading */}
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#65B800]">
              Find Your Creative Space
            </p>

            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Browse by Studio{" "}
              <span className="text-[#65B800]">Categories</span>
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
              From photography to music production, discover
              the perfect space for every creative vision.
            </p>
          </div>

          <Link
            href="/studios"
            className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-foreground transition hover:text-[#65B800]"
          >
            Explore All Studios
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Category Cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <Link
                key={category.value}
                href={`/studios?category=${encodeURIComponent(category.value)}`}
                className={`group relative flex min-h-56 flex-col justify-between overflow-hidden rounded-2xl border border-border bg-gradient-to-br ${category.gradient} p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#65B800] hover:shadow-xl`}
              >
                {/* Decorative Number */}
                <span className="absolute right-5 top-4 text-5xl font-bold text-foreground/[0.06]">
                  {category.number}
                </span>

                {/* Icon */}
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-border bg-background/80 text-foreground shadow-sm transition duration-300 group-hover:bg-[#C8FF00] group-hover:text-black">
                  <Icon className="h-7 w-7" />
                </div>

                {/* Content */}
                <div className="mt-8 flex items-end justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold text-foreground transition group-hover:text-[#65B800]">
                      {category.title}
                    </h3>

                    <p className="mt-2 max-w-xs text-sm leading-6 text-muted-foreground">
                      {category.description}
                    </p>
                  </div>

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-background text-foreground transition-all duration-300 group-hover:border-[#C8FF00] group-hover:bg-[#C8FF00] group-hover:text-black">
                    <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
