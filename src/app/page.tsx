import AboutCompany from "@/components/AboutCompany";
import HeroBanner from "@/components/HeroBanner";
import Portfolio from "@/components/Portfolio";
import Service from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import WhyChooseUs from "@/components/WhyChooseUs";
import Cta from "@/components/Cta";


export default function Home() {
  return (
    <main>
   
    <HeroBanner/>
    <Service/>
    <Portfolio/>
    <AboutCompany/>
    <Testimonials/>
    <WhyChooseUs/>
    <Cta/>
   </main>
  );
}
