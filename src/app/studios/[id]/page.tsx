import StudioDetails from "@/components/Studios/StudioDetails";
import { notFound } from "next/navigation";
import type { Istudio } from "@/type/StudioType";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function StudioDetailsPage({
  params,
}: PageProps) {
  const { id } = await params;

  console.log("Frontend received ID:", id);

  if (!id || !/^[0-9a-fA-F]{24}$/.test(id)) {
    notFound();
  }

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
    const errorData = await res.json().catch(() => null);

    console.error("Studio API Error:", errorData);

    throw new Error(
      errorData?.message || "Failed to fetch studio details"
    );
  }

  const data = await res.json();

  const studio: Istudio = data.studio ?? data;

  return <StudioDetails studio={studio} />;
}