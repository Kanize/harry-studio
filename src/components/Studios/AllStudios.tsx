
"use client";

import { use, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Star, ArrowUpRight, Search, SlidersHorizontal } from "lucide-react";

type Studio = {
  _id: string;
  title: string;
  category: string;
  hourlyRate: number;
  location: string;
  imageUrl?: string;
  rating?: number;
  status?: string;
};

type Props = {
  studiosPromise: Promise<Studio[]>;
};

export default function AllStudiosList({ studiosPromise }: Props) {
  const studios = use(studiosPromise);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Studios");
  const [sort, setSort] = useState("recommended");

  const categories = [
    "All Studios",
    ...Array.from(new Set(studios.map((studio) => studio.category).filter(Boolean))),
  ];

  const filteredStudios = useMemo(() => {
    let result = studios.filter(
      (studio) =>
        (studio.status === "Confirmed" || !studio.status) &&
        (category === "All Studios" || studio.category === category) &&
        `${studio.title} ${studio.location} ${studio.category}`
          .toLowerCase()
          .includes(search.toLowerCase())
    );

    if (sort === "price-low") {
      result = [...result].sort((a, b) => a.hourlyRate - b.hourlyRate);
    } else if (sort === "price-high") {
      result = [...result].sort((a, b) => b.hourlyRate - a.hourlyRate);
    } else if (sort === "rating") {
      result = [...result].sort(
        (a, b) => (b.rating ?? 0) - (a.rating ?? 0)
      );
    }

    return result;
  }, [studios, search, category, sort]);

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <div className="mb-10">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-foreground">
          <span className="h-2 w-2 rounded-full bg-primary" />
          Your next great creation starts here
        </div>

        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Find your <span className="text-primary">creative</span>
              <br className="hidden sm:block" /> space.
            </h1>
            <p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground">
              Discover inspiring studios, professional equipment, and
              spaces built to bring your next big idea to life.
            </p>
          </div>

          <p className="text-sm text-muted-foreground">
            <span className="text-2xl font-bold text-foreground">
              {filteredStudios.length}
            </span>{" "}
            spaces to explore
          </p>
        </div>
      </div>

      <div className="mb-8 rounded-2xl border border-border bg-card p-3 sm:p-4">
        <div className="flex flex-col gap-3 lg:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by studio, category or location..."
              className="h-12 w-full rounded-xl border border-border bg-background pl-12 pr-4 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div className="flex items-center gap-2">
            <SlidersHorizontal className="ml-1 h-4 w-4 shrink-0 text-muted-foreground" />
            <select
              value={sort}
              onChange={(event) => setSort(event.target.value)}
              className="h-12 min-w-0 flex-1 rounded-xl border border-border bg-background px-3 text-sm text-foreground outline-none focus:border-primary sm:min-w-44"
              aria-label="Sort studios"
            >
              <option value="recommended">Recommended</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>

        <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
          {categories.map((item) => (
            <button
              key={item}
              onClick={() => setCategory(item)}
              className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition ${
                category === item
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-background text-muted-foreground hover:border-primary/50 hover:text-foreground"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {filteredStudios.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border px-6 py-20 text-center">
          <Search className="mx-auto mb-4 h-8 w-8 text-muted-foreground" />
          <h2 className="text-xl font-semibold text-foreground">
            No studios found
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Try a different search or category.
          </p>
          <button
            onClick={() => {
              setSearch("");
              setCategory("All Studios");
            }}
            className="mt-5 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredStudios.map((studio) => (
            <article
              key={studio._id}
              className="group overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-black/5"
            >
              <Link
                href={`/studios/${studio._id}`}
                className="relative block aspect-[4/3] overflow-hidden bg-muted"
                aria-label={`View ${studio.title}`}
              >
                {studio.imageUrl ? (
                  <Image
                    src={studio.imageUrl}
                    alt={studio.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                    Studio image coming soon
                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" />

                <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/60 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md">
                  {studio.category}
                </span>

                <div className="absolute bottom-4 left-4 flex items-center gap-1.5 text-sm font-medium text-white">
                  <MapPin className="h-4 w-4" />
                  <span className="line-clamp-1">{studio.location}</span>
                </div>
              </Link>

              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <h2 className="line-clamp-2 min-h-14 text-lg font-semibold leading-7 text-foreground transition-colors group-hover:text-primary">
                    {studio.title}
                  </h2>

                  <div className="flex shrink-0 items-center gap-1 rounded-lg bg-muted px-2 py-1.5 text-sm">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    <span className="font-semibold text-foreground">
                      {studio.rating != null
                        ? studio.rating.toFixed(1)
                        : "New"}
                    </span>
                  </div>
                </div>

                <div className="mt-5 flex items-end justify-between gap-3 border-t border-border pt-4">
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Starting from
                    </p>
                    <p className="mt-1 text-2xl font-bold tracking-tight text-foreground">
                      ${studio.hourlyRate}
                      <span className="text-sm font-normal text-muted-foreground">
                        {" "}/ hr
                      </span>
                    </p>
                  </div>

                  <Link
                    href={`/studios/${studio._id}`}
                    className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
                  >
                    View Details
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      <div className="mt-14 rounded-3xl border border-border bg-muted/40 px-6 py-8 text-center sm:px-10 sm:py-10">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          Have a space of your own?
        </p>
        <h2 className="mt-3 text-2xl font-bold text-foreground sm:text-3xl">
          Turn your studio into an opportunity.
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-muted-foreground">
          List your creative space and connect with creators looking for
          their next perfect location.
        </p>
        <Link
          href="/studios/new"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground transition hover:opacity-90"
        >
          List Your Studio
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
