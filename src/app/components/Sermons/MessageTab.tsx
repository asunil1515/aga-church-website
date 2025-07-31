"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Play, Circle } from "lucide-react";
import Image from "next/image";
import type { VideoData } from "./Sermons";

type Props = {
  videoData: VideoData | null;
  isMobile: boolean;
  openYouTubeVideo: () => void;
  setShowPlayer: (show: boolean) => void;
  shouldReduceMotion: boolean | undefined;
};

export default function MessageTab({
  videoData,
  isMobile,
  openYouTubeVideo,
  setShowPlayer,
  shouldReduceMotion,
}: Props) {
  return (
    <div
      id="sermon-tabpanel-message"
      role="tabpanel"
      aria-labelledby="sermon-tab-message"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-20 items-center">
        {/* Text Content */}
        <motion.div
          className={`space-y-6 md:space-y-8 ${isMobile ? "order-1" : ""}`}
          initial={
            shouldReduceMotion
              ? false
              : { opacity: 0, x: isMobile ? 0 : 30, y: isMobile ? 20 : 0 }
          }
          animate={shouldReduceMotion ? false : { opacity: 1, x: 0, y: 0 }}
          transition={
            shouldReduceMotion
              ? undefined
              : {
                  duration: isMobile ? 0.4 : 0.6,
                  delay: isMobile ? 0.2 : 0.4,
                }
          }
        >
          <div>
            <p className="text-white/40 text-xs md:text-sm uppercase tracking-widest mb-3 md:mb-4">
              Weekly Messages
            </p>
            <h2 className="text-2xl md:text-3xl lg:text-5xl font-light text-white leading-tight">
              Rooted in Scripture.
              <span className="block font-normal mt-1 md:mt-0">
                Empowered by the Spirit.
              </span>
            </h2>
          </div>

          <p className="text-white/60 text-base md:text-lg font-light leading-relaxed">
            Whether you&apos;re new to faith or growing deeper, we believe
            God&apos;s Word has something fresh for you today.
          </p>

          <div className="pt-2 md:pt-4">
            <motion.button
              onClick={openYouTubeVideo}
              whileHover={!isMobile && !shouldReduceMotion ? { x: 5 } : {}}
              whileTap={{ scale: 0.98 }}
              className="group flex items-center gap-2 md:gap-3 text-white cursor-pointer"
              aria-label={
                videoData?.title
                  ? `Watch message: ${videoData.title}`
                  : "Watch message"
              }
            >
              <span className="text-base md:text-lg font-light">
                Watch Message
              </span>
              <ArrowUpRight
                className="w-4 h-4 md:w-5 md:h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                strokeWidth={1}
                aria-hidden="true"
              />
            </motion.button>
          </div>
        </motion.div>

        {/* Video Preview */}
        <motion.div
          className={isMobile ? "order-2" : ""}
          initial={
            shouldReduceMotion
              ? false
              : { opacity: 0, x: isMobile ? 0 : -30, y: isMobile ? 20 : 0 }
          }
          animate={shouldReduceMotion ? false : { opacity: 1, x: 0, y: 0 }}
          transition={
            shouldReduceMotion
              ? undefined
              : {
                  duration: isMobile ? 0.4 : 0.6,
                  delay: isMobile ? 0.3 : 0.2,
                }
          }
        >
          <button
            onClick={() => setShowPlayer(true)}
            className="group block relative w-full"
            aria-label={
              videoData?.title
                ? `Play latest message: ${videoData.title}`
                : "Play latest message"
            }
            type="button"
          >
            <div className="relative aspect-[16/9] overflow-hidden bg-zinc-900 rounded-lg md:rounded-none">
              <Image
                src={videoData?.thumbnail || "/latest-sermon.jpg"}
                alt={videoData?.title || "Latest sermon"}
                fill
                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-transparent transition-all duration-500" />

              {/* Play Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  whileHover={
                    !isMobile && !shouldReduceMotion ? { scale: 1.1 } : {}
                  }
                  whileTap={{ scale: 0.9 }}
                  className="w-14 h-14 md:w-16 md:h-16 rounded-full border border-white/50 backdrop-blur-sm flex items-center justify-center transition-all duration-300 group-hover:border-white group-hover:bg-white/10"
                >
                  <Play
                    className="w-5 h-5 md:w-6 md:h-6 text-white ml-1"
                    strokeWidth={1}
                    aria-hidden="true"
                  />
                </motion.div>
              </div>

              {/* Live Badge */}
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
    </div>
  );
}
