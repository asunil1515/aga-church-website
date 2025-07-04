"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function OurPastor() {
  return (
    <section
      className="relative bg-cover bg-center bg-no-repeat py-16 md:py-24 lg:py-40 px-4 overflow-hidden"
      style={{ backgroundImage: 'url("/BG1.jpg")' }}
    >
      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-900/95 via-neutral-900/75 to-gray-950/85 z-0" />
      <div className="absolute inset-0 bg-black/5 z-0" />

      {/* Light Rays */}
      <div className="absolute inset-0 opacity-[0.015] z-0 pointer-events-none">
        <motion.div
          animate={{
            background: [
              "radial-gradient(circle at 20% 80%, rgba(255,255,255,0.03) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 20%, rgba(255,255,255,0.03) 0%, transparent 50%)",
              "radial-gradient(circle at 40% 40%, rgba(255,255,255,0.03) 0%, transparent 50%)",
            ],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute inset-0"
        />
      </div>

      {/* Main Container - matches About section container */}
      <div className="relative z-10 max-w-6xl mx-auto md:px-4 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-12 md:mb-20"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-wide mb-3 text-white"
            style={{ textShadow: "0 1px 3px rgba(0,0,0,0.6)" }}
          >
            Meet Our Pastor
          </h2>
          <p className="text-sm md:text-base text-white/60 max-w-2xl mx-auto">
            Discover the heart and vision behind our spiritual leadership
          </p>
        </motion.div>

        {/* Card - matches About card width and padding */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.2 }}
          viewport={{ once: true }}
          className="w-full bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300"
        >
          <div className="flex flex-col lg:grid lg:grid-cols-2">
            {/* Mobile Image (below lg) */}
            <div className="relative h-[300px] lg:hidden group overflow-hidden">
              <Image
                src="/pastor.jpg"
                alt="Rev. Thomas Abraham"
                fill
                className="object-cover object-top grayscale-[25%] contrast-110 brightness-95 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute top-4 left-4 w-12 md:w-16 h-12 md:h-16 border-t-2 border-l-2 border-white/40 rounded-tl-xl z-30" />
              <div className="absolute bottom-4 right-4 w-12 md:w-16 h-12 md:h-16 border-b-2 border-r-2 border-white/40 rounded-br-xl z-30" />
            </div>

            {/* Desktop Image (from lg and up) */}
            <div className="relative h-[70vh] hidden lg:block group overflow-hidden">
              <Image
                src="/pastor.jpg"
                alt="Rev. Thomas Abraham"
                fill
                className="object-cover object-top grayscale-[25%] contrast-110 brightness-95 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/20 to-black/50 z-10" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute top-4 left-4 w-16 h-16 border-t-2 border-l-2 border-white/40 rounded-tl-xl z-30" />
              <div className="absolute bottom-4 right-4 w-16 h-16 border-b-2 border-r-2 border-white/40 rounded-br-xl z-30" />
            </div>

            {/* Content */}
            <div className="p-6 md:p-8 lg:p-12 flex flex-col justify-center">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                viewport={{ once: true }}
                className="mb-6 md:mb-10"
              >
                <h3
                  className="text-xl md:text-3xl font-bold mb-3 text-white"
                  style={{ textShadow: "0 1px 2px rgba(0,0,0,0.5)" }}
                >
                  REV. THOMAS ABRAHAM
                </h3>
                <div className="flex items-center gap-4">
                  <div className="hidden md:block h-[1px] w-12 bg-white/30" />
                  <p className="text-white/50 text-xs tracking-[0.3em] uppercase">
                    Lead Pastor
                  </p>
                </div>
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
                  NYC, and Houston. Since 2014, he's led Amazing Grace Assembly
                  with humility, wisdom, and deep conviction.
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

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
                className="pb-6 md:pb-0" // bottom padding
              >
                <div className="flex items-center justify-center">
                  {[
                    { number: "50", label: "Years in Ministry", suffix: "+" },
                    { number: "6", label: "Churches Planted" },
                    { number: "2", label: "Countries Served" },
                  ].map((stat, index) => (
                    <React.Fragment key={index}>
                      <div className="text-center flex-1 px-2 sm:px-3">
                        <p className="text-2xl md:text-3xl font-thin text-white/80">
                          {stat.number}
                          <span className="text-lg">{stat.suffix}</span>
                        </p>
                        <p className="text-[10px] md:text-xs text-white/40 uppercase tracking-wide mt-2">
                          {stat.label}
                        </p>
                      </div>
                      {index < 2 && (
                        <div className="h-12 w-[1px] bg-gradient-to-b from-transparent via-white/20 to-transparent" />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
