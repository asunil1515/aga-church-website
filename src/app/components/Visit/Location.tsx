"use client";

import React, { useState } from "react";
import { Navigation } from "lucide-react";
import { motion } from "framer-motion";

const CHURCH_ADDRESS = "2550 County Rd 90, Pearland, TX 77584";
const GOOGLE_MAPS_EMBED_SRC =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3470.8446852172447!2d-95.37095492579168!3d29.550017075176267!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x86409319798274f3%3A0x8041efadd4cefc72!2s2550%20County%20Rd%2090%2C%20Pearland%2C%20TX%2077584!5e0!3m2!1sen!2sus!4v1742343326804!5m2!1sen!2sus";

const DIRECTIONS_URL =
  "https://www.google.com/maps/dir//2550+County+Rd+90,+Pearland,+TX+77584";

export default function Location() {
  const [hover, setHover] = useState(false);

  return (
    <motion.section
      className="mb-8 lg:mb-12"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
      aria-labelledby="location-title"
      aria-label="Church location map and address"
    >
      <div className="relative bg-white/[0.03] backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-white/10">
        <div
          className="absolute -top-32 -right-32 w-64 h-64 bg-white/[0.02] rounded-full opacity-50 hidden lg:block pointer-events-none"
          aria-hidden="true"
        />
        <div className="relative w-full aspect-[16/9] md:aspect-[2/1] rounded-xl overflow-hidden mb-6 md:mb-8 group">
          <iframe
            src={GOOGLE_MAPS_EMBED_SRC}
            loading="eager"
            allowFullScreen
            className="absolute inset-0 w-full h-full grayscale z-10"
            title={`Map location: ${CHURCH_ADDRESS}`}
            tabIndex={0}
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-[#141414]/60 to-transparent z-20 pointer-events-none"
            aria-hidden="true"
          />
        </div>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2
              id="location-title"
              className="text-xl md:text-2xl font-bold text-white mb-2"
            >
              OUR LOCATION
              <div className="h-0.5 w-16 bg-gray-600 mt-2" />
            </h2>
            <p className="text-sm md:text-base text-gray-400">
              {CHURCH_ADDRESS}
            </p>
          </div>
          <motion.a
            href={DIRECTIONS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex justify-center gap-2 bg-white text-black hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold transition-all duration-300 group"
            aria-label="Get directions to our church on Google Maps"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            whileTap={{ scale: 0.98 }}
          >
            Get Directions
            <span
              className={`transition-all duration-300 ${
                hover ? "translate-x-1" : ""
              }`}
            >
              <Navigation size={20} aria-hidden="true" />
            </span>
          </motion.a>
        </div>
      </div>
    </motion.section>
  );
}
