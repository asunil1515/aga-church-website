"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Head from "next/head";
import Image from "next/image";
import React, { memo } from "react";

interface IntroScreenProps {
  shrink?: boolean;
  fadeOut?: boolean;
  className?: string;
}

const containerClasses = "w-full overflow-hidden";
const headerClasses =
  "absolute left-1/2 top-[69%] -translate-x-1/2 -translate-y-1/2 text-[clamp(2rem,7vw,6.5rem)] font-extrabold text-[#212124] text-center rounded-[120px] w-4/5 py-2 px-4 z-20 fade-in-opacity";

const IntroScreen = ({
  shrink = false,
  fadeOut = false,
  className = "",
}: IntroScreenProps) => {
  const [showHeader, setShowHeader] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setShowHeader(true), 300);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <Head>
        <link
          rel="preload"
          href="/Apparel.jpg"
          as="image"
          type="image/jpeg"
          fetchPriority="high"
        />
      </Head>
      <motion.div
        className={`${containerClasses} ${className}`}
        style={{ backgroundImage: 'url("/Apparel.jpg")' }}
        initial={{
          height: "100vh",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 10,
          opacity: 1,
        }}
        animate={{
          height: shrink ? "0vh" : "100vh",
          opacity: fadeOut ? 0 : 1,
          position: shrink ? "relative" : "absolute",
          zIndex: fadeOut ? 1 : 10,
        }}
        transition={{
          height: { duration: 1.1, ease: "easeInOut" },
          opacity: { duration: 0.8, delay: shrink ? 0.3 : 0 },
          zIndex: { delay: 1 },
        }}
      >
        {/* Overlay image */}
        <div className="w-full h-full absolute top-0 left-0 pointer-events-none">
          <Image
            alt="Apparel Background"
            src="/Apparel.jpg"
            fill
            quality={80} 
            style={{ objectFit: "cover" }}
            className="w-full h-full object-cover object-center z-0"
            priority 
            placeholder="blur" 
            blurDataURL="data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAb/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=" // Low-quality placeholder for faster initial load
          />
        </div>
        <h1 className={`${headerClasses} ${showHeader ? "visible" : ""}`}>
          APPAREL.
        </h1>
      </motion.div>
    </>
  );
};

export default memo(IntroScreen);
