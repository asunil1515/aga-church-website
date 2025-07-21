"use client";
import React, { useState, useEffect } from "react";
import Head from "next/head";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Droplet, Flame, Heart, Crown } from "lucide-react";
import { TbCross } from "react-icons/tb";

// Beliefs data array
const beliefs = [
  {
    id: "salvation",
    icon: TbCross,
    title: "God and Salvation",
    preview: "The foundation of our faith in the triune God",
    text: "We believe the Scriptures are divinely inspired, revealing God's plan for mankind. We affirm the existence of one true God in three persons—the Father, Son, and Holy Spirit—and the deity of Jesus Christ. We believe that through faith in Christ, salvation is available, restoring fellowship with God.",
  },
  {
    id: "ordinances",
    icon: Droplet,
    title: "Ordinances and the Holy Spirit",
    preview: "Sacred practices and spiritual empowerment",
    text: "We practice two ordinances: Water Baptism by Immersion and Holy Communion. We also believe in the baptism of the Holy Spirit, which empowers believers for service and witness, evidenced by speaking in tongues as in the New Testament.",
  },
  {
    id: "sanctification",
    icon: Flame,
    title: "Sanctification and Church Mission",
    preview: "Growing in holiness and serving the lost",
    text: "Sanctification is both an initial and ongoing process, where believers grow in holiness and Christ-likeness. The Church's mission is to seek and save the lost, with leadership committed to worship, service, and meeting human needs.",
  },
  {
    id: "healing",
    icon: Heart,
    title: "Healing and the Blessed Hope",
    preview: "Divine healing and Christ's promised return",
    text: "Divine healing is a privilege for Christians today, provided through Christ's atonement. We eagerly await the return of Jesus, when He will rapture His church, and believers will be with Him forever in glory.",
  },
  {
    id: "eternity",
    icon: Crown,
    title: "Eternal Destiny and Christ's Reign",
    preview: "The millennial kingdom and eternal life",
    text: "We believe in the Millennial Reign of Christ, His rule over earth for 1,000 years. Ultimately, those who reject Christ will face judgment, while believers will dwell forever with Him in the new heavens and earth.",
  },
];

const OurBeliefs = () => {
  const [isClient, setIsClient] = useState(false);
  const [showBeliefs, setShowBeliefs] = useState(false);
  const [expandedBelief, setExpandedBelief] = useState<string | null>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleLearnMore = () => {
    // slight delay before showing beliefs
    setTimeout(() => {
      setShowBeliefs(true);
    }, 200);
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
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Cfilter id='noise'%3E%3CfeTurbulence baseFrequency='0.9' /%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
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
                    Explore the heart of our faith, shaped by God's Word.
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
                      →
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
                          "All Scripture is God-breathed"
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
                <motion.div
                  key="beliefs"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="w-full"
                  layout
                >
                  {/* Header when beliefs are shown */}
                  <motion.div
                    className="text-center mt-12 mb-10 md:mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    layout
                  >
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4">
                      <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500">
                        OUR BELIEFS.
                      </span>
                    </h1>
                    <p className="text-sm md:text-base text-gray-400">
                      Explore the heart of our faith, shaped by God's Word.
                    </p>
                  </motion.div>

                  {/* Beliefs Cards */}
                  <motion.div
                    className="max-w-3xl space-y-4 md:space-y-6 mx-auto"
                    layout
                  >
                    {beliefs.map((belief, index) => (
                      <motion.div
                        key={belief.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.5,
                          delay: index * 0.1,
                          ease: "easeOut",
                        }}
                        layout
                      >
                        <div
                          className={`relative overflow-hidden rounded-2xl border backdrop-blur-xl transition-all duration-500 ${
                            expandedBelief === belief.id
                              ? "bg-white/[0.08] border-white/30"
                              : "bg-white/[0.03] border-white/10 hover:border-white/20"
                          }`}
                        >
                          <button
                            onClick={() =>
                              setExpandedBelief(
                                expandedBelief === belief.id ? null : belief.id
                              )
                            }
                            className="w-full p-6 md:p-10 text-left"
                          >
                            <div className="flex items-center gap-4 h-full">
                              <span className="text-white/30 flex items-center justify-center h-full w-12">
                                <belief.icon
                                  size={36}
                                  strokeWidth={1.5}
                                  className="mr-1 md:mr-3"
                                />
                              </span>

                              <div className="flex-1">
                                <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                                  {belief.title}
                                </h3>
                                <p className="text-sm md:text-base text-gray-400">
                                  {belief.preview}
                                </p>
                              </div>
                              <motion.div
                                className="text-white/40 text-2xl flex items-center"
                                animate={{
                                  rotate: expandedBelief === belief.id ? 45 : 0,
                                }}
                                transition={{ duration: 0.2 }}
                              >
                                +
                              </motion.div>
                            </div>
                          </button>

                          <AnimatePresence>
                            {expandedBelief === belief.id && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                              >
                                <div className="px-6 md:px-8 pb-6 md:pb-8">
                                  <div className="pl-16 md:ml-2 pt-2 border-t border-white/10">
                                    <p className=" leading-normal md:text-base md:leading-relaxed text-gray-300 pt-6">
                                      {belief.text}
                                    </p>
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>

                          {/* Animated Line at Bottom */}
                          <motion.div
                            className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-white/50 to-white/20"
                            initial={{ width: "0%" }}
                            animate={{
                              width:
                                expandedBelief === belief.id ? "100%" : "0%",
                            }}
                            transition={{ duration: 0.5 }}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>

                  {/* Back to top */}
                  <motion.div
                    className="text-center mt-10 md:mt-16"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    layout
                  >
                    <button
                      onClick={() => {
                        setShowBeliefs(false);
                        setExpandedBelief(null);
                      }}
                      className="text-gray-500 hover:text-gray-400 text-sm transition-colors duration-300"
                    >
                      ← Back to overview
                    </button>
                  </motion.div>

                  {/* Bottom quote for beliefs view */}
                  <motion.div
                    className="text-center mt-8 md:mt-10 md:mb-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.8 }}
                    layout
                  >
                    <div className="flex items-center justify-center gap-3 max-w-xs mx-auto">
                      <div className="w-12 h-px bg-gradient-to-r from-transparent to-gray-700/50" />
                      <div className="flex-shrink-0">
                        <p className="text-xs md:text-sm text-gray-400/70 italic">
                          "All Scripture is God-breathed"
                        </p>
                        <p className="text-[10px] md:text-xs text-gray-500/70 mt-1">
                          2 Timothy 3:16
                        </p>
                      </div>
                      <div className="w-12 h-px bg-gradient-to-l from-transparent to-gray-700/50" />
                    </div>
                  </motion.div>
                </motion.div>
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
