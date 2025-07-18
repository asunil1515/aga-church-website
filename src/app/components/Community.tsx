"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  CaretCircleRightIcon,
  UsersThreeIcon,
  HeartIcon,
  HandsPrayingIcon,
  GlobeIcon,
} from "@phosphor-icons/react/dist/ssr";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const images = Array.from(
  { length: 10 },
  (_, i) => `/cpics/KESTER_LIVE-${String(i + 1).padStart(2, "0")}.jpg`
);

export default function Community() {
  const [activeButton, setActiveButton] = useState<
    "donate" | "visit" | "visit" | null
  >(null);
  const plugin = useRef(Autoplay({ delay: 3500, stopOnInteraction: false }));

  return (
    <section
      id="community"
      className="relative w-full min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 py-16 md:py-24 lg:py-40 px-4 overflow-hidden"
    >
      {/* Gradient background circles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%]">
          <div
            className="absolute top-1/4 left-1/4 w-[300px] md:w-[600px] h-[300px] md:h-[600px] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(0, 0, 0, 0.05) 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute bottom-1/4 right-1/4 w-[400px] md:w-[800px] h-[400px] md:h-[800px] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(0, 0, 0, 0.04) 0%, transparent 70%)",
            }}
          />
        </div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,.05) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(0,0,0,.05) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto md:px-4 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-12 md:mb-20"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="inline-block mb-4 md:mb-6">
            <UsersThreeIcon size={32} className="text-gray-500" />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="text-gray-900">EMBRACE</span>
            <br />
            <span className="text-gray-600">COMMUNITY</span>
          </h2>
        </motion.div>

        {/* Combined Gallery and Content Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 overflow-hidden"
        >
          {/* Background Accents */}
          <div className="absolute -top-32 -right-32 w-64 h-64 bg-gray-100 rounded-full opacity-50" />
          <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-gray-100 rounded-full opacity-30" />

          {/* Gallery Section */}
          <div className="relative w-full px-6 md:px-8 pt-4 md:pt-8">
            <Carousel
              plugins={[plugin.current]}
              className="w-full"
              opts={{ align: "center", loop: true }}
            >
              <CarouselContent>
                {images.map((src, i) => (
                  <CarouselItem key={i} className="basis-full">
                    <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden group">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <Image
                        src={src}
                        alt={`Community moment ${i + 1}`}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                        sizes="100vw"
                        priority={i === 0}
                      />
                      <div className="absolute top-4 left-4 w-12 md:w-16 h-12 md:h-16 border-t-2 border-l-2 border-white/40 rounded-tl-xl" />
                      <div className="absolute bottom-4 right-4 w-12 md:w-16 h-12 md:h-16 border-b-2 border-r-2 border-white/40 rounded-br-xl" />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>

              <CarouselPrevious className="left-2 md:left-4 md:p-6 bg-black border-black text-white hover:bg-black hover:text-white hover:border-black md:hover:bg-white md:hover:text-black md:hover:border-gray-300 transition-all duration-300 ease-in-out" />
              <CarouselNext className="right-2 md:right-4 md:p-6 bg-black border-black text-white hover:bg-black hover:text-white hover:border-black md:hover:bg-white md:hover:text-black md:hover:border-gray-300 transition-all duration-300 ease-in-out" />
            </Carousel>
          </div>

          {/* Content Section */}
          <div className="grid md:grid-cols-2 relative">
            {/* Left - Message */}
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">
                FAITH WITH WORKS
                <div className="h-0.5 w-20 bg-black mt-2" />
              </h3>
              <p className="text-base md:text-lg leading-relaxed text-gray-700 mb-8">
                “So also faith by itself, if it does not have works, is dead.”
                (James 2:17). We believe the church is more than just a building
                — it's a community empowered by the Holy Spirit to put faith
                into action and make a real impact in the world.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="/donate"
                  className="group relative flex items-center justify-center gap-2 px-6 md:px-8 py-3 rounded-full font-semibold text-white border-2 border-black bg-black overflow-hidden transition-all duration-300 hover:shadow-lg"
                  onMouseEnter={() => setActiveButton("donate")}
                  onMouseLeave={() => setActiveButton(null)}
                >
                  <span className="relative z-10">Donate</span>
                  <span
                    className={`relative z-10 transition-transform duration-200 ${
                      activeButton === "donate" ? "translate-x-1" : ""
                    }`}
                  >
                    <CaretCircleRightIcon size={20} weight="bold" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-gray-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </a>

                <a
                  href="/#visit"
                  className="group relative flex items-center justify-center gap-2 px-6 md:px-8 py-3 rounded-full font-semibold text-black bg-transparent border-2 border-black overflow-hidden transition-all duration-300 hover:shadow-lg"
                  onMouseEnter={() => setActiveButton("visit")}
                  onMouseLeave={() => setActiveButton(null)}
                >
                  <span className="relative z-10">Visit Us</span>
                  <span
                    className={`relative z-10 transition-transform duration-200 ${
                      activeButton === "visit" ? "translate-x-1" : ""
                    }`}
                  >
                    <CaretCircleRightIcon size={20} weight="bold" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </a>
              </div>
            </div>

            {/* Right - Pillars */}
            <div className="hidden bg-gray-50 p-8 md:p-12 md:flex items-center">
              <div className="grid grid-cols-1 gap-1 w-full">
                {[
                  {
                    icon: HeartIcon,
                    label: "Love in Action",
                    desc: "Share Christ's love through service",
                  },
                  {
                    icon: HandsPrayingIcon,
                    label: "Grow Together",
                    desc: "Strengthen faith in community",
                  },
                  {
                    icon: GlobeIcon,
                    label: "Impact Lives",
                    desc: "Transform our world for Christ",
                  },
                ].map(({ icon: Icon, label, desc }) => (
                  <div
                    key={label}
                    className="flex items-start gap-4 group cursor-pointer rounded-lg transition-colors duration-300 hover:bg-gray-200 p-4"
                  >
                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center flex-shrink-0 transition-colors duration-300 group-hover:bg-gray-200">
                      <Icon size={24} className="text-gray-700" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900 mb-1">{label}</h4>
                      <p className="text-sm text-gray-600">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
