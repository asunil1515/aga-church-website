"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Loader2, X, Circle } from "lucide-react";
import MessageTab from "./MessageTab";
import BibleStudyTab from "./BibleStudyTab";

export type VideoData = {
  isLive: boolean;
  videoId: string;
  title?: string;
  thumbnail?: string;
  publishedAt?: string;
};

const tabOrder = ["message", "study"] as const;

const contentAnimation = {
  initial: { opacity: 0, scale: 0.98 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.98 },
  transition: { duration: 0.4 },
};

export default function Sermons() {
  const shouldReduceMotion = useReducedMotion();

  const [videoData, setVideoData] = useState<VideoData | null>(null);
  const [loading, setLoading] = useState(true);
  const [showPlayer, setShowPlayer] = useState(false);
  const [activeTab, setActiveTab] = useState<"message" | "study">("message");
  const [isMobile, setIsMobile] = useState(false);

  // const [prevTabIndex, setPrevTabIndex] = useState(tabOrder.indexOf("message")); // REMOVE

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    async function fetchLatestVideo() {
      try {
        const response = await fetch("/api/youtube/latest");
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json();
        if (data.error) throw new Error(data.error);

        setVideoData(data);
      } catch {
        // No error var needed, as we do not use it
      } finally {
        setLoading(false);
      }
    }

    fetchLatestVideo();
    const interval = setInterval(fetchLatestVideo, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const handleTabClick = (tab: "message" | "study") => {
    // No longer need prevTabIndex, just setActiveTab
    setActiveTab(tab);
  };

  const openYouTubeVideo = () => {
    if (videoData?.videoId) {
      window.open(
        `https://www.youtube.com/watch?v=${videoData.videoId}`,
        "_blank"
      );
    }
  };

  if (loading) {
    return (
      <section
        className="relative py-16 md:py-24 lg:py-40 flex items-center justify-center"
        style={{ backgroundColor: "var(--clr-off-black)" }}
        aria-busy="true"
        aria-live="polite"
      >
        <Loader2 className="w-6 h-6 md:w-8 md:h-8 text-white/50 animate-spin" />
        <span className="sr-only">Loading sermons…</span>
      </section>
    );
  }

  const isLive = videoData?.isLive || false;

  return (
    <>
      <motion.section
        id="sermons"
        className="relative py-16 md:py-24 lg:py-40"
        style={{ backgroundColor: "var(--clr-off-black)" }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: isMobile ? "-50px" : "-100px" }}
        transition={{ duration: 0.6 }}
        aria-label="Sermons and Bible Study"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header with tabs */}
          <motion.div
            initial={{ opacity: 0, y: isMobile ? 15 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: isMobile ? 0.4 : 0.6 }}
            className="mb-12 md:mb-20"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 md:mb-8">
              <nav
                className="relative w-full sm:w-auto"
                aria-label="Sermons navigation"
                role="tablist"
              >
                <div className="flex items-center gap-4 md:gap-8">
                  <button
                    type="button"
                    role="tab"
                    id="sermon-tab-message"
                    aria-controls="sermon-tabpanel-message"
                    aria-selected={activeTab === "message"}
                    tabIndex={activeTab === "message" ? 0 : -1}
                    onClick={() => handleTabClick("message")}
                    className={`text-xl md:text-2xl lg:text-3xl font-light transition-all duration-300 relative ${
                      activeTab === "message"
                        ? "text-white scale-100"
                        : "text-white/30 hover:text-white/50 scale-95"
                    }`}
                  >
                    {isLive ? "Live Now" : "Latest Message"}
                    {activeTab === "message" && (
                      <motion.div
                        layoutId="tab-underline"
                        className="absolute left-0 right-0 h-px bg-white/60 -bottom-1 md:-bottom-2"
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                        }}
                        aria-hidden="true"
                      />
                    )}
                  </button>
                  <button
                    type="button"
                    role="tab"
                    id="sermon-tab-study"
                    aria-controls="sermon-tabpanel-study"
                    aria-selected={activeTab === "study"}
                    tabIndex={activeTab === "study" ? 0 : -1}
                    onClick={() => handleTabClick("study")}
                    className={`text-xl md:text-2xl lg:text-3xl font-light transition-all duration-300 relative ${
                      activeTab === "study"
                        ? "text-white scale-100"
                        : "text-white/30 hover:text-white/50 scale-95"
                    }`}
                  >
                    Bible Study
                    {activeTab === "study" && (
                      <motion.div
                        layoutId="tab-underline"
                        className="absolute left-0 right-0 h-px bg-white/60 -bottom-1 md:-bottom-2"
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                        }}
                        aria-hidden="true"
                      />
                    )}
                  </button>
                </div>
              </nav>
              {/* Live Indicator */}
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

          {/* Content Container */}
          <div className="relative md:min-h-[375px] flex items-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="w-full"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  {...contentAnimation}
                  className="w-full"
                  // animate/exit now animate tab switches only, as before
                >
                  {activeTab === "message" ? (
                    <MessageTab
                      videoData={videoData}
                      isMobile={isMobile}
                      openYouTubeVideo={openYouTubeVideo}
                      setShowPlayer={setShowPlayer}
                      shouldReduceMotion={shouldReduceMotion ?? undefined}
                    />
                  ) : (
                    <BibleStudyTab
                      isMobile={isMobile}
                      shouldReduceMotion={shouldReduceMotion ?? undefined}
                    />
                  )}
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Section Indicators */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: isMobile ? 0.4 : 0.6, duration: 0.4 }}
            className="flex justify-center gap-2 mt-12 md:mt-16"
          >
            {tabOrder.map((tab) => (
              <button
                key={tab}
                onClick={() => handleTabClick(tab as "message" | "study")}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  activeTab === tab ? "bg-white/60 w-6 md:w-8" : "bg-white/20"
                }`}
                aria-label={`View ${
                  tab === "message" ? "latest message" : "bible study"
                }`}
                aria-pressed={activeTab === tab}
                type="button"
              />
            ))}
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
            aria-modal="true"
            role="dialog"
            aria-label={
              videoData?.title ? `Playing "${videoData.title}"` : "Video player"
            }
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
                type="button"
              >
                <X className="w-6 h-6 md:w-8 md:h-8" aria-hidden="true" />
              </button>
              <iframe
                title={videoData?.title || "YouTube video player"}
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
