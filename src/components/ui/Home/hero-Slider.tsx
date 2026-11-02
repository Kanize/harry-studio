
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import {
  ArrowLeft,
  ArrowRight,
  Plus,
} from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  A11y,
  Keyboard,
  EffectFade,
} from "swiper/modules";

import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/effect-fade";

const backgrounds = [
  {
    src: "/images/Cinematic Photography Studio Setup.png",
    alt: "Professional photography studio setup",
  },
  {
    src: "/images/Cinematic Green Screen Soundstage.png",
    alt: "Cinematic green screen soundstage",
  },
  {
    src: "/images/Cinematic Modern Music Studio Interior.png",
    alt: "Modern music production studio",
  },
  {
    src: "/images/Modern Podcast Studio On Air.png",
    alt: "Professional podcast studio",
  },
  {
    src: "/images/Vibrant Sunlit Artist’s Studio.png",
    alt: "Sunlit creative artist studio",
  },
];

export default function HeroSlider() {
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section
      aria-label="Harry Studio creative spaces"
      className="relative isolate flex min-h-180 items-center justify-center overflow-hidden bg-[#0809083e] text-white sm:min-h-190 lg:min-h-200"
    >
      {/* =========================================
          BACKGROUND IMAGE SLIDER
      ========================================= */}
      <Swiper
        modules={[Autoplay, A11y, Keyboard, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        slidesPerView={1}
        loop
        speed={1000}
        keyboard={{ enabled: true }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        onSwiper={setSwiper}
        onSlideChange={(instance) => {
          setActiveIndex(instance.realIndex);
        }}
        className="absolute! inset-0 h-full w-full"
      >
        {backgrounds.map((background, index) => (
          <SwiperSlide key={background.src}>
            <div className="relative h-full min-h-180 w-full sm:min-h-190 lg:min-h-200">
              <Image
                src={background.src}
                alt={background.alt}
                fill
                priority={index === 0}
                sizes="100vw"
                className="object-cover object-center"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* =========================================
          DARK OVERLAY
      ========================================= */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-black/45" />

      <div className="pointer-events-none absolute inset-0 z-10 bg-linear-to-r from-black/75 via-black/50 to-black/35" />

      <div className="pointer-events-none absolute inset-0 z-10 bg-linear-to-t from-black/55 via-transparent to-black/25" />

      {/* =========================================
          CENTERED CONTENT CONTAINER
      ========================================= */}
      <div className="relative z-20 flex w-full items-center justify-center px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-5xl rounded-3xl border border-white/15 bg-black/35 px-5 py-9 text-center shadow-2xl backdrop-blur-sm sm:px-10 sm:py-12 md:px-14 md:py-14 lg:px-16 lg:py-16">

          {/* Eyebrow */}
          <div className="mb-6 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <span className="h-0.5 w-7 bg-[#C8FF00] sm:w-10" />

            <p className="text-[10px] font-bold uppercase tracking-[0.13em] text-[#C8FF00] sm:text-xs md:text-sm md:tracking-[0.18em]">
              YOUR SPACE. YOUR VISION. YOUR NEXT MASTERPIECE.
            </p>

            <span className="h-0.5 w-7 bg-[#C8FF00] sm:w-10" />
          </div>

          {/* Main Heading */}
          <h1 className="font-heading text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl xl:text-[80px]">
            Where Creative
            <br className="hidden sm:block" />{" "}
            Visions Come to{" "}
            <span className="text-[#C8FF00]">Life.</span>
          </h1>

          {/* Description */}
          <p className="mx-auto mt-6 max-w-3xl text-sm leading-7 text-white/80 sm:mt-7 sm:text-base sm:leading-8 md:text-lg">
            From professional photography studios and cinematic
            sound stages to podcast lounges and music suites —
            discover the perfect space to bring your boldest ideas
            to life.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:mt-9 sm:flex-row sm:items-center sm:gap-4">
            <Link
              href="/studios"
              className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-xl bg-[#C8FF00] px-7 py-4 font-bold text-black transition duration-300 hover:bg-[#d8ff4d] hover:shadow-[0_0_30px_rgba(200,255,0,0.18)]"
            >
              Explore Studios

              <ArrowRight
                size={20}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>

            <Link
              href="/studios"
              className="inline-flex min-h-14 items-center justify-center gap-3 rounded-xl border border-white/50 bg-white/5 px-7 py-4 font-semibold text-white transition duration-300 hover:border-[#C8FF00] hover:bg-white/10 hover:text-[#C8FF00]"
            >
              <Plus size={21} />

              Host Your Space
            </Link>
          </div>

          {/* Slider Navigation + Indicators */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-5 sm:mt-12 sm:gap-7">

            {/* Previous */}
            <button
              type="button"
              aria-label="Previous background image"
              onClick={() => swiper?.slidePrev()}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/35 bg-black/20 text-white transition duration-300 hover:border-[#C8FF00] hover:bg-[#C8FF00] hover:text-black"
            >
              <ArrowLeft size={20} />
            </button>

            {/* Indicators */}
            <div className="flex items-center gap-2">
              {backgrounds.map((background, index) => (
                <button
                  key={background.src}
                  type="button"
                  aria-label={`Show background image ${index + 1}`}
                  aria-current={
                    activeIndex === index ? "true" : undefined
                  }
                  onClick={() => swiper?.slideToLoop(index)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    activeIndex === index
                      ? "w-12 bg-[#C8FF00]"
                      : "w-5 bg-white/40 hover:bg-white/75"
                  }`}
                />
              ))}
            </div>

            {/* Next */}
            <button
              type="button"
              aria-label="Next background image"
              onClick={() => swiper?.slideNext()}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/35 bg-black/20 text-white transition duration-300 hover:border-[#C8FF00] hover:bg-[#C8FF00] hover:text-black"
            >
              <ArrowRight size={20} />
            </button>
          </div>

          {/* Slide Counter */}
          <p className="mt-5 text-sm font-medium text-white/65">
            <span className="text-lg font-bold text-[#C8FF00]">
              {String(activeIndex + 1).padStart(2, "0")}
            </span>

            {" / "}

            {String(backgrounds.length).padStart(2, "0")}
          </p>
        </div>
      </div>
    </section>
  );
}
