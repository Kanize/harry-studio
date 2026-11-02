
"use client";

import { useState } from "react";
import Image from "next/image";
import {
  ArrowRight,
  ImagePlus,
  MapPin,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";

const categories = [
  "Photo Studio",
  "Film Stage",
  "Podcast Lounge",
  "Music Suite",
  "Workshop",
  "Green Screen Studio",
  "Dance Studio",
  "Event Space",
  "Other",
];

const amenityOptions = [
  "Cyclorama Wall",
  "Soundproof Vocal Booth",
  "Neve / SSL Preamps",
  "Drive-In Loading Bay",
  "Client Lounge",
  "Green Screen / Blue Screen",
  "4K DMX Lighting Grid",
  "Acoustic Treatment",
  "Shure SM7B Multi-Mic Setup",
  "Hair & Makeup Vanity Station",
  "High-Speed Gigabit WiFi",
  "Heavy Rigging Trusses",
  "Industrial Screen Printing Press",
  "Air Conditioning",
  "Free Parking",
  "Restroom Access",
];

type StudioFormData = {
  title: string;
  category: string;
  hourlyRate: string;
  securityDeposit: string;
  maxCapacity: string;
  location: string;
  imageUrl: string;
  amenities: string[];
  overview: string;
};

const initialForm: StudioFormData = {
  title: "",
  category: "",
  hourlyRate: "",
  securityDeposit: "",
  maxCapacity: "",
  location: "",
  imageUrl: "",
  amenities: [],
  overview: "",
};

export default function AddStudioForm() {
  const [form, setForm] = useState<StudioFormData>(initialForm);
  const [imageError, setImageError] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Replace these demo values with the authenticated Better Auth user.
  const user = {
    name: "Studio Host",
    email: "host@example.com",
  };

  function updateField<K extends keyof StudioFormData>(
    field: K,
    value: StudioFormData[K],
  ) {
    setForm((previous) => ({ ...previous, [field]: value }));
  }

  function toggleAmenity(amenity: string) {
    setForm((previous) => ({
      ...previous,
      amenities: previous.amenities.includes(amenity)
        ? previous.amenities.filter((item) => item !== amenity)
        : [...previous.amenities, amenity],
    }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (form.amenities.length === 0) {
      toast.error("Select at least one amenity.");
      return;
    }

    setSubmitting(true);

    try {
      // UI demo only: connect your Express API here.
      await new Promise((resolve) => setTimeout(resolve, 500));

      console.log("Studio form data:", form);

      toast.success("Form validated! Connect your API to publish the listing.");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const inputClass =
    "mt-2 h-11 w-full rounded-xl border border-border bg-background px-3.5 text-sm text-foreground outline-none transition placeholder:text-muted-foreground/70 focus:border-primary focus:ring-2 focus:ring-primary/20";

  const labelClass = "text-sm font-semibold text-foreground";

  return (
    <section className="min-h-screen bg-background px-4 py-10 text-foreground sm:px-6 lg:py-16">
      <div className="mx-auto max-w-5xl">
        <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-xl shadow-black/5">
          <div className="border-b border-border bg-muted/30 px-6 py-8 sm:px-10 sm:py-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-foreground">
              <Sparkles size={14} className="text-primary" />
              Host Dashboard
            </div>

            <h1 className="mt-5 font-heading text-3xl font-bold tracking-tight sm:text-4xl">
              List Your Creative{" "}
              <span className="text-primary">Workspace.</span>
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
              Share your studio with creators. Add your space details,
              equipment, pricing, and availability information.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-9 p-6 sm:p-10">
            {/* Basic details */}
            <div>
              <div className="mb-5">
                <h2 className="text-lg font-bold">Studio Details</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Tell creators what makes your space special.
                </p>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className={labelClass} htmlFor="title">
                    Studio Title <span className="text-primary">*</span>
                  </label>
                  <input
                    id="title"
                    className={inputClass}
                    placeholder="e.g. Apex 4K Multi-Cam Podcast Studio"
                    value={form.title}
                    onChange={(e) => updateField("title", e.target.value)}
                    minLength={3}
                    maxLength={100}
                    required
                  />
                </div>

                <div>
                  <label className={labelClass} htmlFor="category">
                    Category <span className="text-primary">*</span>
                  </label>
                  <select
                    id="category"
                    className={inputClass}
                    value={form.category}
                    onChange={(e) => updateField("category", e.target.value)}
                    required
                  >
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className={labelClass} htmlFor="capacity">
                    Maximum Capacity <span className="text-primary">*</span>
                  </label>
                  <input
                    id="capacity"
                    type="number"
                    min="1"
                    max="1000"
                    className={inputClass}
                    placeholder="e.g. 10 people"
                    value={form.maxCapacity}
                    onChange={(e) =>
                      updateField("maxCapacity", e.target.value)
                    }
                    required
                  />
                </div>
              </div>
            </div>

            {/* Pricing */}
            <div>
              <h2 className="mb-5 text-lg font-bold">Pricing & Deposit</h2>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className={labelClass} htmlFor="hourlyRate">
                    Hourly Rate (USD) <span className="text-primary">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-[21px] text-sm text-muted-foreground">
                      $
                    </span>
                    <input
                      id="hourlyRate"
                      type="number"
                      min="1"
                      max="100000"
                      step="0.01"
                      className={`${inputClass} pl-8`}
                      placeholder="95.00"
                      value={form.hourlyRate}
                      onChange={(e) =>
                        updateField("hourlyRate", e.target.value)
                      }
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className={labelClass} htmlFor="deposit">
                    Security Deposit (USD){" "}
                    <span className="text-primary">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-[21px] text-sm text-muted-foreground">
                      $
                    </span>
                    <input
                      id="deposit"
                      type="number"
                      min="0"
                      max="1000000"
                      step="0.01"
                      className={`${inputClass} pl-8`}
                      placeholder="100.00"
                      value={form.securityDeposit}
                      onChange={(e) =>
                        updateField("securityDeposit", e.target.value)
                      }
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Location */}
            <div>
              <label className={labelClass} htmlFor="location">
                <span className="inline-flex items-center gap-2">
                  <MapPin size={16} className="text-primary" />
                  Location / Full Address
                </span>
                <span className="text-primary"> *</span>
              </label>
              <input
                id="location"
                className={inputClass}
                placeholder="Street, city, state, postal code"
                value={form.location}
                onChange={(e) => updateField("location", e.target.value)}
                minLength={5}
                maxLength={250}
                required
              />
            </div>

            {/* Image */}
            <div>
              <label className={labelClass} htmlFor="imageUrl">
                <span className="inline-flex items-center gap-2">
                  <ImagePlus size={16} className="text-primary" />
                  Studio Image URL
                </span>
                <span className="text-primary"> *</span>
              </label>

              <input
                id="imageUrl"
                type="url"
                className={inputClass}
                placeholder="https://example.com/studio-image.jpg"
                value={form.imageUrl}
                onChange={(e) => {
                  updateField("imageUrl", e.target.value);
                  setImageError(false);
                }}
                required
              />

              <div className="mt-3 overflow-hidden rounded-2xl border border-border bg-muted/30">
                {form.imageUrl && !imageError ? (
                  <div className="relative aspect-[16/7] w-full">
                    <Image
                      src={form.imageUrl}
                      alt="Studio preview"
                      fill
                      unoptimized
                      sizes="(max-width: 768px) 100vw, 900px"
                      className="object-cover"
                      onError={() => setImageError(true)}
                    />
                  </div>
                ) : (
                  <div className="flex aspect-[16/5] flex-col items-center justify-center gap-2 text-muted-foreground">
                    <ImagePlus size={28} />
                    <p className="text-sm">
                      {imageError
                        ? "Image could not be loaded. Check the URL."
                        : "Your studio image preview will appear here"}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Amenities */}
            <fieldset>
              <legend className={labelClass}>
                Amenities & Production Gear{" "}
                <span className="text-primary">*</span>
              </legend>
              <p className="mt-1 text-sm text-muted-foreground">
                Select everything available at your studio.
              </p>

              <div className="mt-4 grid gap-x-6 gap-y-3 rounded-2xl border border-border bg-muted/20 p-4 sm:grid-cols-2 sm:p-5">
                {amenityOptions.map((amenity) => (
                  <label
                    key={amenity}
                    className="flex cursor-pointer items-start gap-3 text-sm text-foreground/90"
                  >
                    <input
                      type="checkbox"
                      checked={form.amenities.includes(amenity)}
                      onChange={() => toggleAmenity(amenity)}
                      className="mt-0.5 size-4 shrink-0 accent-lime-500"
                    />
                    <span>{amenity}</span>
                  </label>
                ))}
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                {form.amenities.length} amenities selected
              </p>
            </fieldset>

            {/* Overview */}
            <div>
              <label className={labelClass} htmlFor="overview">
                Detailed Overview & Equipment Specifications{" "}
                <span className="text-primary">*</span>
              </label>
              <textarea
                id="overview"
                rows={5}
                minLength={20}
                maxLength={5000}
                className="mt-2 w-full resize-y rounded-xl border border-border bg-background px-3.5 py-3 text-sm text-foreground outline-none transition placeholder:text-muted-foreground/70 focus:border-primary focus:ring-2 focus:ring-primary/20"
                placeholder="Describe the studio, equipment, acoustics, lighting, access, and ideal use cases..."
                value={form.overview}
                onChange={(e) => updateField("overview", e.target.value)}
                required
              />
              <p className="mt-1 text-right text-xs text-muted-foreground">
                {form.overview.length}/5000 characters
              </p>
            </div>

            {/* Read-only host info */}
            <div className="rounded-2xl border border-primary/20 bg-primary/5 p-5">
              <div className="flex items-center gap-2 text-sm font-bold">
                <ShieldCheck size={18} className="text-primary" />
                Host Identification
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                Listing will be associated with your authenticated account.
              </p>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-xs font-medium text-muted-foreground">
                    Host Name
                  </label>
                  <input
                    value={user.name}
                    readOnly
                    className={`${inputClass} cursor-not-allowed opacity-75`}
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground">
                    Host Email
                  </label>
                  <input
                    type="email"
                    value={user.email}
                    readOnly
                    className={`${inputClass} cursor-not-allowed opacity-75`}
                  />
                </div>
              </div>
            </div>

            {/* Submit */}
            <div className="border-t border-border pt-6">
              <button
                type="submit"
                disabled={submitting}
                className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/10 transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:min-w-64"
              >
                {submitting ? "Preparing listing..." : "Publish Studio Listing"}
                {!submitting && <ArrowRight size={17} />}
              </button>
              <p className="mt-3 text-xs leading-5 text-muted-foreground">
                By publishing, you confirm that your studio details and
                equipment information are accurate.
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
