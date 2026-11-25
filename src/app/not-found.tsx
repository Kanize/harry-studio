
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  Aperture,
  Camera,
  Home,
  Sparkles,
} from "lucide-react";
import GoBackButton from "@/components/GoBackButton";

export default function NotFound() {
  return (
    <main className="relative flex min-h-[calc(100vh-80px)] items-center justify-center overflow-hidden bg-background px-5 py-16 text-foreground">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-[#C8FF00]/10 blur-[100px]" />
        <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-[#C8FF00]/10 blur-[100px]" />

        <div className="absolute inset-0 opacity-[0.035] bg-[linear-gradient(to_right,#888_1px,transparent_1px),linear-gradient(to_bottom,#888_1px,transparent_1px)] [background-size:40px_40px]" />
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Illustration */}
        <div className="relative mx-auto w-full max-w-130">
          <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#C8FF00]/10 blur-3xl" />

          <div className="relative rounded-4xl border border-border bg-card/70 p-5 shadow-2xl backdrop-blur-sm sm:p-8">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#C8FF00] text-black">
                  <Aperture size={20} />
                </span>
                <span className="text-sm font-bold tracking-tight">
                  STUDIO SPACE
                </span>
              </div>

              <span className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
                ERROR 404
              </span>
            </div>

            {/* Creative studio illustration */}
            <div className="relative flex aspect-5/4 items-center justify-center overflow-hidden rounded-2xl bg-muted/60">
              <div className="absolute bottom-0 h-20 w-full bg-foreground/4" />

              {/* Spotlight */}
              <div className="absolute -top-10 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-[#C8FF00]/10 blur-2xl" />

              <svg
                viewBox="0 0 480 340"
                className="relative z-10 h-full w-full"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-label="Creative photography studio illustration"
              >
                {/* Floor */}
                <path
                  d="M35 286H445"
                  stroke="currentColor"
                  strokeOpacity=".15"
                  strokeWidth="2"
                />

                {/* Studio light stand */}
                <path
                  d="M90 286L112 155L135 286M100 230H128"
                  stroke="currentColor"
                  strokeWidth="5"
                  strokeLinecap="round"
                />
                <path
                  d="M78 155H146L134 116H90L78 155Z"
                  fill="#C8FF00"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinejoin="round"
                />
                <path
                  d="M112 155V174"
                  stroke="currentColor"
                  strokeWidth="4"
                />

                {/* Camera tripod */}
                <path
                  d="M240 195L195 286M240 195L285 286M240 195V286"
                  stroke="currentColor"
                  strokeWidth="5"
                  strokeLinecap="round"
                />

                {/* Camera body */}
                <rect
                  x="167"
                  y="139"
                  width="146"
                  height="94"
                  rx="15"
                  fill="#C8FF00"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  d="M195 139L207 120H254L267 139"
                  fill="#C8FF00"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinejoin="round"
                />
                <circle
                  cx="240"
                  cy="186"
                  r="31"
                  fill="#171717"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <circle
                  cx="240"
                  cy="186"
                  r="19"
                  fill="#C8FF00"
                  stroke="white"
                  strokeWidth="3"
                />
                <circle cx="240" cy="186" r="8" fill="#171717" />
                <circle cx="285" cy="155" r="5" fill="#171717" />

                {/* Camera display */}
                <rect
                  x="177"
                  y="150"
                  width="25"
                  height="13"
                  rx="3"
                  fill="#171717"
                />

                {/* Floating 404 */}
                <rect
                  x="324"
                  y="62"
                  width="112"
                  height="67"
                  rx="15"
                  fill="currentColor"
                  fillOpacity=".06"
                  stroke="currentColor"
                  strokeOpacity=".15"
                  strokeWidth="2"
                />
                <text
                  x="380"
                  y="105"
                  fill="currentColor"
                  fontSize="30"
                  fontWeight="800"
                  textAnchor="middle"
                >
                  404
                </text>

                {/* Decorative sparkles */}
                <path
                  d="M344 184L350 199L365 205L350 211L344 226L338 211L323 205L338 199L344 184Z"
                  fill="#C8FF00"
                />
                <path
                  d="M390 245L394 254L403 258L394 262L390 271L386 262L377 258L386 254L390 245Z"
                  fill="#C8FF00"
                />
                <circle cx="155" cy="80" r="5" fill="#C8FF00" />
                <circle cx="310" cy="88" r="4" fill="#C8FF00" />

                {/* Small plant */}
                <path
                  d="M395 286V251M395 265C374 264 372 246 374 239C390 240 397 249 395 265ZM395 274C414 269 418 254 415 248C401 249 394 258 395 274Z"
                  fill="#C8FF00"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
                <path
                  d="M378 286H412"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>

              <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full border border-border bg-background/80 px-3 py-2 text-xs font-medium backdrop-blur">
                <span className="h-2 w-2 rounded-full bg-[#C8FF00]" />
                Creative space
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between">
              <p className="text-xs text-muted-foreground">
                FIND YOUR CREATIVE SPACE
              </p>
              <Sparkles size={17} className="text-[#65B800]" />
            </div>
          </div>

          {/* Floating decoration */}
          <div className="absolute -right-4 -top-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-border bg-card shadow-lg sm:-right-6">
            <Camera size={24} className="text-[#65B800]" />
          </div>
        </div>

        {/* Content */}
        <div className="mx-auto max-w-lg text-center lg:mx-0 lg:text-left">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#C8FF00]/30 bg-[#C8FF00]/10 px-4 py-2 text-sm font-semibold text-[#65B800]">
            <Sparkles size={15} />
            Oops! Wrong creative space
          </div>

          <h1 className="text-7xl font-black tracking-tighter sm:text-8xl lg:text-9xl">
            4<span className="text-[#65B800]">0</span>4
          </h1>

          <h2 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl">
            Page not found.
          </h2>

          <p className="mx-auto mt-4 max-w-md text-base leading-7 text-muted-foreground lg:mx-0">
            Looks like this creative space doesn&apos;t exist. The page you&apos;re
            looking for may have been moved, deleted, or never existed.
          </p>

          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
            <Link
              href="/"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[#C8FF00] px-7 py-3.5 font-bold text-black shadow-lg shadow-[#C8FF00]/10 transition-all duration-300 hover:-translate-y-1 hover:bg-[#b5eb00] hover:shadow-xl"
            >
              <Home size={19} />
              Return to Home
              <ArrowUpRight
                size={18}
                className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </Link>

            <GoBackButton />
          </div>

          <p className="mt-10 text-xs font-medium tracking-widest text-muted-foreground">
            STUDIO SPACE · CREATE SOMETHING AMAZING
          </p>
        </div>
      </div>
    </main>
  );
}
