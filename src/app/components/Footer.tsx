"use client";

import Link from "next/link";
import React, { useState } from "react";
import { AiOutlineYoutube } from "react-icons/ai";
import { BsInstagram } from "react-icons/bs";
import { motion } from "framer-motion";

const footerLinks = [
  { href: "/", label: "HOME" },
  { href: "/#about", label: "ABOUT" },
  { href: "/#sermons", label: "SERMONS" },
  { href: "/beliefs", label: "BELIEFS" },
  { href: "/donate", label: "DONATE" },
  { href: "/#visit", label: "VISIT" },
];

const socialLinks = [
  {
    href: "https://www.youtube.com/@amazinggraceassembly",
    icon: AiOutlineYoutube,
    label: "YouTube",
  },
  {
    href: "https://www.instagram.com/amazinggraceig/",
    icon: BsInstagram,
    label: "Instagram",
  },
];

export const Footer = () => {
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  return (
    <footer className="relative bg-gradient-to-b from-[#141414] via-[#080808] to-[#000000] overflow-hidden">
      {/* Enhanced Background Effects - Desktop only */}
      <div className="hidden md:block absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-white/[0.02] rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.02, 0.03, 0.02],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-white/[0.02] rounded-full blur-3xl translate-x-1/2 translate-y-1/2"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.02, 0.03, 0.02],
          }}
          transition={{
            duration: 8,
            delay: 1,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Grid pattern overlay - Desktop only */}
      <div className="hidden md:block absolute inset-0 opacity-[0.02] pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.02) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Updated container to match Visit component's structure */}
      <div className="relative z-10 py-16 md:py-24 lg:py-32 px-4">
        <div className="max-w-6xl mx-auto md:px-4 lg:px-8">
          <div className="flex flex-col items-center">
            {/* Links Section with different hover effect */}
            <motion.nav
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <ul className="flex flex-wrap justify-center gap-4 md:gap-8 lg:gap-12">
                {footerLinks.map((link, index) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    viewport={{ once: true }}
                  >
                    <Link
                      href={link.href}
                      className="relative text-sm md:text-base font-medium text-gray-400 hover:text-white transition-all duration-300 group"
                      onMouseEnter={() => setHoveredLink(link.label)}
                      onMouseLeave={() => setHoveredLink(null)}
                    >
                      <span className="relative z-10">{link.label}</span>
                      {/* Fade in background on hover */}
                      <motion.div
                        className="absolute inset-0 bg-white/[0.03] rounded"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{
                          opacity: hoveredLink === link.label ? 1 : 0,
                          scale: hoveredLink === link.label ? 1 : 0.8,
                        }}
                        transition={{ duration: 0.2 }}
                      />
                      {/* Dot accent */}
                      <motion.div
                        className="absolute -right-2 top-0 w-1 h-1 bg-white rounded-full"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{
                          opacity: hoveredLink === link.label ? 0.6 : 0,
                          scale: hoveredLink === link.label ? 1 : 0,
                        }}
                        transition={{ duration: 0.3 }}
                      />
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.nav>

            {/* Enhanced Divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="relative w-full max-w-3xl h-px mb-12 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-600 to-transparent" />
              {/* Animated shine effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{
                  x: [-200, 200],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatDelay: 3,
                  ease: "easeInOut",
                }}
              />
            </motion.div>

            {/* Enhanced Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="flex gap-6 mb-12"
            >
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  viewport={{ once: true }}
                  onMouseEnter={() => setHoveredSocial(social.label)}
                  onMouseLeave={() => setHoveredSocial(null)}
                  aria-label={social.label}
                >
                  <div className="relative p-3 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-sm transition-all duration-300 group-hover:bg-white/[0.08] group-hover:border-white/30 group-hover:shadow-lg group-hover:shadow-white/5">
                    <social.icon className="w-5 h-5 md:w-6 md:h-6 text-gray-400 transition-all duration-300 group-hover:text-white" />
                    {/* Multi-layer hover effect */}
                    <div className="absolute inset-0 rounded-full bg-white/5 scale-0 transition-transform duration-300 group-hover:scale-100" />
                    <div className="absolute inset-0 rounded-full bg-white/10 scale-0 transition-transform duration-500 group-hover:scale-150 opacity-0 group-hover:opacity-100" />
                  </div>
                  {/* Floating label */}
                  <motion.div
                    className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-white/10 backdrop-blur-md rounded text-xs text-white whitespace-nowrap pointer-events-none"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{
                      opacity: hoveredSocial === social.label ? 1 : 0,
                      y: hoveredSocial === social.label ? 0 : 10,
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    {social.label}
                  </motion.div>
                </motion.a>
              ))}
            </motion.div>

            {/* Enhanced Copyright */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              className="text-center space-y-2"
            >
              <motion.p
                className="text-sm text-gray-500"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                © {new Date().getFullYear()} Amazing Grace Assembly
              </motion.p>
              <p className="text-xs text-gray-600">All rights reserved</p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Enhanced bottom border */}
      <div className="relative h-px overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
          animate={{
            x: [-500, 500],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{ filter: "blur(1px)" }}
        />
      </div>
    </footer>
  );
};
