"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Camera,
  Mail,
  Aperture,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Explore Studios", href: "/studios" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const categories = [
  "Photo Studios",
  "Film Stages",
  "Podcast Lounges",
  "Music Suites",
  "Workshops",
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Please enter your email address.");
      return;
    }

    try {
      setLoading(true);

      // Connect your newsletter API here.
      // This is currently a UI-only subscription preview.

      toast.success("Thanks for joining StudioSpace!");
      setEmail("");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="border-t border-border bg-[#10110F] text-white">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10">
        {/* Main Footer */}
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#C8FF00]">
                <Aperture className="h-6 w-6 text-black" />
              </div>

              <span className="text-2xl font-bold tracking-tight">
                StudioSpace<span className="text-[#C8FF00]">.</span>
              </span>
            </Link>

            <p className="mt-6 max-w-xs text-sm leading-7 text-gray-400">
              Where creative ideas find their perfect space. Discover, book, and
              create in inspiring studios built for your next big idea.
            </p>

            <p className="mt-5 text-xs font-semibold tracking-[0.18em] text-[#C8FF00]">
              CREATE SOMETHING GREAT.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-base font-semibold">Explore</h3>

            <ul className="mt-6 space-y-4">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 transition hover:text-[#C8FF00]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-base font-semibold">Popular Categories</h3>

            <ul className="mt-6 space-y-4">
              {categories.map((category) => (
                <li key={category}>
                  <Link
                    href={`/studios?category=${encodeURIComponent(category)}`}
                    className="text-sm text-gray-400 transition hover:text-[#C8FF00]"
                  >
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-base font-semibold">
              Stay in the creative loop.
            </h3>

            <p className="mt-5 text-sm leading-7 text-gray-400">
              Get studio inspiration, updates, and exclusive offers delivered to
              your inbox.
            </p>

            <form onSubmit={handleSubscribe} className="mt-6">
              <label htmlFor="footer-email" className="sr-only">
                Email address
              </label>

              <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 p-1.5 focus-within:border-[#C8FF00]">
                <Mail className="ml-2 h-4 w-4 shrink-0 text-gray-400" />

                <input
                  id="footer-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="min-w-0 flex-1 bg-transparent px-2 py-2 text-sm text-white outline-none placeholder:text-gray-500"
                />

                <button
                  type="submit"
                  disabled={loading}
                  aria-label="Subscribe to newsletter"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#C8FF00] text-black transition hover:bg-[#b5e600] disabled:opacity-50"
                >
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            </form>

            {/* Social Links */}
            <div className="mt-7">
              <h4 className="text-sm font-medium">Follow our journey</h4>

              <div className="mt-4 flex items-center gap-3">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="rounded-lg border border-white/10 p-3 text-gray-400 transition hover:border-[#C8FF00] hover:text-[#C8FF00]"
                >
                  <Camera className="h-5 w-5" />
                </a>

                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="rounded-lg border border-white/10 p-3 text-gray-400 transition hover:border-[#C8FF00] hover:text-[#C8FF00]"
                >
                  <span className="text-xl font-bold" aria-hidden="true">f</span>
                </a>

                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="rounded-lg border border-white/10 p-3 text-gray-400 transition hover:border-[#C8FF00] hover:text-[#C8FF00]"
                >
                  <span className="text-sm font-bold" aria-hidden="true">in</span>
                </a>

                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="X"
                  className="rounded-lg border border-white/10 p-3 text-gray-400 transition hover:border-[#C8FF00] hover:text-[#C8FF00]"
                >
                  <span className="text-xl font-bold">𝕏</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 flex flex-col gap-5 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-center text-xs text-gray-500 sm:text-left">
            © {new Date().getFullYear()} StudioSpace. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6">
            <Link
              href="/privacy"
              className="text-xs text-gray-500 transition hover:text-[#C8FF00]"
            >
              Privacy Policy
            </Link>

            <Link
              href="/terms"
              className="text-xs text-gray-500 transition hover:text-[#C8FF00]"
            >
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
