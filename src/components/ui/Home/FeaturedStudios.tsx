import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, MapPin, Star } from "lucide-react";

interface Studio {
  _id: string;
  title: string;
  category: string;
  hourlyRate: number | string;
  location: string;
  imageUrl?: string;
  rating?: number;
  createdAt?: string;
}

async function getFeaturedStudios(): Promise<Studio[]> {
  try {
    const res = await fetch("http://localhost:8000/featured-studios", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch featured studios");
    }

    const data = await res.json();

    return data.studios ?? [];
  } catch (error) {
    console.error("Featured Studios Fetch Error:", error);
    return [];
  }
}

export default async function FeaturedStudios() {
  const studios = await getFeaturedStudios();

  return (
    <section className="bg-background px-5 py-20 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">

        {/* Section Heading */}
        <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#65B800]">
              Discover Your Space
            </p>

            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Featured <span className="text-[#65B800]">Studios</span>
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
              Explore inspiring creative spaces selected for your
              next unforgettable project.
            </p>
          </div>

          <Link
            href="/studios"
            className="inline-flex w-fit items-center gap-2 rounded-xl border border-border px-5 py-3 text-sm font-semibold text-foreground transition hover:border-[#65B800] hover:text-[#65B800]"
          >
            Explore All Studios
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Empty State */}
        {studios.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border px-6 py-16 text-center">
            <h3 className="text-lg font-semibold text-foreground">
              No featured studios yet
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Amazing creative spaces will appear here soon.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {studios.map((studio) => {
              const rating = Number(studio.rating) || 0;
              const hourlyRate = Number(studio.hourlyRate) || 0;

              return (
                <article
                  key={studio._id}
                  className="group overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  {/* Studio Image */}
                  <div className="relative h-60 overflow-hidden bg-muted">
                    {studio.imageUrl ? (
                      <Image
                        src={studio.imageUrl}
                        alt={studio.title}
                        fill
                        unoptimized
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                        No image available
                      </div>
                    )}

                    {/* Category Badge */}
                    <span className="absolute left-4 top-4 rounded-full bg-black/75 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
                      {studio.category}
                    </span>

                    {/* Rating Badge */}
                    <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-xs font-bold text-gray-900 shadow">
                      <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                      {rating > 0 ? rating.toFixed(1) : "New"}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5">
                    <h3 className="line-clamp-1 text-lg font-bold text-card-foreground transition group-hover:text-[#65B800]">
                      {studio.title}
                    </h3>

                    <div className="mt-3 flex items-center gap-1.5 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 shrink-0" />
                      <span className="line-clamp-1">
                        {studio.location}
                      </span>
                    </div>

                    <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
                      <div>
                        <p className="text-xs text-muted-foreground">
                          Starting from
                        </p>

                        <p className="mt-1 text-lg font-bold text-card-foreground">
                          ${hourlyRate.toLocaleString("en-US")}
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
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}