import Navbar from "@/components/layout/navbar";
import Hero from "@/components/sections/hero";
import About from "@/components/sections/about";
import Genres from "@/components/sections/genres";
import Releases from "@/components/sections/releases";
import TourMap from "@/components/sections/tour-map";
import TourDates from "@/components/sections/tour-dates";
import Rider from "@/components/sections/rider";
import Contact from "@/components/sections/contact";

export default function Home() {
  return (
    <main className="relative min-h-screen w-full bg-background text-foreground selection:bg-primary selection:text-white">
      <Navbar />
      <Hero />
      <About />
      <Genres />
      <Releases />
      <TourMap />
      <TourDates />
      <Rider />
      <Contact />
    </main>
  );
}
