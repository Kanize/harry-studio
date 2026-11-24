
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import type { FormEvent, ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  Clock,
  MapPin,
  Pencil,
  ShieldCheck,
  Star,
  Trash2,
  Users,
  X,
  Loader2,
} from "lucide-react";

import { authClient } from "@/lib/auth-client";
import type { Istudio } from "@/type/StudioType";

type StudioDetailsProps = {
  studio: Istudio;
  currentUserEmail?: string;
};

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export default function StudioDetails({
  studio,
  currentUserEmail,
}: StudioDetailsProps) {
  const router = useRouter();

  // Authentication
  const { data: session, isPending: sessionLoading } =
    authClient.useSession();

  // Loading states
  const [isDeleting, setIsDeleting] = useState(false);
  const [isBooking, setIsBooking] = useState(false);

  // Studio owner verification for UI
  const userEmail = session?.user?.email || currentUserEmail;

  const isOwner =
    Boolean(userEmail) &&
    userEmail?.trim().toLowerCase() ===
      studio.hostEmail?.trim().toLowerCase();

  // Gallery states
  const [activeImage, setActiveImage] = useState(0);

  // Booking states
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingDate, setBookingDate] = useState("");
  const [startTime, setStartTime] = useState("10:00");
  const [hours, setHours] = useState(2);
  const [minDate, setMinDate] = useState("");

  // Open booking modal
  function openBooking() {
    const today = new Date();

    const formattedDate = [
      today.getFullYear(),
      String(today.getMonth() + 1).padStart(2, "0"),
      String(today.getDate()).padStart(2, "0"),
    ].join("-");

    setMinDate(formattedDate);
    setBookingOpen(true);
  }

  // Studio gallery
  const gallery = Array.from(
    new Set(
      [studio.imageUrl, ...(studio.images ?? [])].filter(
        (image): image is string => Boolean(image)
      )
    )
  );

  const currentImage = gallery[activeImage];

  // Reviews
  const reviews = studio.reviews ?? [];

  const averageRating =
    studio.rating ??
    (reviews.length
      ? reviews.reduce(
          (total, review) => total + Number(review.rating || 0),
          0
        ) / reviews.length
      : null);

  // Price calculation (display only)
  const hourlyRate = Number(studio.hourlyRate) || 0;
  const subtotal = hourlyRate * hours;
  const deposit = Number(studio.securityDeposit) || 0;
  const total = subtotal + deposit;

  // Delete studio
  async function handleDeleteStudio() {
    if (!studio._id) {
      toast.error("Studio ID is missing.");
      return;
    }

    if (!session) {
      toast.error("Please login first.");
      router.push("/login");
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to delete "${studio.title}"? This action cannot be undone.`
    );

    if (!confirmed) return;

    try {
      setIsDeleting(true);

      const response = await fetch(
        `${API_URL}/studios/${encodeURIComponent(studio._id)}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const data = await response.json().catch(() => ({}));

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Failed to delete studio."
        );
      }

      toast.success("Studio deleted successfully!");

      router.push("/my-listings");
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );
    } finally {
      setIsDeleting(false);
    }
  }

  // Create booking
  async function handleBookingSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (sessionLoading || isBooking) return;

    // Authentication check
    if (!session) {
      toast.error("Please login to book this studio.");
      router.push("/login");
      return;
    }

    if (!studio._id) {
      toast.error("Studio information is missing.");
      return;
    }

    if (!bookingDate || !startTime || hours < 1) {
      toast.error("Please complete all booking fields.");
      return;
    }

    try {
      setIsBooking(true);

      const response = await fetch(`${API_URL}/bookings`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          studioId: studio._id,
          bookingDate,
          startTime,
          hours: Number(hours),
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (response.status === 401) {
        toast.error("Your session has expired. Please login again.");
        router.push("/login");
        return;
      }

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Failed to submit booking request."
        );
      }

      toast.success("Booking request submitted successfully!");

      // Reset booking form
      setBookingOpen(false);
      setBookingDate("");
      setStartTime("10:00");
      setHours(2);

      // Navigate to My Bookings
      router.push("/my-bookings");
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong while booking."
      );
    } finally {
      setIsBooking(false);
    }
  }

  // Gallery navigation
  function showPreviousImage() {
    setActiveImage(
      (current) => (current - 1 + gallery.length) % gallery.length
    );
  }

  function showNextImage() {
    setActiveImage(
      (current) => (current + 1) % gallery.length
    );
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Back Navigation */}
        <Link
          href="/studios"
          className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Explore Studios
        </Link>

        {/* Title and Rating */}
        <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="inline-flex rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-semibold text-foreground">
              {studio.category}
            </span>

            <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              {studio.title}
            </h1>

            <p className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 shrink-0" />
              {studio.location}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {isOwner && (
              <div className="flex items-center gap-2">
                <Link
                  href={`/studios/edit/${studio._id}`}
                  className="inline-flex items-center gap-2 rounded-xl border border-border px-4 py-2.5 text-sm font-semibold transition hover:border-primary hover:bg-primary/10"
                >
                  <Pencil className="h-4 w-4" />
                  Edit
                </Link>

                <button
                  type="button"
                  onClick={handleDeleteStudio}
                  disabled={isDeleting}
                  className="inline-flex items-center gap-2 rounded-xl border border-red-500/30 px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isDeleting ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Trash2 className="h-4 w-4" />
                  )}
                  {isDeleting ? "Deleting..." : "Delete"}
                </button>
              </div>
            )}

            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 fill-amber-400 text-amber-400" />

              <span className="font-semibold">
                {averageRating != null &&
                Number.isFinite(Number(averageRating))
                  ? Number(averageRating).toFixed(1)
                  : "New"}
              </span>

              <span className="text-sm text-muted-foreground">
                ({reviews.length} reviews)
              </span>
            </div>
          </div>
        </div>

        {/* Image Gallery */}
        <section className="mb-12">
          {gallery.length > 0 && currentImage ? (
            <>
              <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-muted sm:aspect-[2/1]">
                <Image
                  src={currentImage}
                  alt={`${studio.title} gallery image ${activeImage + 1}`}
                  fill
                  priority
                  unoptimized
                  sizes="(max-width: 768px) 100vw, 1200px"
                  className="object-cover"
                />

                {gallery.length > 1 && (
                  <>
                    <button
                      type="button"
                      aria-label="Previous image"
                      onClick={showPreviousImage}
                      className="absolute left-4 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-black/60 text-white backdrop-blur transition hover:bg-black/80"
                    >
                      <ArrowLeft className="h-5 w-5" />
                    </button>

                    <button
                      type="button"
                      aria-label="Next image"
                      onClick={showNextImage}
                      className="absolute right-4 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-black/60 text-white backdrop-blur transition hover:bg-black/80"
                    >
                      <ArrowRight className="h-5 w-5" />
                    </button>
                  </>
                )}

                <span className="absolute bottom-4 right-4 rounded-full bg-black/70 px-3 py-1.5 text-xs text-white">
                  {activeImage + 1} / {gallery.length}
                </span>
              </div>

              {gallery.length > 1 && (
                <div className="mt-3 flex gap-3 overflow-x-auto pb-2">
                  {gallery.map((image, index) => (
                    <button
                      type="button"
                      key={`${image}-${index}`}
                      onClick={() => setActiveImage(index)}
                      aria-label={`Show image ${index + 1}`}
                      aria-pressed={activeImage === index}
                      className={`relative h-20 w-28 shrink-0 overflow-hidden rounded-xl border-2 transition ${
                        activeImage === index
                          ? "border-primary"
                          : "border-transparent opacity-70 hover:opacity-100"
                      }`}
                    >
                      <Image
                        src={image}
                        alt={`${studio.title} thumbnail ${index + 1}`}
                        fill
                        unoptimized
                        sizes="112px"
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="flex aspect-[16/9] items-center justify-center rounded-2xl bg-muted text-muted-foreground">
              No studio images available
            </div>
          )}
        </section>

        {/* Details and Booking Card */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_350px]">
          <div className="space-y-10">
            {/* About */}
            <section>
              <h2 className="text-2xl font-bold">
                About this workspace
              </h2>

              <p className="mt-4 whitespace-pre-line leading-8 text-muted-foreground">
                {studio.overview ||
                  "Studio details will be added by the host."}
              </p>
            </section>

            {/* Specifications */}
            <section>
              <h2 className="text-2xl font-bold">
                Workspace specifications
              </h2>

              <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Specification
                  icon={<Clock className="h-5 w-5" />}
                  label="Hourly rate"
                  value={`$${hourlyRate.toFixed(2)} / hour`}
                />

                <Specification
                  icon={<ShieldCheck className="h-5 w-5" />}
                  label="Security deposit"
                  value={`$${deposit.toFixed(2)}`}
                />

                <Specification
                  icon={<Users className="h-5 w-5" />}
                  label="Maximum capacity"
                  value={
                    studio.maxCapacity
                      ? `${studio.maxCapacity} people`
                      : "Not specified"
                  }
                />

                <Specification
                  icon={<MapPin className="h-5 w-5" />}
                  label="Location"
                  value={studio.location}
                />
              </div>
            </section>

            {/* Amenities */}
            <section>
              <h2 className="text-2xl font-bold">
                Amenities & facilities
              </h2>

              {studio.amenities?.length ? (
                <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {studio.amenities.map((amenity) => (
                    <div
                      key={amenity}
                      className="flex items-center gap-3 text-sm text-muted-foreground"
                    >
                      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                        <Check className="h-4 w-4" />
                      </span>

                      {amenity}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="mt-4 text-sm text-muted-foreground">
                  No amenities listed yet.
                </p>
              )}
            </section>

            {/* Host Details */}
            <section className="rounded-2xl border border-border bg-card p-6">
              <h2 className="text-xl font-bold">
                Meet your host
              </h2>

              <div className="mt-5 flex items-center gap-4">
                <div className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-primary/15 text-xl font-bold text-foreground">
                  {(studio.hostName || "H")
                    .charAt(0)
                    .toUpperCase()}
                </div>

                <div className="min-w-0">
                  <p className="font-semibold">
                    {studio.hostName || "Studio Host"}
                  </p>

                  <p className="mt-1 break-all text-sm text-muted-foreground">
                    {studio.hostEmail || "Host contact unavailable"}
                  </p>
                </div>
              </div>

              <p className="mt-4 text-sm leading-6 text-muted-foreground">
                Contact information is displayed when supplied by
                the studio host.
              </p>
            </section>

            {/* Reviews */}
            <section>
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-2xl font-bold">
                  Guest reviews
                </h2>

                <span className="text-sm text-muted-foreground">
                  {reviews.length} reviews
                </span>
              </div>

              {reviews.length ? (
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  {reviews.map((review, index) => (
                    <article
                      key={review._id || `${review.name}-${index}`}
                      className="rounded-2xl border border-border bg-card p-5"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <p className="font-semibold">
                          {review.name}
                        </p>

                        <span className="flex items-center gap-1 text-sm">
                          <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                          {Number(review.rating || 0).toFixed(1)}
                        </span>
                      </div>

                      <p className="mt-3 text-sm leading-6 text-muted-foreground">
                        {review.comment}
                      </p>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="mt-5 rounded-2xl border border-dashed border-border p-8 text-center">
                  <Star className="mx-auto h-7 w-7 text-muted-foreground" />

                  <p className="mt-3 font-medium">
                    No reviews yet
                  </p>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Reviews will appear here when guests share their
                    experiences.
                  </p>
                </div>
              )}
            </section>
          </div>

          {/* Sticky Booking Card */}
          <aside className="h-fit lg:sticky lg:top-24">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <p className="text-sm text-muted-foreground">
                Your creative space awaits
              </p>

              <p className="mt-2 text-3xl font-bold">
                ${hourlyRate.toFixed(2)}

                <span className="text-base font-normal text-muted-foreground">
                  {" "}/ hour
                </span>
              </p>

              <div className="my-6 space-y-4 border-y border-border py-5">
                <div className="flex justify-between gap-3 text-sm">
                  <span className="text-muted-foreground">
                    Security deposit
                  </span>

                  <span className="font-medium">
                    ${deposit.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between gap-3 text-sm">
                  <span className="text-muted-foreground">
                    Maximum capacity
                  </span>

                  <span className="font-medium">
                    {studio.maxCapacity ?? "—"}
                  </span>
                </div>
              </div>

              <button
                type="button"
                disabled={sessionLoading}
                onClick={() => {
                  if (sessionLoading) return;

                  if (!session) {
                    toast.error("Please login to book this studio.");
                    router.push("/login");
                    return;
                  }

                  if (isOwner) {
                    toast.error("You cannot book your own studio.");
                    return;
                  }

                  openBooking();
                }}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-4 font-semibold text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {sessionLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    Book Workspace Now
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>

              <p className="mt-4 text-center text-xs leading-5 text-muted-foreground">
                Check your booking details before confirming.
              </p>
            </div>
          </aside>
        </div>
      </div>

      {/* Booking Modal */}
      {bookingOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/65 p-4 backdrop-blur-sm"
          onClick={(event) => {
            if (
              event.target === event.currentTarget &&
              !isBooking
            ) {
              setBookingOpen(false);
            }
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="booking-title"
            className="my-auto w-full max-w-lg rounded-2xl border border-border bg-background p-6 shadow-2xl sm:p-8"
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                  Reservation
                </p>

                <h2
                  id="booking-title"
                  className="mt-2 text-2xl font-bold"
                >
                  Book your workspace
                </h2>

                <p className="mt-2 text-sm text-muted-foreground">
                  {studio.title}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setBookingOpen(false)}
                disabled={isBooking}
                aria-label="Close booking modal"
                className="rounded-lg p-2 text-muted-foreground transition hover:bg-muted hover:text-foreground disabled:opacity-50"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Booking Form */}
            <form
              onSubmit={handleBookingSubmit}
              className="mt-7 space-y-5"
            >
              {/* Booking Date */}
              <div>
                <label
                  htmlFor="booking-date"
                  className="mb-2 block text-sm font-medium"
                >
                  Booking date
                </label>

                <div className="relative">
                  <CalendarDays className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                  <input
                    id="booking-date"
                    type="date"
                    min={minDate || undefined}
                    required
                    disabled={isBooking}
                    value={bookingDate}
                    onChange={(event) =>
                      setBookingDate(event.target.value)
                    }
                    className="h-12 w-full rounded-xl border border-border bg-background pl-10 pr-3 text-sm outline-none focus:border-primary disabled:opacity-60"
                  />
                </div>
              </div>

              {/* Time and Duration */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="start-time"
                    className="mb-2 block text-sm font-medium"
                  >
                    Start time
                  </label>

                  <input
                    id="start-time"
                    type="time"
                    required
                    disabled={isBooking}
                    value={startTime}
                    onChange={(event) =>
                      setStartTime(event.target.value)
                    }
                    className="h-12 w-full rounded-xl border border-border bg-background px-3 text-sm outline-none focus:border-primary disabled:opacity-60"
                  />
                </div>

                <div>
                  <label
                    htmlFor="booking-hours"
                    className="mb-2 block text-sm font-medium"
                  >
                    Duration
                  </label>

                  <select
                    id="booking-hours"
                    value={hours}
                    disabled={isBooking}
                    onChange={(event) =>
                      setHours(Number(event.target.value))
                    }
                    className="h-12 w-full rounded-xl border border-border bg-background px-3 text-sm outline-none focus:border-primary disabled:opacity-60"
                  >
                    {[1, 2, 3, 4, 5, 6, 8, 10, 12].map(
                      (hour) => (
                        <option key={hour} value={hour}>
                          {hour} {hour === 1 ? "hour" : "hours"}
                        </option>
                      )
                    )}
                  </select>
                </div>
              </div>

              {/* Price Summary */}
              <div className="space-y-3 rounded-xl bg-muted/60 p-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    ${hourlyRate.toFixed(2)} × {hours} hours
                  </span>

                  <span>${subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    Security deposit
                  </span>

                  <span>${deposit.toFixed(2)}</span>
                </div>

                <div className="flex justify-between border-t border-border pt-3 font-bold">
                  <span>Estimated total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isBooking || sessionLoading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-4 font-semibold text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isBooking ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Submitting Booking...
                  </>
                ) : (
                  <>
                    Confirm Booking
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>

              <p className="text-center text-xs leading-5 text-muted-foreground">
                Your booking request will be submitted as Pending.
                The host can review and confirm your reservation.
              </p>
            </form>
          </section>
        </div>
      )}
    </main>
  );
}

// Reusable Specification Component
function Specification({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex min-w-0 items-start gap-4 rounded-xl border border-border bg-card p-4">
      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-xs text-muted-foreground">
          {label}
        </p>

        <p className="mt-1 break-words text-sm font-semibold">
          {value}
        </p>
      </div>
    </div>
  );
}
