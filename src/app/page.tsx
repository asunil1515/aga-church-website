"use client";

import { Navbar } from "./components/Navbar/Navbar";
import { Hero } from "./components/Hero/Hero";
import Sermons from "./components/Sermons/Sermons";
import About from "./components/About/About";
import Pastor from "./components/Pastor/Pastor";
import Community from "./components/Community/Community";
import Visit from "./components/Visit/Visit";
import { Footer } from "./components/Footer/Footer";
import CornerAlert from "./components/CornerAlert/CornerAlert"; 

export default function Home() {
  const handleAlertClose = () => {
    console.log("Alert was closed");
    // Any additional logic you want when alert is closed
  };

  return (
    <div>
      <CornerAlert onClose={handleAlertClose} />
      <Navbar />
      <Hero />
      <Sermons />
      <About />
      <Pastor />
      <Community />
      <Visit />
      <Footer />
    </div>
  );
}