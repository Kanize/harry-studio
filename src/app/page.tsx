import FeaturedStudios from "@/components/ui/Home/FeaturedStudios";
import HeroSlider from "@/components/ui/Home/hero-Slider";
import HostGuarantee from "@/components/ui/Home/HostGuarantee";
import HowBookingWorks from "@/components/ui/Home/HowBookingWorks";
import StudioCategories from "@/components/ui/Home/StudioCategories";

export default function Home() {
  return (
    <div>
      <HeroSlider/>
      <FeaturedStudios/>
      <StudioCategories/>
      <HowBookingWorks/>
      <HostGuarantee/>
      
    </div>
  );
}
