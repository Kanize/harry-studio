
"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  CalendarDays,
  Clock,
  MapPin,
  Loader2,
  XCircle,
  CalendarCheck,
  RefreshCw,
} from "lucide-react";
import { toast } from "sonner";

import { authClient } from "@/lib/auth-client";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

type BookingStatus =
  | "Pending"
  | "Confirmed"
  | "Completed"
  | "Cancelled";

interface Booking {
  _id: string;
  studioId: string;
  studioName: string;
  studioImage: string;
  studioLocation: string;

  bookingDate: string;
  startTime: string;
  endTime: string;
  hours: number;

  hourlyRate: number;
  securityDeposit: number;
  subtotal: number;
  totalPrice: number;

  status: BookingStatus;
  createdAt: string;
}

const statusStyles: Record<BookingStatus, string> = {
  Pending: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  Confirmed: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  Completed: "bg-green-500/10 text-green-600 border-green-500/20",
  Cancelled: "bg-red-500/10 text-red-600 border-red-500/20",
};

function formatDate(date: string) {
  if (!date) return "N/A";

  const [year, month, day] = date.split("-").map(Number);

  return new Date(year, month - 1, day).toLocaleDateString(
    "en-US",
    {
      month: "long",
      day: "numeric",
      year: "numeric",
    }
  );
}

function formatPrice(price: number) {
  return `৳${Number(price || 0).toLocaleString("en-BD")}`;
}

export default function MyBookingsPage() {
  const router = useRouter();

  const { data: session, isPending: sessionLoading } =
    authClient.useSession();

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState<string | null>(
    null
  );

  // Fetch logged-in user's bookings
  const fetchBookings = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/my-bookings`, {
        method: "GET",
        credentials: "include",
        cache: "no-store",
      });

      const data = await response.json();

      if (response.status === 401) {
        router.replace("/login");
        return;
      }

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Failed to fetch your bookings."
        );
      }

      setBookings(
        Array.isArray(data.bookings) ? data.bookings : []
      );
    } catch (error) {
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

    if (!session) {
      router.replace("/login");
      return;
    }

    const timeoutId = window.setTimeout(() => {
      void fetchBookings();
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [session, sessionLoading, fetchBookings, router]);

  // Cancel pending booking
  const handleCancelBooking = async (bookingId: string) => {
  setCancellingId(bookingId);
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/bookings/${bookingId}/cancel`,
      {
        method: "PATCH",
        credentials: "include",
      }
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message);
    }

    toast.success("Booking cancelled successfully!");

    // Booking list আবার load করবে
    fetchBookings();
  } catch (error) {
    toast.error(
      error instanceof Error
        ? error.message
        : "Failed to cancel booking."
    );
  } finally {
    setCancellingId(null);
  }
};

  // Booking statistics
  const pendingCount = bookings.filter(
    (booking) => booking.status === "Pending"
  ).length;

  const confirmedCount = bookings.filter(
    (booking) => booking.status === "Confirmed"
  ).length;

  const completedCount = bookings.filter(
    (booking) => booking.status === "Completed"
  ).length;

  // Loading
  if (sessionLoading || loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <Loader2 className="h-9 w-9 animate-spin text-primary" />
      </div>
    );
  }

  if (!session) return null;

  return (
    <main className="min-h-screen bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              Your Reservations
            </p>

            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              My Bookings
            </h1>

            <p className="mt-3 text-muted-foreground">
              Manage and track your studio reservations.
            </p>
          </div>

          <Link
            href="/studios"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 font-semibold text-primary-foreground transition hover:opacity-90"
          >
            Explore Studios
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Statistics */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Bookings"
            value={bookings.length}
          />

          <StatCard
            title="Pending"
            value={pendingCount}
            valueClass="text-amber-600"
          />

          <StatCard
            title="Confirmed"
            value={confirmedCount}
            valueClass="text-blue-600"
          />

          <StatCard
            title="Completed"
            value={completedCount}
            valueClass="text-green-600"
          />
        </div>

        {/* Booking List Header */}
        <div className="mb-5 flex items-center justify-between gap-3">
          <h2 className="text-xl font-bold">
            Reservation History
          </h2>

          <button
            type="button"
            onClick={() => {
              setLoading(true);
              fetchBookings();
            }}
            className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm font-medium transition hover:bg-muted"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </button>
        </div>

        {/* Empty State */}
        {bookings.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-card px-5 py-16 text-center">
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-primary/10 text-primary">
              <CalendarCheck className="h-8 w-8" />
            </div>

            <h2 className="mt-5 text-xl font-bold">
              No bookings yet
            </h2>

            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
              You haven&apos;t made any studio reservations yet.
              Explore our studios and book your perfect workspace.
            </p>

            <Link
              href="/studios"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 font-semibold text-primary-foreground transition hover:opacity-90"
            >
              Browse Studios
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          <div className="space-y-5">
            {bookings.map((booking) => (
              <article
                key={booking._id}
                className="overflow-hidden rounded-2xl border border-border bg-card transition hover:shadow-md"
              >
                <div className="flex flex-col md:flex-row">
                  {/* Studio Image */}
                  <div className="relative h-56 w-full shrink-0 bg-muted md:min-h-65 md:w-64">
                    {booking.studioImage ? (
                      <Image
                        src={booking.studioImage}
                        alt={booking.studioName || "Studio"}
                        fill
                        unoptimized
                        sizes="(max-width: 768px) 100vw, 256px"
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                        No image available
                      </div>
                    )}
                  </div>

                  {/* Booking Details */}
                  <div className="flex flex-1 flex-col justify-between gap-5 p-5 sm:p-6">
                    <div>
                      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                        <span className="text-xs text-muted-foreground">
                          Booking ID: {booking._id.slice(-8)}
                        </span>

                        <span
                          className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                            statusStyles[booking.status] ||
                            "bg-muted text-muted-foreground"
                          }`}
                        >
                          {booking.status}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold">
                        {booking.studioName || "Studio"}
                      </h3>

                      <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4 shrink-0" />
                        {booking.studioLocation || "Location unavailable"}
                      </p>

                      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="flex items-center gap-3">
                          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                            <CalendarDays className="h-5 w-5" />
                          </div>

                          <div>
                            <p className="text-xs text-muted-foreground">
                              Booking Date
                            </p>
                            <p className="mt-1 text-sm font-semibold">
                              {formatDate(booking.bookingDate)}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                            <Clock className="h-5 w-5" />
                          </div>

                          <div>
                            <p className="text-xs text-muted-foreground">
                              Booking Time
                            </p>
                            <p className="mt-1 text-sm font-semibold">
                              {booking.startTime} – {booking.endTime}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="flex flex-col justify-between gap-4 border-t border-border pt-5 sm:flex-row sm:items-center">
                      <div>
                        <p className="text-xs text-muted-foreground">
                          Total Amount
                        </p>

                        <p className="mt-1 text-2xl font-bold">
                          {formatPrice(booking.totalPrice)}
                        </p>

                        <p className="mt-1 text-xs text-muted-foreground">
                          {booking.hours} hour(s) ·{" "}
                          {formatPrice(booking.hourlyRate)}/hour
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <Link
                          href={`/studios/${booking.studioId}`}
                          className="inline-flex items-center justify-center gap-2 rounded-xl border border-border px-4 py-2.5 text-sm font-semibold transition hover:bg-muted"
                        >
                          View Studio
                          <ArrowRight className="h-4 w-4" />
                        </Link>

                        {booking.status === "Pending" && (
                          <button
                            type="button"
                            disabled={cancellingId === booking._id}
                            onClick={() =>
                              handleCancelBooking(booking._id)
                            }
                            className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-500/20 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            {cancellingId === booking._id ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <XCircle className="h-4 w-4" />
                            )}

                            {cancellingId === booking._id
                              ? "Cancelling..."
                              : "Cancel Booking"}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

// Reusable Statistics Card
function StatCard({
  title,
  value,
  valueClass = "",
}: {
  title: string;
  value: number;
  valueClass?: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <p className="text-sm text-muted-foreground">{title}</p>

      <p className={`mt-3 text-3xl font-bold ${valueClass}`}>
        {value}
      </p>
    </div>
  );
}
