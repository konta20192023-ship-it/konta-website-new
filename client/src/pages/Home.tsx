// Design: Editorial Minimalism (3bl.jp style)
// All sections assembled in order

import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import BusinessSection from "@/components/BusinessSection";
import MessageSection from "@/components/MessageSection";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f5f5f3]">
      <div className="site-wrapper">
        <Navigation />
        <HeroSection />
        <AboutSection />
        <BusinessSection />
        <MessageSection />
        <ContactSection />
      </div>
    </div>
  );
}
