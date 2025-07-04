"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function OurPastor() {
  return (
    <section
      className="relative bg-cover bg-center bg-no-repeat px-4 py-16 md:py-24 lg:py-40 text-white sm:px-6 lg:px-8 overflow-hidden"
      style={{ backgroundImage: 'url("/BG1.jpg")' }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-0" />

      {/* Container */}
      <div className="relative z-10 max-w-6xl mx-auto md:px-6 lg:px-12">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16 px-2 select-none"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-wide drop-shadow-md">
            Lead Pastor
          </h2>
          <p className="text-sm sm:text-base text-white/80 mt-2">
            Get to know our leader
          </p>
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
         <div className="relative bg-gradient-to-br from-white/10 via-white/5 to-white/10 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl hover:shadow-2xl transition-shadow duration-300 overflow-hidden flex flex-col lg:flex-row cursor-pointer">
{/* Image */}
            <div className="group relative w-full aspect-[4/3] lg:w-[360px] lg:aspect-auto lg:h-auto shrink-0 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <Image
                src="/pastor.jpg"
                alt="Rev. Thomas Abraham"
                fill
                className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                priority
              />
              {/* Corner accents */}
              <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-white/40 rounded-tl-xl pointer-events-none" />
              <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-white/40 rounded-br-xl pointer-events-none" />
            </div>

            {/* Text */}
            <div className="p-6 sm:p-8 lg:p-12 flex flex-col justify-center text-white">
              <h3 className="text-xl sm:text-2xl font-semibold mb-4 tracking-wide drop-shadow-md">
                REV. THOMAS ABRAHAM
                <div
                  className="mt-2 h-0.5 w-24 rounded-full"
                  style={{
                    background:
                      "linear-gradient(to right, #38bdf8, rgba(255,255,255,0.2), #c48e2e)",
                  }}
                />
              </h3>

              <p className="text-sm sm:text-base leading-relaxed text-white/90 mb-6">
                Pastor Thomas Abraham, born and raised in Kerala, India,
                committed his life to ministry in 1974 at the age of 17. A
                graduate of Shalom and Southern Asia Bible Colleges, he has
                served for over 40 years in India and the U.S., planting
                churches in Mumbai, Bangalore, NYC, and Houston.
              </p>
              <p className="text-sm leading-relaxed text-white/90 md:text-base md:text-white/80">
                Since 2014, he has led Amazing Grace Assembly with humility and
                spiritual conviction. His wife Mary has stood faithfully by his
                side, and they are blessed with three children—Amy, Denny, and
                Jemi.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
