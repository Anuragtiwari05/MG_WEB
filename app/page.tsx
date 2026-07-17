import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustStrip from "@/components/TrustStrip";
import FeaturedVehicles from "@/components/FeaturedVehicles";
import LineupCategories from "@/components/LineupCategories";
import Offers from "@/components/Offers";
import WhyMG from "@/components/WhyMG";
import TestDrive from "@/components/TestDrive";
import BuyingSteps from "@/components/BuyingSteps";
import ServicePromo from "@/components/ServicePromo";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import Blogs from "@/components/Blogs";
import FAQ from "@/components/FAQ";
import Locations from "@/components/Locations";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TrustStrip />
        <FeaturedVehicles />
        <LineupCategories />
        <Offers />
        <WhyMG />
        <TestDrive />
        <BuyingSteps />
        <ServicePromo />
        <Services />
        <Testimonials />
        <Blogs />
        <FAQ />
        <Locations />
      </main>
      <Footer />
    </>
  );
}
