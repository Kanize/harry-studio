
"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowUpRight,
  Building2,
  Edit,
  MapPin,
  Plus,
  Trash2,
  Loader2,
  ImageIcon,
  X,
} from "lucide-react";
import { toast } from "sonner";

import { authClient } from "@/lib/auth-client";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

interface Studio {
  _id: string;
  title: string;
  category: string;
  location: string;
  hourlyRate: number;
  imageUrl?: string;
  images?: string[];
  status?: string;
  hostEmail: string;
}

export default function MyListingsPage() {
  const router = useRouter();
  const { data: session, isPending: sessionLoading } =
    authClient.useSession();

  const [studios, setStudios] = useState<Studio[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [selectedStudio, setSelectedStudio] = useState<Studio | null>(
    null
  );

  const fetchMyListings = useCallback(async () => {
    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/my-listings`, {
        method: "GET",
        credentials: "include",
        cache: "no-store",
      });

      if (response.status === 401 || response.status === 403) {
        toast.error("Please login to view your listings.");
        router.replace("/login");
        return;
      }

      if (!response.ok) {
        throw new Error("Failed to load your studio listings.");
      }

      const result = await response.json();

      const listings: Studio[] = Array.isArray(result)
        ? result
        : result.data ?? result.studios ?? result.listings ?? [];

      setStudios(listings);
    } catch (error) {
      console.error("My listings error:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    if (sessionLoading) return;

    if (!session?.user) {
      router.replace("/login");
      return;
    }

    const timeoutId = window.setTimeout(() => {
      void fetchMyListings();
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [session, sessionLoading, router, fetchMyListings]);

  const handleDelete = async () => {
    if (!selectedStudio) return;

    try {
      setDeleting(true);

      const response = await fetch(
        `${API_URL}/studios/${selectedStudio._id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const result = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(
          result?.message || "Failed to delete studio."
        );
      }

      setStudios((previous) =>
        previous.filter(
          (studio) => studio._id !== selectedStudio._id
        )
      );

      setSelectedStudio(null);
      toast.success("Studio listing deleted successfully!");
    } catch (error) {
      console.error("Delete studio error:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Could not delete this listing."
      );
    } finally {
      setDeleting(false);
    }
  };

  if (sessionLoading || loading) {
    return (
      <main className="min-h-screen bg-background px-4 py-20">
        <div className="mx-auto flex max-w-6xl items-center justify-center gap-3">
          <Loader2 className="h-6 w-6 animate-spin text-lime-600" />
          <p className="text-sm text-muted-foreground">
            Loading your studio listings...
          </p>
        </div>
      </main>
    );
  }

  if (!session?.user) return null;

  return (
    <main className="min-h-screen bg-background px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-lime-600">
              Host dashboard
            </p>

            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              My Studio Listings
            </h1>

            <p className="mt-2 text-sm text-muted-foreground">
              Manage, update and organize your studio spaces.
            </p>
          </div>

          <Link
            href="/addStudio"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#C8FF00] px-5 py-3 text-sm font-semibold text-black transition hover:bg-[#b5e600]"
          >
            <Plus className="h-4 w-4" />
            Add New Studio
          </Link>
        </div>

        {/* Summary */}
        <div className="mb-8 rounded-2xl border bg-card p-5 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-lime-100 text-lime-700 dark:bg-lime-950 dark:text-lime-400">
              <Building2 className="h-6 w-6" />
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Total studio listings
              </p>
              <p className="text-2xl font-bold">{studios.length}</p>
            </div>
          </div>
        </div>

        {/* Listings */}
        {studios.length === 0 ? (
          <div className="rounded-2xl border border-dashed bg-card px-6 py-16 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-muted">
              <Building2 className="h-8 w-8 text-muted-foreground" />
            </div>

            <h2 className="text-xl font-semibold">
              No studio listings yet
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
              You haven&apos;t added any studios. Create your first listing
              and start welcoming creative professionals.
            </p>

            <Link
              href="/addStudio"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#C8FF00] px-5 py-3 text-sm font-semibold text-black transition hover:bg-[#b5e600]"
            >
              <Plus className="h-4 w-4" />
              Add Your First Studio
            </Link>
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border bg-card shadow-sm">
            {/* Desktop table */}
            <div className="hidden overflow-x-auto md:block">
              <table className="w-full text-left">
                <thead className="border-b bg-muted/40">
                  <tr className="text-xs uppercase tracking-wider text-muted-foreground">
                    <th className="px-6 py-4 font-semibold">Studio</th>
                    <th className="px-6 py-4 font-semibold">Category</th>
                    <th className="px-6 py-4 font-semibold">Location</th>
                    <th className="px-6 py-4 font-semibold">Hourly Rate</th>
                    <th className="px-6 py-4 text-right font-semibold">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y">
                  {studios.map((studio) => (
                    <tr
                      key={studio._id}
                      className="transition hover:bg-muted/30"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded-lg bg-muted">
                            {studio.imageUrl ? (
                              <Image
                                src={studio.imageUrl}
                                alt={studio.title}
                                fill
                                sizes="80px"
                                className="object-cover"
                              />
                            ) : (
                              <div className="flex h-full items-center justify-center">
                                <ImageIcon className="h-5 w-5 text-muted-foreground" />
                              </div>
                            )}
                          </div>

                          <div className="min-w-0">
                            <p className="max-w-[200px] truncate font-semibold">
                              {studio.title}
                            </p>
                            <p className="mt-1 text-xs text-muted-foreground">
                              ID: {studio._id.slice(-6)}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium">
                          {studio.category}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4 shrink-0" />
                          <span className="max-w-[180px] truncate">
                            {studio.location}
                          </span>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <p className="font-semibold">
                          ৳{Number(studio.hourlyRate).toLocaleString()}
                          <span className="text-xs font-normal text-muted-foreground">
                            /hr
                          </span>
                        </p>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/studios/edit/${studio._id}`}
                            title="Edit studio"
                            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border transition hover:border-lime-500 hover:bg-lime-50 hover:text-lime-700 dark:hover:bg-lime-950"
                          >
                            <Edit className="h-4 w-4" />
                          </Link>

                          <button
                            type="button"
                            title="Delete studio"
                            onClick={() => setSelectedStudio(studio)}
                            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border text-red-500 transition hover:border-red-500 hover:bg-red-50 dark:hover:bg-red-950"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="divide-y md:hidden">
              {studios.map((studio) => (
                <div key={studio._id} className="p-4">
                  <div className="flex gap-4">
                    <div className="relative h-24 w-28 shrink-0 overflow-hidden rounded-xl bg-muted">
                      {studio.imageUrl ? (
                        <Image
                          src={studio.imageUrl}
                          alt={studio.title}
                          fill
                          sizes="112px"
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center">
                          <ImageIcon className="h-6 w-6 text-muted-foreground" />
                        </div>
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="truncate font-semibold">
                        {studio.title}
                      </h3>

                      <p className="mt-1 text-xs text-muted-foreground">
                        {studio.category}
                      </p>

                      <p className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
                        <MapPin className="h-3.5 w-3.5" />
                        <span className="truncate">{studio.location}</span>
                      </p>

                      <p className="mt-2 font-semibold">
                        ৳{Number(studio.hourlyRate).toLocaleString()}
                        <span className="text-xs font-normal text-muted-foreground">
                          /hour
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex gap-2">
                    <Link
                      href={`/studios/edit/${studio._id}`}
                      className="flex flex-1 items-center justify-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition hover:bg-muted"
                    >
                      <Edit className="h-4 w-4" />
                      Edit
                    </Link>

                    <button
                      type="button"
                      onClick={() => setSelectedStudio(studio)}
                      className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-500 transition hover:bg-red-50 dark:border-red-900 dark:hover:bg-red-950"
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Back to studios */}
        <div className="mt-6">
          <Link
            href="/studios"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground"
          >
            Browse all studios
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Delete confirmation dialog */}
      {selectedStudio && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-6"
          onClick={() => !deleting && setSelectedStudio(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-dialog-title"
            className="w-full max-w-md rounded-2xl border bg-background p-6 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-5 flex items-start justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-100 text-red-600 dark:bg-red-950">
                <Trash2 className="h-6 w-6" />
              </div>

              <button
                type="button"
                disabled={deleting}
                onClick={() => setSelectedStudio(null)}
                className="rounded-lg p-2 text-muted-foreground transition hover:bg-muted"
                aria-label="Close dialog"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <h2
              id="delete-dialog-title"
              className="text-xl font-bold"
            >
              Delete this studio?
            </h2>

            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-foreground">
                {selectedStudio.title}
              </span>
              ? This action cannot be undone.
            </p>

            <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                disabled={deleting}
                onClick={() => setSelectedStudio(null)}
                className="rounded-xl border px-5 py-2.5 text-sm font-semibold transition hover:bg-muted disabled:opacity-50"
              >
                Keep Listing
              </button>

              <button
                type="button"
                disabled={deleting}
                onClick={handleDelete}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {deleting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 className="h-4 w-4" />
                    Delete Studio
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
