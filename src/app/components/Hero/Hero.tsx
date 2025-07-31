"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../../ui/button";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ChevronsDown } from "lucide-react";

export function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const [textIndex, setTextIndex] = useState(0);
  const phrases = ["restoration", "community", "breakthrough", "purpose"];

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % phrases.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [phrases.length]);

  return (
    <header
      className="min-h-screen relative flex items-center justify-center overflow-hidden bg-black"
      aria-label="Amazing Grace Assembly hero section"
    >
      {/* BG Image */}
      <motion.div
        className="absolute inset-0 overflow-hidden"
        initial={
          !shouldReduceMotion ? { opacity: 0, scale: 2.75, y: 10 } : false
        }
        animate={!shouldReduceMotion ? { opacity: 1, scale: 1, y: 0 } : false}
        transition={
          !shouldReduceMotion
            ? {
                type: "spring",
                stiffness: 25,
                damping: 19,
                duration: 2.2,
                ease: "easeOut",
                delay: 0.1,
              }
            : undefined
        }
      >
        <Image
          src="/BG1.jpg"
          alt=""
          fill
          className="object-cover contrast-[0.35] brightness-95 blur-[0.3px] scale-[1.01]"
          priority
          quality={100}
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c0c0c]/30 via-[#0c0c0c]/50 to-[#0c0c0c]" />
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 md:px-8 max-w-6xl mx-auto">
        <div className="mb-6 sm:mb-8 flex flex-col items-center ">
          {/* focus-in animation */}
          <motion.div
            className="overflow-hidden"
            initial={
              !shouldReduceMotion
                ? {
                    scale: 0.5,
                    filter: "blur(25px)",
                    opacity: 0,
                  }
                : false
            }
            animate={
              !shouldReduceMotion
                ? {
                    scale: 1,
                    filter: "blur(0px)",
                    opacity: 1,
                  }
                : false
            }
            transition={
              !shouldReduceMotion
                ? {
                    scale: { duration: 0.9, delay: 0 },
                    opacity: { duration: 1.1, delay: 0.5 },
                    filter: { duration: 1.25, delay: 0.75 },
                    ease: "easeOut",
                  }
                : undefined
            }
            style={{
              display: "inline-block",
              willChange: "transform, filter, opacity",
            }}
          >
            <motion.h1
              className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl
             lg:text-8xl font-bold mb-1 sm:mb-2 text-transparent
             bg-clip-text bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300"
            >
              <span className="block">
                {"AMAZING".split("").map((letter, i) => (
                  <span key={"amazing-" + i} className="inline-block">
                    {letter}
                  </span>
                ))}
              </span>
              <span className="block">
                {"GRACE".split("").map((letter, i) => (
                  <span key={"grace-" + i} className="inline-block">
                    {letter}
                  </span>
                ))}
              </span>
            </motion.h1>
          </motion.div>

          {/* Subtitle + underline */}
          <div className="relative">
            <motion.h2
              className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light text-white/80 tracking-[0.2em] sm:tracking-[0.25em] md:tracking-[0.3em]"
              initial={
                !shouldReduceMotion
                  ? { opacity: 0, letterSpacing: "0.3em" }
                  : false
              }
              animate={
                !shouldReduceMotion
                  ? { opacity: 1, letterSpacing: "0.2em" }
                  : false
              }
              transition={
                !shouldReduceMotion ? { duration: 1, delay: 1.65 } : undefined
              }
            >
              ASSEMBLY
            </motion.h2>
            <motion.div
              className="mt-6 sm:mt-8 h-[2px] bg-white/60 w-[180px] xs:w-[220px] sm:w-[280px] md:w-[380px] lg:w-[470px]"
              initial={!shouldReduceMotion ? { scaleX: 0 } : false}
              animate={!shouldReduceMotion ? { scaleX: 1 } : false}
              transition={
                !shouldReduceMotion
                  ? { duration: 0.8, delay: 1.8, ease: "easeOut" }
                  : undefined
              }
            />
          </div>
        </div>

        {/* Animated Tagline */}
        <motion.div
          className="mb-6 sm:mb-8"
          initial={!shouldReduceMotion ? { opacity: 0 } : false}
          animate={!shouldReduceMotion ? { opacity: 1 } : false}
          transition={
            !shouldReduceMotion ? { delay: 2.0, duration: 1.25 } : undefined
          }
        >
          <p
            className="text-base xs:text-lg sm:text-xl md:text-2xl text-white/70 mb-1 flex items-center justify-center gap-2"
            aria-live="polite"
          >
            <span>Discover</span>
            <span className="relative inline-block w-20 xs:w-24 sm:w-28 md:w-32 h-6 sm:h-8">
              <AnimatePresence mode="wait">
                <motion.span
                  key={phrases[textIndex]}
                  className="absolute left-0 top-0 font-semibold text-white text-base xs:text-lg sm:text-xl md:text-2xl"
                  initial={!shouldReduceMotion ? { opacity: 0, y: 20 } : false}
                  animate={!shouldReduceMotion ? { opacity: 1, y: 0 } : false}
                  exit={
                    !shouldReduceMotion ? { opacity: 0, y: -20 } : undefined
                  }
                  transition={
                    !shouldReduceMotion ? { duration: 0.5 } : undefined
                  }
                >
                  {phrases[textIndex]}
                </motion.span>
              </AnimatePresence>
            </span>
          </p>
          <p className="text-sm xs:text-base sm:text-lg text-white/60">
            Join us every Sunday
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center"
          initial={!shouldReduceMotion ? { opacity: 0, y: 30 } : false}
          animate={!shouldReduceMotion ? { opacity: 1, y: 0 } : false}
          transition={
            !shouldReduceMotion ? { delay: 2, duration: 0.8 } : undefined
          }
        >
          <Link
            href="/#visit"
            aria-label="Join us at Amazing Grace Assembly"
            className="w-28 xs:w-32 sm:w-36 md:w-40"
          >
            <Button
              size="lg"
              className="group relative overflow-hidden bg-white text-black w-full py-2.5 xs:py-3 sm:py-4 px-3 xs:px-4 sm:px-6 text-xs xs:text-sm sm:text-base border border-black/10 transition-all duration-300 h-9 xs:h-10 sm:h-11 md:h-12"
            >
              <span className="relative z-10 transition-colors duration-500 group-hover:text-white">
                Join Us
              </span>
              <span className="absolute inset-0 z-0 -translate-x-full bg-gradient-to-r from-black to-neutral-600 transition-transform duration-300 group-hover:translate-x-0"></span>
            </Button>
          </Link>

          <Link
            href="/#sermons"
            aria-label="Watch Amazing Grace Assembly sermons online"
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
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-neutral-700/40 via-neutral-500/30 to-transparent transition-transform duration-500 ease-out group-hover:translate-x-0"></span>
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-500 ease-out group-hover:translate-x-0 blur-sm"></span>
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* Animated Corner Accents */}
      <motion.div
        className="absolute top-6 left-6 sm:top-8 sm:left-8 md:top-10 md:left-10 hidden sm:block"
        initial={!shouldReduceMotion ? { scale: 0, rotate: -45 } : false}
        animate={!shouldReduceMotion ? { scale: 1, rotate: 0 } : false}
        transition={
          !shouldReduceMotion ? { duration: 1, delay: 2.5 } : undefined
        }
      >
        <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 border-t-2 border-l-2 border-white/20" />
      </motion.div>
      <motion.div
        className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 md:bottom-10 md:right-10 hidden sm:block"
        initial={!shouldReduceMotion ? { scale: 0, rotate: 45 } : false}
        animate={!shouldReduceMotion ? { scale: 1, rotate: 0 } : false}
        transition={
          !shouldReduceMotion ? { duration: 1, delay: 2.5 } : undefined
        }
      >
        <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 border-b-2 border-r-2 border-white/20" />
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-4 sm:bottom-16 left-1/2 -translate-x-1/2"
        initial={!shouldReduceMotion ? { opacity: 0 } : false}
        animate={!shouldReduceMotion ? { opacity: 1 } : false}
        transition={!shouldReduceMotion ? { delay: 3 } : undefined}
      >
        {/* Mobile */}
        <div
          className="hidden [@media(max-width:639px)_and_(min-height:520px)]:block"
          style={{ transform: "translateY(-40%)" }}
        >
          <motion.button
            type="button"
            aria-label="Scroll to sermons"
            animate={!shouldReduceMotion ? { y: [0, 12, 0] } : false}
            transition={
              !shouldReduceMotion
                ? {
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }
                : undefined
            }
            whileTap={!shouldReduceMotion ? { scale: 0.9 } : undefined}
            onClick={() => {
              document
                .getElementById("sermons")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="w-9 h-9 rounded-full border border-white/25 bg-white/5 backdrop-blur-sm flex items-center justify-center"
          >
            <ChevronsDown className="w-4 h-4 text-white/70" strokeWidth={2} />
          </motion.button>
        </div>

        {/* Desktop */}
        <motion.button
          type="button"
          aria-label="Scroll to sermons"
          className="hidden sm:block relative group -translate-y-14"
          animate={!shouldReduceMotion ? { y: [0, 5, 0] } : false}
          transition={
            !shouldReduceMotion
              ? {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }
              : undefined
          }
          whileTap={!shouldReduceMotion ? { scale: 0.9 } : undefined}
          onClick={() => {
            document
              .getElementById("sermons")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <div className="relative w-10 h-10 md:w-14 md:h-14 rounded-full border border-white/25 bg-white/5 backdrop-blur-sm flex items-center justify-center transition-all duration-300 group-hover:border-white group-hover:bg-white/20 group-hover:scale-110">
            <ChevronsDown
              className="w-4 h-4 md:w-5 md:h-5 text-white/70 group-hover:text-white transition-colors duration-300"
              strokeWidth={2}
            />
          </div>
        </motion.button>
      </motion.div>
    </header>
  );
}
