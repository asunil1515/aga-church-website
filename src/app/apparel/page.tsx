"use client";
import React, { useEffect, useState, useCallback } from "react";
import { BlackNavbar } from "../components/Navbar/Navbar";
import { Footer } from "../components/Footer/Footer";
import MainContent from "./MainContent";
import IntroScreen from "./Intropg";

const SCROLL_THRESHOLD = 80;

export default function ApparelPage() {
  const [revealed, setRevealed] = useState(false);
  const [firstLoad, setFirstLoad] = useState(true);

  const handleScroll = useCallback(() => {
    setRevealed(window.scrollY > SCROLL_THRESHOLD);
  }, []);

  useEffect(() => {
    if (firstLoad) {
      setRevealed(false);
      const timer = setTimeout(() => {
        setRevealed(true);
        window.scrollTo({
          top: SCROLL_THRESHOLD + 1,
          behavior: "smooth",
        });
        setFirstLoad(false);
      }, 1500);
      return () => clearTimeout(timer);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [firstLoad, handleScroll]);

  return (
    <div className="apparel-page">
      <BlackNavbar variant="default" />
      <IntroScreen shrink={revealed} />
      <MainContent revealed={revealed} />
      <Footer />
    </div>
  );
}