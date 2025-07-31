"use client";
import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { BookOpenIcon } from "lucide-react";

export default function OurPastor() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      aria-label="Meet Our Pastor"
      className="relative bg-cover bg-center bg-no-repeat py-16 md:py-24 lg:py-40 px-4 overflow-hidden"
    >
      {/* Background Image (decorative for SEO, LCP) */}
      <Image
        src="/BG1.jpg"
        alt="" // Decorative bg image
        fill
        className="absolute inset-0 object-cover object-center -z-10"
        priority={false}
      />
      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-900/95 via-neutral-900/75 to-gray-950/85 z-0" />
      <div className="absolute inset-0 bg-black/5 z-0" />
      {/* Light Rays */}
      <div className="absolute inset-0 opacity-[0.015] z-0 pointer-events-none">
        <motion.div
          animate={
            !shouldReduceMotion
              ? {
                  background: [
                    "radial-gradient(circle at 20% 80%, rgba(255,255,255,0.03) 0%, transparent 50%)",
                    "radial-gradient(circle at 80% 20%, rgba(255,255,255,0.03) 0%, transparent 50%)",
                    "radial-gradient(circle at 40% 40%, rgba(255,255,255,0.03) 0%, transparent 50%)",
                  ],
                }
              : undefined
          }
          transition={
            !shouldReduceMotion
              ? {
                  duration: 12,
                  repeat: Infinity,
                  ease: "linear",
                }
              : undefined
          }
          className="absolute inset-0"
        />
      </div>
      {/* Main Container */}
      <div className="relative z-10 max-w-6xl mx-auto md:px-4 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-12 md:mb-20"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-block mb-1 md:mb-2"
            animate={!shouldReduceMotion ? { y: [0, -10, 0] } : undefined}
            transition={
              !shouldReduceMotion
                ? { duration: 4, repeat: Infinity, ease: "easeInOut" }
                : undefined
            }
          >
            <motion.span
              initial={{ scaleX: 0.6 }}
              whileInView={!shouldReduceMotion ? { scaleX: 1 } : undefined}
              exit={{ scaleX: 0.6 }}
              transition={
                !shouldReduceMotion
                  ? { duration: 0.75, delay: 0.25, ease: "easeOut" }
                  : undefined
              }
              viewport={{ amount: 0.5 }}
              className="inline-block origin-center"
            >
              <BookOpenIcon
                className="text-white/60 size-8 md:w-[50px] md:h-[50px]"
                aria-hidden="true"
              />
            </motion.span>
          </motion.div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="text-white">MEET OUR</span>
            <br />
            <span className="text-white/70">PASTOR</span>
          </h2>
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="w-full bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300"
        >
          <div className="flex flex-col lg:grid lg:grid-cols-2">
            {/* Mobile Image */}
            <div className="relative lg:hidden pt-6 px-6 md:pt-8 md:px-8">
              <div className="relative h-[300px] rounded-xl overflow-hidden group">
                <Image
                  src="/pastor.jpg"
                  alt="Rev. Thomas Abraham portrait"
                  fill
                  className="object-cover object-top grayscale-[25%] contrast-110 brightness-95 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute top-4 left-4 w-12 md:w-16 h-12 md:h-16 border-t-2 border-l-2 border-white/40 rounded-tl-xl z-30" />
                <div className="absolute bottom-4 right-4 w-12 md:w-16 h-12 md:h-16 border-b-2 border-r-2 border-white/40 rounded-br-xl z-30" />
              </div>
            </div>
            {/* Desktop Image */}
            <div className="hidden lg:block p-6 md:p-8">
              <div className="relative h-[700px] rounded-xl overflow-hidden group">
                <Image
                  src="/pastor.jpg"
                  alt="Rev. Thomas Abraham portrait"
                  fill
                  className="object-cover object-top grayscale-[25%] contrast-110 brightness-95 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/20 to-black/50 z-10" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute top-4 left-4 w-16 h-16 border-t-2 border-l-2 border-white/40 rounded-tl-xl z-30" />
                <div className="absolute bottom-4 right-4 w-16 h-16 border-b-2 border-r-2 border-white/40 rounded-br-xl z-30" />
              </div>
            </div>
            {/* Text Content */}
            <div className="p-6 md:p-8 lg:p-12 flex flex-col justify-center">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                viewport={{ once: true }}
                className="mb-6 md:mb-10"
              >
                <h3 className="text-xl md:text-2xl font-bold text-white mb-4">
                  REV. THOMAS ABRAHAM
                  <div className="h-0.5 w-16 bg-white/30 mt-2" />
                </h3>
                <p className="text-white/50 text-xs tracking-[0.3em] uppercase">
                  Lead Pastor
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
                viewport={{ once: true }}
                className="space-y-4 text-sm md:text-base text-white/70 leading-relaxed mb-10"
              >
                <p className="text-white/80 font-light">
                  Pastor Thomas Abraham, born and raised in Kerala, India,
                  committed his life to ministry in 1974 at age 17. A graduate
                  of Shalom and Southern Asia Bible Colleges, he has served
                  across India and the U.S.
                </p>
                <p>
                  His journey includes planting churches in Mumbai, Bangalore,
                  NYC, and Houston. Since 2014, he&apos;s led Amazing Grace
                  Assembly with humility, wisdom, and deep conviction.
                </p>
                <p>
                  Pastor Thomas and his wife Mary serve together in ministry,
                  blessed with three children: Amy, Denny, and Jemi.
                </p>
              </motion.div>
              {/* Divider */}
              <div className="flex items-center gap-4 mb-10">
                <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-white/20" />
                <div className="w-2 h-2 rotate-45 border border-white/20" />
                <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent via-white/20 to-white/20" />
              </div>
              <div className="flex items-center justify-center">
                {[
                  { number: "50", label: "Years in Ministry", suffix: "+" },
                  { number: "6", label: "Churches Planted" },
                  { number: "2", label: "Countries Served" },
                ].map((stat, index) => (
                  <React.Fragment key={index}>
                    <div className="text-center flex-1 px-2 sm:px-3 group">
                      <p className="text-2xl md:text-3xl font-thin text-white/80 group-hover:text-white transition-colors duration-300">
                        {stat.number}
                        <span className="text-lg text-white/70 group-hover:text-white transition-colors duration-300">
                          {stat.suffix}
                        </span>
                      </p>
                      <p className="text-[10px] md:text-xs text-white/40 uppercase tracking-wide mt-2 group-hover:text-white transition-colors duration-300">
                        {stat.label}
                      </p>
                    </div>
                    {index < 2 && (
                      <div className="h-12 w-[1px] bg-gradient-to-b from-transparent via-white/20 to-transparent" />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
