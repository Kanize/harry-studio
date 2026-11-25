"use client";
import dynamic from "next/dynamic";

const HeroSliderContent = dynamic(
  () => import("./hero-SliderContent"),
  {
    ssr: false,
    loading: () => (
      <section className="min-h-180 bg-[#080908] sm:min-h-190 lg:min-h-200" />
    ),
  }
);

export default function HeroSlider() {
  return <HeroSliderContent />;
}

