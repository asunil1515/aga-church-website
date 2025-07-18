"use client";
import React, { useState, useCallback } from "react";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { IoLogoVenmo } from "react-icons/io5";
import { SiZelle } from "react-icons/si";
import { FiCopy, FiCheck } from "react-icons/fi";
import Head from "next/head";

interface ZelleAccount {
  id: string;
  label: string;
  email: string;
}

const DonatePage: React.FC = () => {
  const [selectedMethod, setSelectedMethod] = useState<
    "venmo" | "zelle" | null
  >(null);
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);

  const zelleAccounts: ZelleAccount[] = [
    { id: "main", label: "General Giving", email: "aga.assembly.1@gmail.com" },
    {
      id: "building",
      label: "Building Fund",
      email: "aga.assembly.bld@gmail.com",
    },
    { id: "fm", label: "FM Ministry", email: "aga.assembly.fm@gmail.com" },
  ];

  const handleCopyEmail = useCallback(async (email: string, id: string) => {
    try {
      await navigator.clipboard.writeText(email);
      setCopiedEmail(id);
      setTimeout(() => setCopiedEmail(null), 2000);
    } catch (error) {
      console.error("Failed to copy email:", error);
    }
  }, []);

  const toggleMethod = useCallback((method: "venmo" | "zelle") => {
    setSelectedMethod((current) => (current === method ? null : method));
  }, []);

  return (
    <>
      <Head>
        <title>Donate - Amazing Grace Assembly</title>
        <meta
          name="description"
          content="Partner with Amazing Grace Assembly in spreading hope and love through your generous donations."
        />
        <link rel="preload" href="/BG1.jpg" as="image" />
      </Head>

      <Navbar disableFloating={true} />

      <section className="relative min-h-screen overflow-hidden">
        {/* Background Section */}
        <div className="absolute inset-0">
          {/* Parallax Background Image */}
          <motion.div
            className="absolute inset-0 scale-110"
            animate={{
              scale: [1.1, 1.15, 1.1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Image
              alt="Donation Background"
              src="/BG1.jpg"
              layout="fill"
              quality={100}
              objectFit="cover"
              className="opacity-60 saturate-50"
              priority
            />
          </motion.div>

          {/* Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0c0c0c]/60 via-[#0c0c0c]/80 to-[#141414]" />
          <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#141414] to-transparent" />

          {/* Noise Texture Overlay */}
          <div
            className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Cfilter id='noise'%3E%3CfeTurbulence baseFrequency='0.9' /%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
            }}
          />
        </div>

        {/* Main Content */}
        <div className="relative z-10 min-h-screen flex flex-col justify-center py-16 md:py-24 px-4">
          <div className="max-w-4xl mx-auto w-full">
            {/* Header Section */}
            <motion.div
              className="text-center mb-12 md:mb-16 lg:mb-24"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.h1
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-4 md:mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
              >
                <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500">
                  DONATE.
                </span>
              </motion.h1>
              <motion.p
                className="text-sm md:text-lg lg:text-xl text-gray-400 max-w-md mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Support our mission to share God's love.
              </motion.p>
            </motion.div>

            {/* Donation Methods Container */}
            <div className="space-y-4 md:space-y-6 max-w-2xl mx-auto">
              {/* Venmo Option */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="group relative"
              >
                <div
                  className={`relative overflow-hidden rounded-2xl border backdrop-blur-xl transition-all duration-500 ${
                    selectedMethod === "venmo"
                      ? "bg-gray-200 text-black border-gray-200 shadow-2xl"
                      : "bg-white/[0.03] hover:bg-white/[0.05] border-white/10 hover:border-white/20 shadow-xl"
                  }`}
                >
                  <button
                    onClick={() => toggleMethod("venmo")}
                    className="w-full p-6 md:p-8 lg:p-10 text-left"
                    aria-expanded={selectedMethod === "venmo"}
                    aria-controls="venmo-details"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 md:gap-6">
                        <motion.div
                          className={`transition-all duration-500 ${
                            selectedMethod === "venmo"
                              ? "text-black"
                              : "text-white/60"
                          }`}
                          animate={{
                            rotate: selectedMethod === "venmo" ? 360 : 0,
                          }}
                          transition={{ duration: 0.5 }}
                        >
                          <IoLogoVenmo className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12" />
                        </motion.div>
                        <div>
                          <h3
                            className={`text-xl md:text-2xl lg:text-3xl font-bold transition-colors duration-300 ${
                              selectedMethod === "venmo"
                                ? "text-black"
                                : "text-white"
                            }`}
                          >
                            Venmo
                          </h3>
                          <p
                            className={`text-xs md:text-sm mt-1 transition-colors duration-300 ${
                              selectedMethod === "venmo"
                                ? "text-black/60"
                                : "text-gray-400"
                            }`}
                          >
                            Quick digital payments
                          </p>
                        </div>
                      </div>
                      <motion.div
                        animate={{
                          rotate: selectedMethod === "venmo" ? 45 : 0,
                        }}
                        transition={{ duration: 0.3 }}
                        className={`text-xl md:text-2xl transition-colors duration-300 ${
                          selectedMethod === "venmo"
                            ? "text-black"
                            : "text-white/40"
                        }`}
                        aria-hidden="true"
                      >
                        +
                      </motion.div>
                    </div>
                  </button>

                  {/* Venmo Details */}
                  <AnimatePresence>
                    {selectedMethod === "venmo" && (
                      <motion.div
                        id="venmo-details"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="border-t border-black/10"
                      >
                        <div className="p-6 md:p-8 lg:p-10 pt-4 md:pt-6">
                          <a
                            href="https://account.venmo.com/u/Amazing-Grace-27"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 md:gap-3 bg-black text-white px-6 md:px-8 py-3 md:py-4 rounded-xl font-semibold hover:bg-black/90 transition-all duration-300 group text-sm md:text-base"
                          >
                            <span>Open Venmo</span>
                            <motion.span
                              animate={{ x: [0, 4, 0] }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                              aria-hidden="true"
                            >
                              →
                            </motion.span>
                          </a>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>

              {/* Zelle Option */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="group relative"
              >
                <div
                  className={`relative overflow-hidden rounded-2xl border backdrop-blur-xl transition-all duration-500 ${
                    selectedMethod === "zelle"
                      ? "bg-gray-200 text-black border-white shadow-2xl"
                      : "bg-white/[0.03] hover:bg-white/[0.05] border-white/10 hover:border-white/20 shadow-xl"
                  }`}
                >
                  <button
                    onClick={() => toggleMethod("zelle")}
                    className="w-full p-6 md:p-8 lg:p-10 text-left"
                    aria-expanded={selectedMethod === "zelle"}
                    aria-controls="zelle-details"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 md:gap-6">
                        <motion.div
                          className={`transition-all duration-500 ${
                            selectedMethod === "zelle"
                              ? "text-black"
                              : "text-white/60"
                          }`}
                          animate={{
                            rotate: selectedMethod === "zelle" ? 360 : 0,
                          }}
                          transition={{ duration: 0.5 }}
                        >
                          <SiZelle className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12" />
                        </motion.div>
                        <div>
                          <h3
                            className={`text-xl md:text-2xl lg:text-3xl font-bold transition-colors duration-300 ${
                              selectedMethod === "zelle"
                                ? "text-black"
                                : "text-white"
                            }`}
                          >
                            Zelle
                          </h3>
                          <p
                            className={`text-xs md:text-sm mt-1 transition-colors duration-300 ${
                              selectedMethod === "zelle"
                                ? "text-black/60"
                                : "text-gray-400"
                            }`}
                          >
                            Direct bank transfers
                          </p>
                        </div>
                      </div>
                      <motion.div
                        animate={{
                          rotate: selectedMethod === "zelle" ? 45 : 0,
                        }}
                        transition={{ duration: 0.3 }}
                        className={`text-xl md:text-2xl transition-colors duration-300 ${
                          selectedMethod === "zelle"
                            ? "text-black"
                            : "text-white/40"
                        }`}
                        aria-hidden="true"
                      >
                        +
                      </motion.div>
                    </div>
                  </button>

                  {/* Zelle Details */}
                  <AnimatePresence>
                    {selectedMethod === "zelle" && (
                      <motion.div
                        id="zelle-details"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="border-t border-black/10"
                      >
                        <div className="p-6 md:p-8 lg:p-10 pt-4 md:pt-6 space-y-2 md:space-y-3">
                          {zelleAccounts.map((account, index) => (
                            <motion.button
                              key={account.id}
                              onClick={() =>
                                handleCopyEmail(account.email, account.id)
                              }
                              className="w-full text-left p-3 md:p-4 rounded-xl bg-black/5 hover:bg-black/10 transition-all duration-300 group"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.1 }}
                              aria-label={`Copy ${account.label} email address`}
                            >
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="font-medium text-black text-sm md:text-base">
                                    {account.label}
                                  </p>
                                  <p className="text-xs md:text-sm text-black/50 font-mono mt-1">
                                    {account.email}
                                  </p>
                                </div>
                                <div
                                  className={`transition-all duration-300 ${
                                    copiedEmail === account.id
                                      ? "text-green-600"
                                      : "text-black/30 group-hover:text-black/60"
                                  }`}
                                  aria-label={
                                    copiedEmail === account.id
                                      ? "Copied"
                                      : "Copy"
                                  }
                                >
                                  {copiedEmail === account.id ? (
                                    <FiCheck className="w-4 h-4 md:w-5 md:h-5" />
                                  ) : (
                                    <FiCopy className="w-4 h-4 md:w-5 md:h-5" />
                                  )}
                                </div>
                              </div>
                            </motion.button>
                          ))}
                          <p className="text-[10px] md:text-xs text-black/40 text-center mt-3 md:mt-4">
                            Click any email to copy
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </div>

            {/* Footer Quote */}
            <motion.div
              className="text-center mt-12 md:mt-16 lg:mt-24"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              <div className="flex items-center justify-center gap-2 md:gap-3 max-w-xs mx-auto">
                {/* Left Line */}
                <div className="w-8 md:w-12 h-px bg-gradient-to-r from-transparent to-gray-700/50" />

                {/* Quote */}
                <div className="flex-shrink-0">
                  <p className="text-xs md:text-sm text-gray-400/70 italic">
                    "God loves a cheerful giver"
                  </p>
                  <p className="text-[10px] md:text-xs text-gray-500/70 mt-1">
                    2 Corinthians 9:7
                  </p>
                </div>

                {/* Right Line */}
                <div className="w-8 md:w-12 h-px bg-gradient-to-l from-transparent to-gray-700/50" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default DonatePage;
