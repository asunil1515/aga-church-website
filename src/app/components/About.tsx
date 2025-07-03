"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  CaretDoubleRightIcon,
  CrossIcon,
  HeartIcon,
  UsersIcon,
  BookOpenIcon,
} from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import { motion } from "framer-motion";

const About = () => {
  const [activeCard, setActiveCard] = useState<"about" | "expect" | null>(null);

  return (
    <section
      className="relative min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 py-16 md:py-32 px-4 flex justify-center overflow-hidden"
      id="about"
    >
      {/* gradient background */}
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

      {/* grid pattern */}
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
            <CrossIcon size={32} className="text-gray-500" />
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="text-gray-900">DISCOVER</span>
            <br />
            <span className="text-gray-600">YOUR PURPOSE</span>
          </h2>
        </motion.div>

        {/* Main content cards */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column - About */}
          <motion.div
            className="relative h-full"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="relative bg-white rounded-2xl p-6 md:p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300 overflow-hidden h-full flex flex-col">
              {/* Subtle background accent */}
              <div className="absolute -top-32 -right-32 w-64 h-64 bg-gray-100 rounded-full opacity-50 hidden md:block" />

              {/* Image */}
              <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden mb-6 md:mb-8 group">
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <Image
                  src="/jona.jpg"
                  alt="Church"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  priority
                />
                {/* Corner accents */}
                <div className="absolute top-4 left-4 w-12 md:w-16 h-12 md:h-16 border-t-2 border-l-2 border-white/40 rounded-tl-xl" />
                <div className="absolute bottom-4 right-4 w-12 md:w-16 h-12 md:h-16 border-b-2 border-r-2 border-white/40 rounded-br-xl" />
              </div>

              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                ABOUT OUR CHURCH
                <div className="h-0.5 w-16 bg-gray-300 mt-2" />
              </h3>

              <p className="text-sm md:text-base text-gray-600 leading-relaxed mb-6 flex-grow">
                Amazing Grace Assembly is a Bible-based church located in
                Pearland, Texas. We provide a combined South Indian (Malayalam)
                and English service each Sunday morning along with various other
                services throughout the week. Our church's goal is to see
                individuals experience the Amazing Grace that saves lost and
                broken people through a personal encounter with Jesus.
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6 md:mb-7">
                {["Malayalam", "English", "Youth Ministry", "Bible Study"].map(
                  (tag) => (
                    <span
                      key={tag}
                      className="px-2 md:px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs md:text-sm"
                    >
                      {tag}
                    </span>
                  )
                )}
              </div>

              <div className="mb-4 md:mb-0 z-20">
                <Link
                  href="/beliefs"
                  className="inline-flex items-center gap-2 text-gray-900 font-semibold hover:text-gray-700 transition-colors group px-3 py-3 -mx-3 -my-3"
                  onMouseEnter={() => setActiveCard("about")}
                  onMouseLeave={() => setActiveCard(null)}
                >
                  Our Beliefs
                  <span
                    className={`transition-transform duration-200 ${
                      activeCard === "about" ? "translate-x-1" : ""
                    }`}
                  >
                    <CaretDoubleRightIcon size={20} weight="bold" />
                  </span>
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Right Column - What to Expect */}
          <motion.div
            className="relative h-full"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <div className="relative bg-white rounded-2xl p-6 md:p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300 overflow-hidden h-full flex flex-col">
              {/* Subtle background accent */}
              <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-gray-100 rounded-full opacity-50 hidden md:block" />

              {/* Mobile Image */}
              <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden mb-6 md:mb-8 group lg:hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <Image
                  src="/Cross.jpg"
                  alt="Cross"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                {/* Corner accents */}
                <div className="absolute top-4 left-4 w-12 md:w-16 h-12 md:h-16 border-t-2 border-l-2 border-white/40 rounded-tl-xl" />
                <div className="absolute bottom-4 right-4 w-12 md:w-16 h-12 md:h-16 border-b-2 border-r-2 border-white/40 rounded-br-xl" />
              </div>

              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                WHAT TO EXPECT
                <div className="h-0.5 w-16 bg-gray-300 mt-2" />
              </h3>

              <p className="text-sm md:text-base text-gray-600 leading-relaxed mb-6 flex-grow">
                We are a multi-generational, Spirit-filled church where people
                from all walks of life come together to encounter God. Expect
                Iconfelt worship, inspiring biblical teaching, and a supportive
                community that encourages growth and connection. Whether you're
                new to the faith or have walked with Jesus for years, you'll
                find a place to belong.
              </p>

              {/* Experience Cards */}
              <div className="grid grid-cols-3 gap-2 md:gap-3 mb-6">
                {[
                  { icon: HeartIcon, label: "Worship" },
                  { icon: BookOpenIcon, label: "Teaching" },
                  { icon: UsersIcon, label: "Community" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="bg-gray-50 rounded-lg p-2 md:p-3 text-center"
                  >
                    <div className="w-7 h-7 md:w-8 md:h-8 mx-auto mb-1 rounded-md bg-gray-200/70 flex items-center justify-center">
                      <item.icon
                        size={14}
                        className="text-gray-700 md:hidden"
                      />
                      <item.icon
                        size={16}
                        className="text-gray-700 hidden md:block"
                      />
                    </div>
                    <span className="text-[10px] md:text-xs text-gray-600">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mb-4 md:mb-7 z-20">
                <Link
                  href="/#visit"
                  className="inline-flex items-center gap-2 text-gray-900 font-semibold hover:text-gray-700 transition-colors group px-3 py-3 -mx-3 -my-3"
                  onMouseEnter={() => setActiveCard("expect")}
                  onMouseLeave={() => setActiveCard(null)}
                >
                  Visit Us
                  <span
                    className={`transition-transform duration-200 ${
                      activeCard === "expect" ? "translate-x-1" : ""
                    }`}
                  >
                    <CaretDoubleRightIcon size={20} weight="bold" />
                  </span>
                </Link>
              </div>

              {/* Desktop Image */}
              <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden hidden lg:block group">
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <Image
                  src="/Cross.jpg"
                  alt="Cross"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                {/* Corner accents */}
                <div className="absolute top-4 left-4 w-16 h-16 border-t-2 border-l-2 border-white/40 rounded-tl-xl" />
                <div className="absolute bottom-4 right-4 w-16 h-16 border-b-2 border-r-2 border-white/40 rounded-br-xl" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
