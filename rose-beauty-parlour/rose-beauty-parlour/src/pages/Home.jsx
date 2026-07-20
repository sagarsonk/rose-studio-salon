import AboutSection from "../components/AboutSection/AboutSection";
import BridalShowcase from "../components/BridalShowcase/BridalShowcase";
import CardSlider from "../components/CardSlider/CardSlider";
// import Footer from "../components/Footer/Footer";
import Gallery from "../components/Gallery/Gallery";
import Hero from "../components/Hero/Hero";
// import Navbar from "../components/Navbar/Navbar";
import WhyChooseUs from "../components/WhyChooseUs/WhyChooseUs";
import CTA from "./CTA/CTA";
import Services from "./Services/Services";
import Testimonials from "./Testimonials/Testimonials";

function Home() {
  return (
    <>
      <CardSlider/>
      <Hero />  
      {/* <Services /> */}
      <BridalShowcase/>
      <AboutSection />
      <WhyChooseUs />
      {/* <Gallery /> */}
      <Testimonials />
      <CTA />
      
    </>
  );
}

export default Home;