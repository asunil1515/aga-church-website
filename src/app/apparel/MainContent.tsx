"use client";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import Link from "next/link";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css/bundle";
import React, { memo } from "react";

interface MainContentProps {
  revealed: boolean;
}

const numberOfImages = 6;
const images = Array.from({ length: numberOfImages }, (_, index) => `/yhwh/YHWH-${index + 1}.jpg`);

const sectionClasses = "w-full px-4 py-16 min-h-screen bg-[#212124] text-white flex flex-col items-center justify-center text-left";
const swiperClasses = "w-full max-w-[950px] mt-10 mb-6 aspect-[4/3] rounded-lg flex justify-center overflow-hidden";
const tShirtButtonClasses = "t-shirt group relative bg-[#3d3d3d] text-[1.2rem] mb-12 font-bold rounded-[10px] cursor-pointer flex justify-center items-center h-96 w-[22rem] overflow-hidden p-0 transition-all duration-300 ease-in-out hover:bg-[#a0a0a0] hover:scale-[1.025] active:scale-100 border-0";
const pulseOverlayClasses = "pointer-events-none absolute left-1/2 top-1/2 w-[300%] h-[300%] bg-white/20 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 animate-pulse-wave transition-opacity duration-300 z-10";

const MainContent: React.FC<MainContentProps> = memo(({ revealed }) => {
  return (
    <motion.section
      className={sectionClasses}
      initial={{ opacity: 0, y: 80 }}
      animate={{
        opacity: revealed ? 1 : 0,
        y: revealed ? 0 : 80,
      }}
      transition={{
        opacity: { duration: 0.9, delay: 0.27 },
        y: { duration: 1, ease: [0.4, 0, 0.6, 1] },
      }}
    >
      <h2 className="max-w-[910px] font-heading text-[clamp(1.8rem,5vw,2.2rem)] font-bold mt-14 text-center">
        ONE SHIRT, TO GLORIFY ONE NAME.
      </h2>
      <p className="text-[clamp(0.95rem,2.5vw,1.8rem)] font-normal max-w-[1000px] text-center mt-4">
        THIS SHIRT IS MEANT TO SERVE AS A REMINDER THAT THE SAME GOD WHO
        REVEALED HIMSELF TO MOSES THROUGH A BURNING BUSH, CAN REVEAL HIMSELF
        TO OUR GENERATION TOO.
      </p>
      <Swiper
        modules={[Autoplay, Navigation]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 4100, disableOnInteraction: false }}
        navigation={true}
        className={swiperClasses}
      >
        {images.map((src, index) => (
          <SwiperSlide key={index} className="flex justify-center items-center w-full">
            <div className="relative w-full h-full flex justify-center items-center overflow-hidden rounded-lg">
              <Image
                src={src}
                alt={`YHWH Shirt Design ${index + 1}`}
                width={1200}
                height={800}
                className="w-full h-full object-contain rounded-[8px]"
                loading="lazy"
                quality={80}
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAb/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <h2 className="mb-7 max-w-[910px] font-heading text-[clamp(1.8rem,5vw,2.2rem)] font-bold mt-4 text-center">
        WEAR THE MESSAGE.
      </h2>
      <Link
        href="/YHWHtshirt"
        className={tShirtButtonClasses}
      >
        <span className={pulseOverlayClasses} />
        <Image
          src="/shirt1.png"
          alt="YHWH T-shirt"
          width={500}
          height={500}
          draggable={false}
          className="w-full h-full object-cover rounded-[10px] transition-transform duration-300 group-hover:scale-[1.02]"
          loading="lazy"
          quality={80}
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAb/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
        />
      </Link>
    </motion.section>
  );
});

MainContent.displayName = "MainContent";

export default MainContent;