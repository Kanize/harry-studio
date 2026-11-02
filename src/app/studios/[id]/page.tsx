
import { notFound } from "next/navigation";
import StudioDetails from "@/components/Studios/StudioDetails";
import type { Istudio } from "@/type/StudioType";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function StudioDetailsPage({
  params,
}: PageProps) {
  const { id } = await params;

  const res = await fetch(
    `http://localhost:8000/studios/${id}`,
    {
      cache: "no-store",
    }
  );

  if (res.status === 404) {
    notFound();
  }

  if (!res.ok) {
    throw new Error("Failed to fetch studio details");
  }

  const data = await res.json();

  const studio: Istudio = data.studio ?? data;

  return <StudioDetails studio={studio} />;
}
