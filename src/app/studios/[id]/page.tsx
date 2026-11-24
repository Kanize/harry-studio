
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
    console.error("Failed to connect to Studio API:", error);
    throw new Error("Unable to connect to the server.");
  }

  if (res.status === 404) {
    notFound();
  }

  if (!res.ok) {
    const errorData = await res.json().catch(() => null);

    console.error("Studio API Error:", errorData);

    throw new Error(
      errorData?.message || "Failed to fetch studio details."
    );
  }

  const data = await res.json();

  const studio: Istudio | undefined = data.studio ?? data.data?.studio ?? data;

  if (!studio?._id) {
    notFound();
  }

  return <StudioDetails studio={studio} />;
}
