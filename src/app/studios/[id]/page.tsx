
import { Suspense } from "react";
import { notFound } from "next/navigation";

import StudioDetails from "@/components/Studios/StudioDetails";
import type { Istudio } from "@/type/StudioType";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

function StudioDetailsSkeleton() {
  return (
    <main className="mx-auto max-w-7xl animate-pulse px-5 py-12">
      <div className="h-8 w-64 rounded-lg bg-muted" />

      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        <div className="aspect-[4/3] rounded-2xl bg-muted" />

        <div className="space-y-5">
          <div className="h-8 w-3/4 rounded bg-muted" />
          <div className="h-5 w-1/2 rounded bg-muted" />
          <div className="h-32 rounded-xl bg-muted" />
          <div className="h-12 w-40 rounded-xl bg-muted" />
        </div>
      </div>
    </main>
  );
}

async function StudioDetailsContent({
  params,
}: PageProps) {
  const { id } = await params;

  if (!id || !/^[0-9a-fA-F]{24}$/.test(id)) {
    notFound();
  }

  let res: Response;

  try {
    res = await fetch(`${API_URL}/studios/${id}`, {
      cache: "no-store",
    });
  } catch (error) {
    console.error("Studio API Connection Error:", error);
    throw new Error("Unable to connect to the studio server.");
  }

  if (res.status === 404) {
    notFound();
  }

  if (!res.ok) {
    throw new Error("Failed to fetch studio details.");
  }

  const data = await res.json();

  const studio: Istudio =
    data?.studio ?? data?.data?.studio ?? data;

  if (!studio?._id) {
    notFound();
  }

  return <StudioDetails studio={studio} />;
}

export default function StudioDetailsPage({
  params,
}: PageProps) {
  return (
    <Suspense fallback={<StudioDetailsSkeleton />}>
      <StudioDetailsContent params={params} />
    </Suspense>
  );
}
