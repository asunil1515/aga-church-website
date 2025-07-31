"use client";
import React, { useState, useCallback } from "react";
import { Footer } from "../components/Footer/Footer";
import { Navbar } from "../components/Navbar/Navbar";
import Image from "next/image";
import { motion } from "framer-motion";
import Head from "next/head";
import { VenmoOption } from "../donate/VenmoOption";
import { ZelleOption, ZelleAccount } from "../donate/ZelleOption";

const zelleAccounts: ZelleAccount[] = [
  { id: "main", label: "General Giving", email: "aga.assembly.1@gmail.com" },
  {
    id: "building",
    label: "Building Fund",
    email: "aga.assembly.bld@gmail.com",
  },
  { id: "fm", label: "FM Ministry", email: "aga.assembly.fm@gmail.com" },
];

const DonatePage: React.FC = () => {
  const [selectedMethod, setSelectedMethod] = useState<
    "venmo" | "zelle" | null
  >(null);
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);

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
        {/* Background */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute inset-0 scale-110"
            animate={{ scale: [1.1, 1.15, 1.1] }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
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
          <div className="absolute inset-0 bg-gradient-to-b from-[#0c0c0c]/60 via-[#0c0c0c]/80 to-[#141414]" />
          <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#141414] to-transparent" />
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
            {/* Header */}
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
                Support our mission to share God&apos;s love.
              </motion.p>
            </motion.div>
            {/* Donation Methods */}
            <div className="space-y-4 md:space-y-6 max-w-2xl mx-auto">
              <VenmoOption
                expanded={selectedMethod === "venmo"}
                onToggle={() => toggleMethod("venmo")}
              />
              <ZelleOption
                expanded={selectedMethod === "zelle"}
                onToggle={() => toggleMethod("zelle")}
                accounts={zelleAccounts}
                copiedEmail={copiedEmail}
                handleCopy={handleCopyEmail}
              />
            </div>
            {/* Footer Quote */}
            <motion.div
              className="text-center mt-12 md:mt-16 lg:mt-24"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              <div className="flex items-center justify-center gap-2 md:gap-3 max-w-xs mx-auto">
                <div className="w-8 md:w-12 h-px bg-gradient-to-r from-transparent to-gray-700/50" />
                <div className="flex-shrink-0">
                  <p className="text-xs md:text-sm text-gray-400/70 italic">
                    &quot;God loves a cheerful giver&quot;
                  </p>
                  <p className="text-[10px] md:text-xs text-gray-500/70 mt-1">
                    2 Corinthians 9:7
                  </p>
                </div>
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
