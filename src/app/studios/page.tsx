
import AllStudiosList from "@/components/Studios/AllStudios";
import { Suspense } from "react";

const StudiosPromise = async () => {
  const res = await fetch("http://localhost:8000/studios", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch studios");
  }

  const data = await res.json();

  return Array.isArray(data) ? data : data.studios ?? [];
};

export default function Studios() {
  return (
    <main className="min-h-screen bg-background">
      <Suspense
        fallback={
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
        }
      >
        <StudiosContent />
      </Suspense>
    </main>
  );
}

async function StudiosContent() {
  const studiosPromise = StudiosPromise();

  return <AllStudiosList studiosPromise={studiosPromise} />;
}
