
import { Suspense } from "react";

import AllStudiosList from "@/components/Studios/AllStudios";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

async function getStudios() {
  try {
    const response = await fetch(`${API_URL}/studios`, {
      method: "GET",
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch studios: ${response.status}`);
    }

    const data = await response.json();

    // Supports both:
    // 1. Array response: [...]
    // 2. Object response: { success: true, studios: [...] }

    const studios = Array.isArray(data)
      ? data
      : data?.studios;

    if (!Array.isArray(studios)) {
      throw new Error("Invalid studios API response.");
    }

    return studios;
  } catch (error) {
    console.error("Studios Fetch Error:", error);
    throw error;
  }
}

function StudiosLoading() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10 h-10 w-64 animate-pulse rounded-lg bg-muted" />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-2xl border border-border"
          >
            <div className="aspect-[4/3] animate-pulse bg-muted" />

            <div className="space-y-4 p-5">
              <div className="h-5 w-3/4 animate-pulse rounded bg-muted" />
              <div className="h-4 w-1/2 animate-pulse rounded bg-muted" />
              <div className="h-10 animate-pulse rounded-xl bg-muted" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

async function StudiosContent() {
  const studiosPromise = getStudios();

  return <AllStudiosList studiosPromise={studiosPromise} />;
}

export default function StudiosPage() {
  return (
    <main className="min-h-screen bg-background">
      <Suspense fallback={<StudiosLoading />}>
        <StudiosContent />
      </Suspense>
    </main>
  );
}
