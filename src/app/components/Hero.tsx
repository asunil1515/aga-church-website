"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import { ChevronDown, ChevronsDown } from "lucide-react";

export function Hero() {
  const [textIndex, setTextIndex] = useState(0);
  const phrases = ["restoration", "community", "breakthrough", "purpose"];

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % phrases.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="min-h-screen relative flex items-center justify-center overflow-hidden bg-black">
      {/* BG Image */}
      <motion.div
        className="absolute inset-0 overflow-hidden"
        initial={{ opacity: 0, scale: 1.7, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{
          type: "spring",
          stiffness: 25,
          damping: 19,
          duration: 3.2,
          ease: "easeOut",
          delay: 0.1,
        }}
      >
        <Image
          src="/BG1.jpg"
          alt="Church background"
          fill
          className="object-cover contrast-[0.95] brightness-105 blur-[0.3px] scale-[1.01]"
          priority
          quality={100}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />
      </motion.div>

      {/* Animated Grid Overlay */}
      <div className="absolute inset-0 opacity-10 hidden sm:block">
        <motion.div
          className="h-full w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 1 }}
        >
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-px w-full bg-white/20"
              style={{ top: `${i * 5}%` }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 1.5 + i * 0.05 }}
            />
          ))}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={`v-${i}`}
              className="absolute w-px h-full bg-white/20"
              style={{ left: `${i * 5}%` }}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 1, delay: 1.5 + i * 0.05 }}
            />
          ))}
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 md:px-8 max-w-6xl mx-auto">
        {/* Animated Title with Letter Stagger */}
        <div className="mb-6 sm:mb-8 flex flex-col items-center">
          <motion.div className="overflow-hidden">
            <motion.h1
              className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-1 sm:mb-2"
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {"AMAZING".split("").map((letter, i) => (
                <motion.span
                  key={i}
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.5 + i * 0.05,
                    ease: "easeOut",
                  }}
                  className="inline-block"
                >
                  {letter}
                </motion.span>
              ))}
            </motion.h1>
          </motion.div>
          <motion.div className="overflow-hidden">
            <motion.h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60">
              {"GRACE".split("").map((letter, i) => (
                <motion.span
                  key={i}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 1.1,
                    delay: 0.15 + i * 0.065,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="inline-block"
                >
                  {letter}
                </motion.span>
              ))}
            </motion.h1>
          </motion.div>

          <div className="relative">
            <motion.h2
              className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light text-white/80 tracking-[0.2em] sm:tracking-[0.25em] md:tracking-[0.3em]"
              initial={{ opacity: 0, letterSpacing: "0.3em" }}
              animate={{ opacity: 1, letterSpacing: "0.2em" }}
              transition={{ duration: 1, delay: 1.65 }}
            >
              ASSEMBLY
            </motion.h2>
            {/* Animated underline */}
            <motion.div
              className="mt-6 sm:mt-8 h-[2px] bg-white/60 w-[180px] xs:w-[220px] sm:w-[280px] md:w-[380px] lg:w-[470px]"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 1.8, ease: "easeOut" }}
            />
          </div>
        </div>

        {/* Animated Tagline */}
        <motion.div
          className="mb-6 sm:mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.0, duration: 1.25 }}
        >
          <p className="text-base xs:text-lg sm:text-xl md:text-2xl text-white/70 mb-1 flex items-center justify-center gap-2">
            <span>Discover</span>
            <span className="relative inline-block w-20 xs:w-24 sm:w-28 md:w-32 h-6 sm:h-8">
              {phrases.map((phrase, index) => (
                <motion.span
                  key={phrase}
                  className="absolute left-0 top-0 font-semibold text-white text-base xs:text-lg sm:text-xl md:text-2xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: textIndex === index ? 1 : 0,
                    y: textIndex === index ? 0 : -20,
                  }}
                  transition={{ duration: 0.5 }}
                >
                  {phrase}
                </motion.span>
              ))}
            </span>
          </p>
          <p className="text-sm xs:text-base sm:text-lg text-white/60">
            Join us every Sunday
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.8 }}
        >
          <a href="/#visit" className="w-28 xs:w-32 sm:w-36 md:w-40">
            <Button
              size="lg"
              className="group relative overflow-hidden bg-white text-black w-full py-2.5 xs:py-3 sm:py-4 px-3 xs:px-4 sm:px-6 text-xs xs:text-sm sm:text-base border border-black/10 transition-all duration-300 h-9 xs:h-10 sm:h-11 md:h-12"
            >
              <span className="relative z-10 transition-colors duration-500 group-hover:text-white">
                Join Us
              </span>
              <span className="absolute inset-0 z-0 -translate-x-full bg-gradient-to-r from-black to-neutral-600 transition-transform duration-300 group-hover:translate-x-0"></span>
            </Button>
          </a>

          <Link
            href="/#sermons"
            className="inline-block w-28 xs:w-32 sm:w-36 md:w-40"
          >
            <Button
              size="lg"
              variant="outline"
              className="group relative overflow-hidden border border-white/30 bg-transparent text-white
       w-full h-9 xs:h-10 sm:h-11 md:h-12 py-2.5 xs:py-3 sm:py-4 px-3 xs:px-4 sm:px-6 text-xs xs:text-sm sm:text-base transition-all duration-300 
       hover:border-white/40 hover:bg-white/10
       hover:text-white"
            >
              <span className="relative z-10 font-medium">Watch Online</span>

              {/* Base metallic layer */}
              <span
                className="absolute inset-0 -translate-x-full bg-gradient-to-r from-neutral-700/40 via-neutral-500/30 to-transparent
         transition-transform duration-500 ease-out group-hover:translate-x-0"
              ></span>

              {/* Highlight layer for shine */}
              <span
                className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent
         transition-transform duration-500 ease-out group-hover:translate-x-0 blur-sm"
              ></span>
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* Animated Corner Accents */}
      <motion.div
        className="absolute top-6 left-6 sm:top-8 sm:left-8 md:top-10 md:left-10 hidden sm:block"
        initial={{ scale: 0, rotate: -45 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 1, delay: 2.5 }}
      >
        <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 border-t-2 border-l-2 border-white/20" />
      </motion.div>

      <motion.div
        className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 md:bottom-10 md:right-10 hidden sm:block"
        initial={{ scale: 0, rotate: 45 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 1, delay: 2.5 }}
      >
        <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 border-b-2 border-r-2 border-white/20" />
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-4 sm:bottom-16 left-1/2 -translate-x-1/2 cursor-pointer group"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3 }}
        onClick={() => {
          document
            .getElementById("sermons")
            ?.scrollIntoView({ behavior: "smooth" });
        }}
      >
        {/* Mobile */}
        <div
          className="hidden [@media(max-width:639px)_and_(min-height:520px)]:block"
          style={{ transform: "translateY(-40%)" }}
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            whileTap={{ scale: 0.9 }}
          >
            <div className="w-9 h-9 rounded-full border border-white/25 bg-white/5 backdrop-blur-sm flex items-center justify-center">
              <ChevronsDown className="w-4 h-4 text-white/70" strokeWidth={2} />
            </div>
          </motion.div>
        </div>

        {/* Desktop */}
        <motion.div
          className="hidden sm:block relative group -translate-y-14"
          animate={{ y: [0, 5, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          whileTap={{ scale: 0.9 }}
        >
          <div className="relative w-10 h-10 md:w-14 md:h-14 rounded-full border border-white/25 bg-white/5 backdrop-blur-sm flex items-center justify-center transition-all duration-300 group-hover:border-white group-hover:bg-white/20 group-hover:scale-110">
            <ChevronsDown
              className="w-4 h-4 md:w-5 md:h-5 text-white/70 group-hover:text-white transition-colors duration-300"
              strokeWidth={2}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
