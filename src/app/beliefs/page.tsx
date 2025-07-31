"use client";
import React, { useState, useEffect } from "react";
import Head from "next/head";
import { Navbar } from "../components/Navbar/Navbar";
import { Footer } from "../components/Footer/Footer";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { BeliefsList } from "../beliefs/BeliefsList";

const OurBeliefs = () => {
  const [isClient, setIsClient] = useState(false);
  const [showBeliefs, setShowBeliefs] = useState(false);
  const [expandedBelief, setExpandedBelief] = useState<string | null>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleLearnMore = () => {
    setTimeout(() => {
      setShowBeliefs(true);
    }, 200);
  };

  const handleBackToOverview = () => {
    setShowBeliefs(false);
    setExpandedBelief(null);
  };

  if (!isClient) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Our Beliefs - Amazing Grace Assembly</title>
        <meta
          name="description"
          content="Explore the core beliefs and biblical foundations of Amazing Grace Assembly."
        />
        <link rel="preload" href="/BG1.jpg" as="image" />
      </Head>

      <style jsx global>{`
        @keyframes slowZoom {
          0% {
            transform: scale(1.1);
          }
          50% {
            transform: scale(1.15);
          }
          100% {
            transform: scale(1.1);
          }
        }

        .animate-bg-zoom {
          animation: slowZoom 20s ease-in-out infinite;
          will-change: transform;
          transform-origin: center center;
        }
      `}</style>

      <Navbar disableFloating={true} />

      <section className="relative min-h-screen overflow-hidden">
        {/* Background Section */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 animate-bg-zoom">
            <Image
              alt="Beliefs Background"
              src="/BG1.jpg"
              layout="fill"
              quality={100}
              objectFit="cover"
              className="opacity-60 saturate-50"
              priority
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#0c0c0c]/60 via-[#0c0c0c]/80 to-[#141414]" />
          <div
            className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns=&apos;http://www.w3.org/2000/svg&apos; width=&apos;100&apos; height=&apos;100&apos;%3E%3Cfilter id=&apos;noise&apos;%3E%3CfeTurbulence baseFrequency=&apos;0.9&apos; /%3E%3C/filter%3E%3Crect width=&apos;100&apos; height=&apos;100&apos; filter=&apos;url(%23noise)&apos; opacity=&apos;1&apos;/%3E%3C/svg%3E")`,
            }}
          />
        </div>

        {/* Main Content */}
        <div className="relative z-10 min-h-screen flex flex-col justify-center py-16 md:py-24 px-4">
          <div className="max-w-5xl mx-auto w-full">
            <AnimatePresence mode="wait">
              {!showBeliefs ? (
                <motion.div
                  key="hero"
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <motion.h1
                    className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                  >
                    <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500">
                      OUR BELIEFS.
                    </span>
                  </motion.h1>
                  <motion.p
                    className="text-sm md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 md:mb-12"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    Explore the heart of our faith, shaped by God&apos;s Word.
                  </motion.p>
                  <motion.button
                    onClick={handleLearnMore}
                    className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/20 text-white text-sm md:text-base px-8 py-3 md:py-4 rounded-full font-medium transition-all duration-300"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                  >
                    <span>Learn More</span>
                    <motion.span
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      &rarr;
                    </motion.span>
                  </motion.button>

                  {/* Bottom quote for hero */}
                  <motion.div
                    className="mt-20"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.8 }}
                  >
                    <div className="flex items-center justify-center gap-3 max-w-xs mx-auto">
                      <div className="w-12 h-px bg-gradient-to-r from-transparent to-gray-700/50" />
                      <div className="flex-shrink-0">
                        <p className="text-xs md:text-sm text-gray-400/70 italic">
                          &quot;All Scripture is God-breathed&quot;
                        </p>
                        <p className="text-[10px] md:text-xs text-gray-500/70 mt-1">
                          2 Timothy 3:16
                        </p>
                      </div>
                      <div className="w-12 h-px bg-gradient-to-l from-transparent to-gray-700/50" />
                    </div>
                  </motion.div>
                </motion.div>
              ) : (
                <BeliefsList
                  expandedBelief={expandedBelief}
                  onExpandBelief={setExpandedBelief}
                  onBackToOverview={handleBackToOverview}
                />
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default OurBeliefs;
