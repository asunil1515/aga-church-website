"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import {
  CaretCircleRightIcon,
  UsersThreeIcon,
  HeartIcon,
  HandsPrayingIcon,
  GlobeIcon,
} from "@phosphor-icons/react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";
import { ImagesIcon } from "lucide-react";

const images = Array.from(
  { length: 40 },
  (_, i) => `/cpics/AGA_PICS-${String(i + 1).padStart(2, "0")}.jpg`,
);

export default function Community() {
  const [activeButton, setActiveButton] = useState<"donate" | "visit" | null>(
    null,
  );
  const plugin = useRef(Autoplay({ delay: 3500, stopOnInteraction: false }));
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="community"
      aria-label="Community Section"
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
              initial={false}
              whileInView={
                !shouldReduceMotion
                  ? {
                      rotate: [0, -8, 8, -4, 4, 0],
                      scale: [1, 1.15, 1.05, 1.12, 1],
                      transition: {
                        rotate: {
                          delay: 0.25,
                          times: [0, 0.12, 0.24, 0.38, 0.56, 1],
                          duration: 1.2,
                          ease: "easeInOut",
                        },
                        scale: {
                          delay: 0.25,
                          times: [0, 0.3, 0.5, 0.7, 1],
                          duration: 1.2,
                          ease: "easeOut",
                        },
                      },
                    }
                  : {}
              }
              viewport={{ amount: 0.5 }}
              style={{ display: "inline-block" }}
            >
              <UsersThreeIcon
                className="text-gray-500 size-8 md:w-[50px] md:h-[50px]"
                aria-hidden="true"
              />
            </motion.span>
          </motion.div>
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
              className="w-full bg-black rounded-2xl"
              opts={{ align: "center", loop: true }}
            >
              <CarouselContent>
                {images.map((src, i) => (
                  <CarouselItem key={i} className="basis-full">
                    <div className="relative aspect-[3/2] w-full rounded-xl overflow-hidden group">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <Image
                        src={src}
                        alt={`Community moment ${i + 1}`}
                        fill
                        className="object-contain group-hover:scale-105 transition-transform duration-700"
                        sizes="100vw"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <a
                href="https://drive.google.com/drive/u/0/folders/1XmL5Gm3xKei_1eghS_cH4-zi8CBi8BWy"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-2 left-2 md:bottom-4 md:left-4 z-20 group p-2 md:p-3 rounded-full bg-black/80 text-white backdrop-blur-sm border border-white/40 hover:border-white/60 transition-all duration-300"
                aria-label="View Gallery"
              >
                <ImagesIcon className="w-3 h-3 md:w-5 md:h-5" />
              </a>
              <CarouselPrevious
                aria-label="Previous slide"
                type="button"
                className="-left-4 md:-left-6 md:p-6 !bg-black !text-white border border-white/50 hover:border-white/70 transition-all duration-300 z-20"
              />
              <CarouselNext
                aria-label="Next slide"
                type="button"
                className="-right-4 md:-right-6 md:p-6 !bg-black !text-white border border-white/50 hover:border-white/70 transition-all duration-300 z-20"
              />
            </Carousel>
          </div>

          {/* Content Section */}
          <div className="grid md:grid-cols-2 relative">
            {/* Left - Message */}
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">
                FAITH WITH WORKS
                <div className="h-0.5 w-16 md:w-20 bg-black mt-2" />
              </h3>
              <p className="text-sm md:text-lg leading-relaxed text-gray-700 mb-8">
                “So also faith by itself, if it does not have works, is dead.”
                (James 2:17). We believe the church is more than just a building
                — it&apos;s a community empowered by the Holy Spirit to put
                faith into action and make a real impact in the world.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="/donate"
                  className="group relative flex items-center justify-center gap-2 px-6 md:px-8 py-3 rounded-full font-semibold text-white border-2 border-black bg-black overflow-hidden transition-all duration-300 hover:shadow-lg"
                  onMouseEnter={() => setActiveButton("donate")}
                  onMouseLeave={() => setActiveButton(null)}
                  aria-label="Donate to our church"
                >
                  <span className="relative z-10">Donate</span>
                  <span
                    className={`relative z-10 transition-transform duration-200 ${
                      activeButton === "donate" ? "translate-x-1" : ""
                    }`}
                  >
                    <CaretCircleRightIcon
                      size={20}
                      weight="bold"
                      aria-hidden="true"
                    />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-gray-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </a>

                <Link
                  href="/#visit"
                  className="group relative flex items-center justify-center gap-2 px-6 md:px-8 py-3 rounded-full font-semibold text-black bg-transparent border-2 border-black overflow-hidden transition-all duration-300 hover:shadow-lg"
                  onMouseEnter={() => setActiveButton("visit")}
                  onMouseLeave={() => setActiveButton(null)}
                  aria-label="Plan your visit with us"
                >
                  <span className="relative z-10">Visit Us</span>
                  <span
                    className={`relative z-10 transition-transform duration-200 ${
                      activeButton === "visit" ? "translate-x-1" : ""
                    }`}
                  >
                    <CaretCircleRightIcon
                      size={20}
                      weight="bold"
                      aria-hidden="true"
                    />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
              </div>
            </div>
            {/* Right - Pillars */}
            <div className="hidden bg-gray-50 p-8 md:p-12 md:flex items-center">
              <div className="grid grid-cols-1 gap-1 w-full">
                {[
                  {
                    icon: HeartIcon,
                    label: "Love in Action",
                    desc: "Share Christ&apos;s love through service",
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
                      <Icon
                        size={24}
                        className="text-gray-700"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900 mb-1">{label}</h4>
                      <p
                        className="text-sm text-gray-600"
                        dangerouslySetInnerHTML={{ __html: desc }}
                      />
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
