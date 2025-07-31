"use client";
import React, { useState, useCallback } from "react";
import Image from "next/image";
import { Footer } from "../components/Footer/Footer";
import { BlackNavbar } from "../components/Navbar/Navbar";
import {
  BagSimpleIcon,
  CaretDownIcon,
  CaretLeftIcon,
  CaretRightIcon,
} from "@phosphor-icons/react";
import { motion, AnimatePresence } from "framer-motion";

const images = ["/shirt1.png", "/shirt2.png", "/shirt5.png", "/shirt6.png"];

const YHWHshirtpage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [showShippingDetails, setShowShippingDetails] = useState(false);
  const [showCareDetails, setShowCareDetails] = useState(false);

  // Memoize toggle functions to prevent unnecessary re-renders
  const toggleDescription = useCallback(
    () => setShowFullDescription((prev) => !prev),
    []
  );
  const toggleShippingDetails = useCallback(
    () => setShowShippingDetails((prev) => !prev),
    []
  );
  const toggleCareDetails = useCallback(
    () => setShowCareDetails((prev) => !prev),
    []
  );

  // Memoize image navigation handlers
  const handlePrevImage = useCallback(() => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  }, []);

  const handleNextImage = useCallback(() => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, []);

  // Predefine motion variants for reuse to reduce overhead
  const contentVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { opacity: 1, height: "auto" },
  };

  return (
    <>
      <BlackNavbar variant="default" />
      <motion.div
        className="bg-[#f0f0e5] flex justify-center items-start py-24 md:py-36"
        id="YHWH-tshirt"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{
          duration: 1,
          ease: [0.42, 0, 1, 1],
        }}
        viewport={{ once: true }}
      >
        <div className="flex flex-col justify-center items-center w-full max-w-[1400px] gap-6 p-4 mx-auto md:gap-8 md:p-20">
          <div className="flex flex-col items-center w-full max-w-[90%] md:max-w-full">
            <div className="relative flex items-center justify-center w-full">
              <button
                onClick={handlePrevImage}
                className="absolute top-1/2 -translate-y-1/2 -left-3 bg-[#D4D2CD] border-2 border-[#222222] shadow-md p-2 text-black rounded-[2rem] hover:bg-white transition-colors duration-300 z-10 md:left-32 md:p-3"
              >
                <CaretLeftIcon size={24} className="w-4 h-8 md:w-6 md:h-10" />
              </button>
              <Image
                src={images[currentImageIndex]}
                alt="YHWH-Tee"
                width={800}
                height={800}
                className="object-contain max-h-[50vh] md:max-h-full"
                priority={currentImageIndex === 0}
                loading={currentImageIndex === 0 ? "eager" : "lazy"} // Lazy load subsequent images
              />
              <button
                onClick={handleNextImage}
                className="absolute top-1/2 -translate-y-1/2 -right-3 bg-[#D4D2CD] border-2 border-[#222222] shadow-md p-2 text-black rounded-[2rem] hover:bg-white transition-colors duration-300 z-10 md:right-32 md:p-3"
              >
                <CaretRightIcon size={24} className="w-4 h-8 md:w-6 md:h-10" />
              </button>
            </div>
            <div className="flex justify-center gap-1 mt-6 md:mt-10 md:gap-2">
              {images.map((image, index) => (
                <div
                  key={index}
                  className={`w-16 h-16 p-0.5 border-2 md:w-24 md:h-24 md:p-1 ${
                    index === currentImageIndex
                      ? "border-black"
                      : "border-transparent"
                  } bg-black flex items-center justify-center cursor-pointer`}
                  onClick={() => setCurrentImageIndex(index)}
                >
                  <Image
                    src={image}
                    alt={`Preview ${index + 1}`}
                    width={80}
                    height={80}
                    className="object-contain max-w-[90%] max-h-[90%] md:max-w-full md:max-h-full"
                  />
                </div>
              ))}
            </div>
          </div>

          <h1 className="text-4xl font-bold text-center w-full mb-2 mt-2 md:text-6xl md:mb-6 md:mt-6">
            YHWH TEE
          </h1>

          <div className="flex flex-col items-center w-full pb-2 max-w-[90%] md:max-w-full md:pb-4">
            <div className="w-full flex justify-center mb-6 max-w-xs md:mb-12">
              <a
                href="https://square.link/u/PqDCVeOG"
                rel="noopener noreferrer"
                className="group relative flex cursor-pointer rounded-lg bg-[#D4D2CD] border-2 border-[#222222] shadow-md py-3 px-4 text-black transition-colors duration-300 hover:bg-white/30 w-full justify-between items-center outline-none focus:ring-2 focus:ring-blue-500 md:py-4 md:px-5"
              >
                <span className="font-normal text-base md:text-lg">
                  Buy Now
                </span>
                <BagSimpleIcon size={28} className="bag-icon md:w-8 md:h-8" />
              </a>
            </div>

            <div className="w-full max-w-[805px] flex flex-col items-center mb-2 md:mb-4">
              <h3 className="text-2xl font-bold mb-3 w-full text-left md:text-3xl md:mb-4">
                Description
              </h3>
              <p className="text-base font-normal text-[#272727] w-full text-left md:text-lg">
                One shirt, to glorify one name. This tee, inspired by The
                Burning Bush in Exodus 3, highlights the moment God reveals His
                name, YHWH—&quot;I AM WHO I AM.&quot; The design reflects the
                power of YHWH, the divine identity that calls, sustains, and
                leads.
              </p>
              <AnimatePresence mode="wait">
                {showFullDescription && (
                  <motion.p
                    key="description"
                    variants={contentVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    transition={{
                      opacity: { duration: 0.3 },
                      height: { duration: 0.3 },
                    }}
                    className="text-base font-normal text-[#272727] w-full text-left overflow-hidden md:text-lg"
                  >
                    This is more than just a t-shirt, it&apos;s a conversation
                    starter. He is still the same God that Moses encountered.
                    Rep your God boldly. Let it be a reminder that every moment
                    is an opportunity to release His presence, bringing hope,
                    healing, and revival to a world in need, in style :) <br />
                    <br />
                    6.1 oz of 100% ringspun cotton, the Comfort Colors C1717
                    heavyweight RS t-shirt offers sought-after quality, fashion,
                    and comfort. Preshrunk, soft-washed, and made using
                    garment-dyed fabric. This t-shirt is true to size, we
                    recommend sizing up.
                  </motion.p>
                )}
              </AnimatePresence>
              <button
                className="w-full text-left bg-transparent border-none text-black font-bold cursor-pointer text-lg underline p-0 hover:underline md:text-xl"
                onClick={toggleDescription}
              >
                {showFullDescription ? "Read Less" : "Read More"}
              </button>
            </div>

            <div className="w-full max-w-[805px] flex flex-col items-center mb-2 md:mb-4">
              <button
                className="w-full flex items-center justify-between bg-transparent border-none p-0 cursor-pointer"
                onClick={toggleShippingDetails}
              >
                <span className="text-2xl font-bold md:text-3xl">
                  Shipping Details
                </span>
                <CaretDownIcon
                  size={32}
                  className={`transition-transform duration-300 w-8 h-8 md:w-10 md:h-10 ${
                    showShippingDetails ? "rotate-180" : ""
                  }`}
                />
              </button>
              <AnimatePresence mode="wait">
                {showShippingDetails && (
                  <motion.p
                    key="shipping"
                    variants={contentVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    transition={{ duration: 0.3 }}
                    className="w-full text-left text-base font-normal text-[#272727] md:text-lg"
                  >
                    Shipping is about $5. However, if you&apos;re attending the
                    Worship Night on April 26th, you can opt for free pickup at
                    the event!
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            <div className="w-full max-w-[805px] flex flex-col items-center">
              <button
                className="w-full flex items-center justify-between bg-transparent border-none p-0 cursor-pointer"
                onClick={toggleCareDetails}
              >
                <span className="text-2xl font-bold md:text-3xl">Care</span>
                <CaretDownIcon
                  size={32}
                  className={`transition-transform duration-300 w-8 h-8 md:w-10 md:h-10 ${
                    showCareDetails ? "rotate-180" : ""
                  }`}
                />
              </button>
              <AnimatePresence mode="wait">
                {showCareDetails && (
                  <motion.p
                    key="care"
                    variants={contentVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    transition={{ duration: 0.3 }}
                    className="w-full text-left text-base font-normal text-[#272727] md:text-lg"
                  >
                    We recommend washing these garments in cold water with
                    like-colored garments, as some of the pigment dyes may stain
                    light or white-colored garments. Dry in low heat to prevent
                    excessive shrinkage.
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.div>
      <Footer />
    </>
  );
};

export default YHWHshirtpage;
