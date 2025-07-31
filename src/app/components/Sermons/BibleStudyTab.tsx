// Keep "use client"; only if you use hooks in this file
"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, BookOpen } from "lucide-react";
import { TbCross } from "react-icons/tb";

type Props = {
  isMobile: boolean;
  shouldReduceMotion: boolean | undefined;
};

const MOBILE_BG_COUNT = 3;
const DESKTOP_BG_COUNT = 6;

export default function BibleStudyTab({ isMobile, shouldReduceMotion }: Props) {
  return (
    <div
      id="sermon-tabpanel-study"
      role="tabpanel"
      aria-labelledby="sermon-tab-study"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-20 items-center">
        {/* Visual */}
        <motion.div
          className="order-2 lg:order-1"
          initial={
            shouldReduceMotion
              ? false
              : { opacity: 0, x: isMobile ? 0 : -30, y: isMobile ? 20 : 0 }
          }
          animate={shouldReduceMotion ? false : { opacity: 1, x: 0, y: 0 }}
          transition={
            shouldReduceMotion
              ? undefined
              : { duration: isMobile ? 0.4 : 0.6, delay: 0.2 }
          }
        >
          <div className="relative aspect-[16/9] bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 border border-white/10 overflow-hidden group rounded-lg md:rounded-none">
            {/* Animated Background */}
            <div className="absolute inset-0 opacity-5" aria-hidden="true">
              {[...Array(isMobile ? MOBILE_BG_COUNT : DESKTOP_BG_COUNT)].map(
                (_, i) => (
                  <motion.div
                    key={i}
                    className="absolute border border-white/20"
                    style={{
                      top: `${i * 20}%`,
                      left: `${i * 15}%`,
                      width: `${100 - i * 10}%`,
                      height: `${100 - i * 10}%`,
                    }}
                    animate={
                      shouldReduceMotion
                        ? {}
                        : {
                            rotate: isMobile ? [0, 180] : [0, 360],
                            scale: [1, 1.1, 1],
                          }
                    }
                    transition={
                      shouldReduceMotion
                        ? undefined
                        : {
                            duration: isMobile ? 30 + i * 5 : 20 + i * 5,
                            repeat: Infinity,
                            ease: "linear",
                          }
                    }
                  />
                )
              )}
            </div>
            {/* Content */}
            <div className="relative z-10 h-full flex items-center justify-center text-center p-4 md:p-6 lg:p-8">
              <div>
                {/* Animated Icon */}
                <motion.div
                  className="inline-block mb-2 mt-4"
                  animate={
                    !isMobile && !shouldReduceMotion ? { y: [0, -13, 0] } : {}
                  }
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
                      aria-hidden="true"
                    />
                    <motion.div
                      className="absolute inset-0 rounded-full border border-white/20"
                      animate={
                        !isMobile && !shouldReduceMotion
                          ? { scale: [1, 1.2, 1], opacity: [0.3, 0, 0.3] }
                          : {}
                      }
                      transition={
                        !isMobile && !shouldReduceMotion
                          ? { duration: 3, repeat: Infinity }
                          : undefined
                      }
                    />
                  </div>
                </motion.div>
                {/* Title */}
                <motion.h2
                  className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-light mb-1 md:mb-2 bg-gradient-to-b from-white to-white/10 bg-clip-text text-transparent"
                  animate={
                    !isMobile && !shouldReduceMotion
                      ? { opacity: [0.5, 1, 0.5] }
                      : {}
                  }
                  transition={
                    !isMobile && !shouldReduceMotion
                      ? { duration: 4, repeat: Infinity }
                      : undefined
                  }
                >
                  MARK
                </motion.h2>
                <p className="text-white/40 text-[10px] sm:text-xs md:text-sm uppercase tracking-widest">
                  Gospel Study
                </p>
                {/* Decorative Elements */}
                <div className="flex items-center justify-center gap-1.5 md:gap-2 mt-2 sm:mt-3 md:mt-4">
                  <div className="h-px w-6 sm:w-8 md:w-12 bg-gradient-to-r from-transparent to-white/20" />
                  <TbCross
                    className="w-4 h-4 sm:w-3 sm:h-3 md:w-5 md:h-5 text-white/20"
                    strokeWidth={1}
                    aria-hidden="true"
                  />
                  <div className="h-px w-6 sm:w-8 md:w-12 bg-gradient-to-l from-transparent to-white/20" />
                </div>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
        </motion.div>

        {/* Text Content */}
        <motion.div
          className="space-y-6 md:space-y-8 order-1 lg:order-2"
          initial={
            shouldReduceMotion
              ? false
              : { opacity: 0, x: isMobile ? 0 : 30, y: isMobile ? 20 : 0 }
          }
          animate={shouldReduceMotion ? false : { opacity: 1, x: 0, y: 0 }}
          transition={
            shouldReduceMotion
              ? undefined
              : { duration: isMobile ? 0.4 : 0.6, delay: isMobile ? 0.3 : 0.4 }
          }
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
            Whether you&apos;re just beginning your walk with Jesus or looking
            to go deeper in your faith, this Bible study through the Gospel of
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
                whileHover={!isMobile && !shouldReduceMotion ? { x: 5 } : {}}
                whileTap={{ scale: 0.98 }}
                className="group flex items-center gap-2 md:gap-3 text-white"
                aria-label="Access Bible Study (opens in new tab)"
              >
                <span className="text-base md:text-lg font-light">
                  Access Bible Study
                </span>
                <ArrowUpRight
                  className="w-4 h-4 md:w-5 md:h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                  strokeWidth={1}
                  aria-hidden="true"
                />
              </motion.button>
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
