"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Circle,
  ArrowUpRight,
  Loader2,
  X,
  BookOpen,
  Book,
  Cross,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type VideoData = {
  isLive: boolean;
  videoId: string;
  title?: string;
  thumbnail?: string;
  publishedAt?: string;
  [key: string]: any;
};

export function Sermons() {
  const [videoData, setVideoData] = useState<VideoData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showPlayer, setShowPlayer] = useState(false);
  const [activeTab, setActiveTab] = useState<"message" | "study">("message");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    async function fetchLatestVideo() {
      try {
        const response = await fetch("/api/youtube/latest");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.error) {
          throw new Error(data.error);
        }

        setVideoData(data);
        setError(null);
      } catch (error) {
        console.error("Error fetching video:", error);
        setError(error instanceof Error ? error.message : String(error));
      } finally {
        setLoading(false);
      }
    }

    fetchLatestVideo();
    // Refetch every 5 minutes to check for new videos/livestreams
    const interval = setInterval(fetchLatestVideo, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const openYouTubeVideo = () => {
    if (videoData?.videoId) {
      window.open(
        `https://www.youtube.com/watch?v=${videoData.videoId}`,
        "_blank"
      );
    }
  };

  const renderContent = () => {
    if (activeTab === "message") {
      return (
        <motion.div
          key="message"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.4 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-20 items-center">
            {/* Content side - only reorder on mobile */}
            <motion.div
              className={`space-y-6 md:space-y-8 ${isMobile ? "order-1" : ""}`}
              initial={{
                opacity: 0,
                x: isMobile ? 0 : 30,
                y: isMobile ? 20 : 0,
              }}
              animate={{ opacity: 1, x: 0, y: 0 }} // Changed from whileInView to animate
              transition={{
                duration: isMobile ? 0.4 : 0.6,
                delay: isMobile ? 0.2 : 0.4,
              }}
            >
              <div>
                <p className="text-white/40 text-xs md:text-sm uppercase tracking-widest mb-3 md:mb-4">
                  Weekly Messages
                </p>

                <h3 className="text-2xl md:text-3xl lg:text-5xl font-light text-white leading-tight">
                  Rooted in Scripture.
                  <span className="block font-normal mt-1 md:mt-0">
                    Empowered by the Spirit.
                  </span>
                </h3>
              </div>

              <p className="text-white/60 text-base md:text-lg font-light leading-relaxed">
                Whether you're new to faith or growing deeper, we believe God's
                Word has something fresh for you today.
              </p>

              <div className="pt-2 md:pt-4">
                <motion.button
                  onClick={openYouTubeVideo}
                  whileHover={!isMobile ? { x: 5 } : {}}
                  whileTap={{ scale: 0.98 }}
                  className="group flex items-center gap-2 md:gap-3 text-white cursor-pointer"
                >
                  <span className="text-base md:text-lg font-light">
                    Watch Message
                  </span>
                  <ArrowUpRight
                    className="w-4 h-4 md:w-5 md:h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                    strokeWidth={1}
                  />
                </motion.button>
              </div>
            </motion.div>

            {/* Video side - only reorder on mobile */}
            <motion.div
              className={isMobile ? "order-2" : ""}
              initial={{
                opacity: 0,
                x: isMobile ? 0 : -30,
                y: isMobile ? 20 : 0,
              }}
              animate={{ opacity: 1, x: 0, y: 0 }} // Changed from whileInView to animate
              transition={{
                duration: isMobile ? 0.4 : 0.6,
                delay: isMobile ? 0.3 : 0.2,
              }}
            >
              <button
                onClick={() => setShowPlayer(true)}
                className="group block relative w-full"
              >
                <div className="relative aspect-[16/9] overflow-hidden bg-zinc-900 rounded-lg md:rounded-none">
                  <Image
                    src={videoData?.thumbnail || "/latest-sermon.jpg"}
                    alt={videoData?.title || "Latest sermon"}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  />

                  <div className="absolute inset-0 bg-black/30 group-hover:bg-transparent transition-all duration-500" />

                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      whileHover={!isMobile ? { scale: 1.1 } : {}}
                      whileTap={{ scale: 0.9 }}
                      className="w-14 h-14 md:w-16 md:h-16 rounded-full border border-white/50 backdrop-blur-sm flex items-center justify-center transition-all duration-300 group-hover:border-white group-hover:bg-white/10"
                    >
                      <Play
                        className="w-5 h-5 md:w-6 md:h-6 text-white ml-1"
                        strokeWidth={1}
                      />
                    </motion.div>
                  </div>

                  {videoData?.isLive && (
                    <div className="absolute top-3 left-3 md:top-4 md:left-4 bg-red-600 text-white px-2 py-1 md:px-3 rounded text-xs md:text-sm font-medium flex items-center gap-1.5 md:gap-2">
                      <Circle className="w-1.5 h-1.5 md:w-2 md:h-2 fill-white" />
                      LIVE
                    </div>
                  )}
                </div>
              </button>
            </motion.div>
          </div>
        </motion.div>
      );
    } else {
      return (
        <motion.div
          key="study"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.4 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-20 items-center">
            {/* Enhanced Bible Study Visual */}
            <motion.div
              className="order-2 lg:order-1"
              initial={{
                opacity: 0,
                x: isMobile ? 0 : -30,
                y: isMobile ? 20 : 0,
              }}
              animate={{ opacity: 1, x: 0, y: 0 }} // Changed from whileInView to animate
              transition={{ duration: isMobile ? 0.4 : 0.6, delay: 0.2 }}
            >
              <div className="relative aspect-[16/9] bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 border border-white/10 overflow-hidden group rounded-lg md:rounded-none">
                {/* Animated background pattern - simplified for mobile */}
                <div className="absolute inset-0">
                  <div className="absolute inset-0 opacity-5">
                    {[...Array(isMobile ? 3 : 6)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute border border-white/20"
                        style={{
                          top: `${i * 20}%`,
                          left: `${i * 15}%`,
                          width: `${100 - i * 10}%`,
                          height: `${100 - i * 10}%`,
                        }}
                        animate={{
                          rotate: isMobile ? [0, 180] : [0, 360],
                          scale: [1, 1.1, 1],
                        }}
                        transition={{
                          duration: isMobile ? 30 + i * 5 : 20 + i * 5,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Main content */}
                <div className="relative z-10 h-full flex items-center justify-center text-center p-4 md:p-6 lg:p-8">
                  <div>
                    {/* Animated icon */}
                    <motion.div
                      className="inline-block mb-2 md:mb-2 mt-4"
                      animate={!isMobile ? { y: [0, -10, 0] } : {}}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full border border-white/20 flex items-center justify-center mx-auto relative">
                        <BookOpen
                          className="w-5 h-5 sm:w-7 sm:h-7 md:w-10 md:h-10 text-white/60"
                          strokeWidth={1}
                        />
                        <motion.div
                          className="absolute inset-0 rounded-full border border-white/20"
                          animate={
                            !isMobile
                              ? { scale: [1, 1.2, 1], opacity: [0.3, 0, 0.3] }
                              : {}
                          }
                          transition={{ duration: 3, repeat: Infinity }}
                        />
                      </div>
                    </motion.div>

                    {/* Title with gradient */}
                    <motion.h4
                      className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-light mb-1 md:mb-2 bg-gradient-to-b from-white to-white/10 bg-clip-text text-transparent"
                      animate={!isMobile ? { opacity: [0.5, 1, 0.5] } : {}}
                      transition={{ duration: 4, repeat: Infinity }}
                    >
                      MARK
                    </motion.h4>
                    <p className="text-white/40 text-[10px] sm:text-xs md:text-sm uppercase tracking-widest">
                      Gospel Study
                    </p>

                    {/* Decorative elements */}
                    <div className="flex items-center justify-center gap-1.5 md:gap-2 mt-2 sm:mt-3 md:mt-4">
                      <div className="h-px w-6 sm:w-8 md:w-12 bg-gradient-to-r from-transparent to-white/20" />
                      <Cross
                        className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 text-white/20"
                        strokeWidth={1}
                      />
                      <div className="h-px w-6 sm:w-8 md:w-12 bg-gradient-to-l from-transparent to-white/20" />
                    </div>
                  </div>
                </div>

                {/* Hover effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </motion.div>

            {/* Content side */}
            <motion.div
              className="space-y-6 md:space-y-8 order-1 lg:order-2"
              initial={{
                opacity: 0,
                x: isMobile ? 0 : 30,
                y: isMobile ? 20 : 0,
              }}
              animate={{ opacity: 1, x: 0, y: 0 }} // Changed from whileInView to animate
              transition={{
                duration: isMobile ? 0.4 : 0.6,
                delay: isMobile ? 0.3 : 0.4,
              }}
            >
              <div>
                <p className="text-white/40 text-xs md:text-sm uppercase tracking-widest mb-3 md:mb-4">
                  Bible Study Series
                </p>

                <h3 className="text-2xl md:text-3xl lg:text-5xl font-light text-white leading-tight">
                  Gospel of Mark
                  <span className="block font-normal text-white/50 text-lg md:text-2xl mt-1 md:mt-2">
                    with Pastor Deepak Mathew
                  </span>
                </h3>
              </div>

              <p className="text-white/60 text-base md:text-lg font-light leading-relaxed">
                Whether you're just beginning your walk with Jesus or looking to
                go deeper in your faith, this Bible study through the Gospel of
                Mark is a great place to start. Each week, Pastor Deepak Mathew
                walks through the text with thoughtful teaching and practical
                insight.
              </p>

              <div className="pt-2 md:pt-4">
                <a
                  href="https://drive.google.com/drive/folders/1TT6jVdm3zilbWiImN5zbv5fC8njF9y5h?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <motion.button
                    whileHover={!isMobile ? { x: 5 } : {}}
                    whileTap={{ scale: 0.98 }}
                    className="group flex items-center gap-2 md:gap-3 text-white"
                  >
                    <span className="text-base md:text-lg font-light">
                      Access Bible Study
                    </span>
                    <ArrowUpRight
                      className="w-4 h-4 md:w-5 md:h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                      strokeWidth={1}
                    />
                  </motion.button>
                </a>
              </div>
            </motion.div>
          </div>
        </motion.div>
      );
    }
  };

  if (loading) {
    return (
      <section
        className="relative py-16 md:py-24 lg:py-40 flex items-center justify-center"
        style={{ backgroundColor: "#0c0c0c" }}
      >
        <Loader2 className="w-6 h-6 md:w-8 md:h-8 text-white/50 animate-spin" />
      </section>
    );
  }

  const isLive = videoData?.isLive || false;

  return (
    <>
      <motion.section
        id="sermons"
        className="relative py-16 md:py-24 lg:py-40"
        style={{ backgroundColor: "#0c0c0c" }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: isMobile ? "-50px" : "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header with tabs */}
          <motion.div
            initial={{ opacity: 0, y: isMobile ? 15 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: isMobile ? "-30px" : "-50px" }}
            transition={{ duration: isMobile ? 0.4 : 0.6 }}
            className="mb-12 md:mb-20"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 md:mb-8">
              <div className="relative w-full sm:w-auto">
                <div className="flex items-center gap-4 md:gap-8">
                  <motion.button
                    onClick={() => setActiveTab("message")}
                    className={`text-xl md:text-2xl lg:text-3xl font-light transition-all duration-300 relative ${
                      activeTab === "message"
                        ? "text-white scale-100"
                        : "text-white/30 hover:text-white/50 scale-95"
                    }`}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isLive ? "Live Now" : "Latest Message"}
                    {activeTab === "message" && (
                      <motion.div
                        layoutId="underline"
                        className="absolute left-0 right-0 h-px bg-white/60 -bottom-1 md:-bottom-2"
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                        }}
                      />
                    )}
                  </motion.button>
                  <motion.button
                    onClick={() => setActiveTab("study")}
                    className={`text-xl md:text-2xl lg:text-3xl font-light transition-all duration-300 relative ${
                      activeTab === "study"
                        ? "text-white scale-100"
                        : "text-white/30 hover:text-white/50 scale-95"
                    }`}
                    whileTap={{ scale: 0.98 }}
                  >
                    Bible Study
                    {activeTab === "study" && (
                      <motion.div
                        layoutId="underline"
                        className="absolute left-0 right-0 h-px bg-white/60 -bottom-1 md:-bottom-2"
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                        }}
                      />
                    )}
                  </motion.button>
                </div>
              </div>

              {isLive && activeTab === "message" && (
                <motion.div
                  className="flex items-center gap-1.5 md:gap-2"
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Circle className="w-1.5 h-1.5 md:w-2 md:h-2 fill-white text-white" />
                  <span className="text-white/60 text-xs md:text-sm">
                    STREAMING
                  </span>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Content */}
          <AnimatePresence mode="wait">{renderContent()}</AnimatePresence>

          {/* Section indicator dots */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: isMobile ? 0.4 : 0.6, duration: 0.4 }}
            className="flex justify-center gap-2 mt-12 md:mt-16"
          >
            <button
              onClick={() => setActiveTab("message")}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                activeTab === "message"
                  ? "bg-white/60 w-6 md:w-8"
                  : "bg-white/20"
              }`}
              aria-label="View latest message"
            />
            <button
              onClick={() => setActiveTab("study")}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                activeTab === "study" ? "bg-white/60 w-6 md:w-8" : "bg-white/20"
              }`}
              aria-label="View bible study"
            />
          </motion.div>
        </div>
      </motion.section>

      {/* Video Modal */}
      <AnimatePresence>
        {showPlayer && videoData?.videoId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 md:p-8"
            onClick={() => setShowPlayer(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="relative w-full max-w-5xl aspect-[16/9]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowPlayer(false)}
                className="absolute -top-10 md:-top-12 right-0 text-white/60 hover:text-white transition-colors"
                aria-label="Close video"
              >
                <X className="w-6 h-6 md:w-8 md:h-8" />
              </button>

              <iframe
                src={`https://www.youtube.com/embed/${videoData.videoId}?autoplay=1`}
                className="w-full h-full rounded-lg"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Sermons;
