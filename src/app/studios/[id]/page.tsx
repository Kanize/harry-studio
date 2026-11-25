
import { connection } from "next/server";
import StudioDetails from "@/components/Studios/StudioDetails";
import { notFound } from "next/navigation";
import type { Istudio } from "@/type/StudioType";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export default async function StudioDetailsPage({
  params,
}: PageProps) {
  // Wait until an incoming request before accessing dynamic data.
  await connection();

  const { id } = await params;

  if (!id || !/^[0-9a-fA-F]{24}$/.test(id)) {
    notFound();
  }

  let res: Response;

  try {
    res = await fetch(`${API_URL}/studios/${id}`, {
      cache: "no-store",
    });
  } catch {
    throw new Error("Unable to connect to the studio server.");
  }

  if (res.status === 404) {
    notFound();
  }

  if (!res.ok) {
    throw new Error("Failed to fetch studio details.");
  }

  const data = await res.json();

  const studio: Istudio = data.studio ?? data.data?.studio ?? data;

  if (!studio?._id) {
    notFound();
  }

  return <StudioDetails studio={studio} />;
}
