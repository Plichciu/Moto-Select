import React from "react";
import { Button } from "./components/ui/button";
import { SignInButton } from "@clerk/clerk-react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Category from "./components/Category";
import MostSearchedCar from "./components/MostSearchedCar";
import InfoSection from "./components/InfoSection";
import Footer from "./components/Footer";
import SearchBar from "./components/SearchBar";
import AdvancedSearch from "./search/[advanced]/AdvancedSearch";
import AdBanner from "./components/AdBanner";
import Faq from "./components/Faq";

function Home() {
  return (
    <div className="overflow-x-hidden">
      {/* Header  */}
      <Header />
      {/* Hero  */}
      <Hero />
      {/* Category  */}
      <Category />
      {/* Ad baner */}
      <AdBanner />
      {/* Most Searched Car  */}
      <MostSearchedCar />
      {/* InfoSection  */}
      <InfoSection />
      {/* Faq */}
      <Faq />
      {/* Footer  */}
      <Footer />
    </div>
  );
}

export default Home;
