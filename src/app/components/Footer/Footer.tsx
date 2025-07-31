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
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <footer
      className="relative z-0 bg-gradient-to-b from-[#141414] via-[#080808] to-[#000000] overflow-hidden"
      role="contentinfo"
    >
      {/* Enhanced Background Effects - Desktop only */}
      <div
        className="hidden md:block absolute inset-0 pointer-events-none"
        aria-hidden="true"
      >
        <motion.div
          className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-white/[0.02] rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"
          animate={{ scale: [1, 1.2, 1], opacity: [0.02, 0.03, 0.02] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-white/[0.02] rounded-full blur-3xl translate-x-1/2 translate-y-1/2"
          animate={{ scale: [1, 1.2, 1], opacity: [0.02, 0.03, 0.02] }}
          transition={{
            duration: 8,
            delay: 1,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Grid pattern overlay - Desktop only */}
      <div
        className="hidden md:block absolute inset-0 opacity-[0.02] pointer-events-none"
        aria-hidden="true"
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.02) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="relative z-10 py-16 md:py-24 lg:py-32 px-4">
        <div className="max-w-6xl mx-auto md:px-4 lg:px-8">
          <div className="flex flex-col items-center">
            {/* Links Section with constrained width on mobile but ensured centering */}
            <motion.nav
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-12 w-full"
              aria-label="Footer links"
            >
              <div className="flex justify-center w-full">
                <ul className="flex flex-wrap justify-center gap-4 md:gap-8 lg:gap-12 max-w-[280px] sm:max-w-[320px] md:max-w-full">
                  {footerLinks.map((link, index) => {
                    const key = `${link.href}-${link.label}`;
                    const isHovered = hovered === `link-${key}`;
                    return (
                      <motion.li
                        key={key}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.05 }}
                        viewport={{ once: true }}
                      >
                        <Link
                          href={link.href}
                          className="relative text-sm md:text-base font-medium text-gray-400 hover:text-white transition-all duration-300 group"
                          onMouseEnter={() => setHovered(`link-${key}`)}
                          onMouseLeave={() => setHovered(null)}
                        >
                          <span className="relative z-10">{link.label}</span>
                          <motion.div
                            className="absolute inset-0 bg-white/[0.03] rounded"
                            initial={false}
                            animate={{
                              opacity: isHovered ? 1 : 0,
                              scale: isHovered ? 1 : 0.8,
                            }}
                            transition={{ duration: 0.2 }}
                          />
                          <motion.div
                            className="absolute -right-2 top-0 w-1 h-1 bg-white rounded-full"
                            initial={false}
                            animate={{
                              opacity: isHovered ? 0.6 : 0,
                              scale: isHovered ? 1 : 0,
                            }}
                            transition={{ duration: 0.3 }}
                          />
                        </Link>
                      </motion.li>
                    );
                  })}
                </ul>
              </div>
            </motion.nav>

            {/* Divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="relative w-full max-w-3xl h-px mb-12 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-600 to-transparent" />
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

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="flex gap-6 mb-12"
            >
              {socialLinks.map((social, idx) => {
                const key = `${social.href}-${social.label}`;
                const isHovered = hovered === `social-${key}`;
                return (
                  <motion.a
                    key={key}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 + idx * 0.1 }}
                    viewport={{ once: true }}
                    onMouseEnter={() => setHovered(`social-${key}`)}
                    onMouseLeave={() => setHovered(null)}
                    aria-label={social.label}
                  >
                    <div className="relative p-3 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-sm transition-all duration-300 group-hover:bg-white/[0.08] group-hover:border-white/30 group-hover:shadow-lg group-hover:shadow-white/5">
                      <social.icon className="w-5 h-5 md:w-6 md:h-6 text-gray-400 transition-all duration-300 group-hover:text-white" />
                      <div className="absolute inset-0 rounded-full bg-white/5 scale-0 transition-transform duration-300 group-hover:scale-100" />
                      <div className="absolute inset-0 rounded-full bg-white/10 scale-0 transition-transform duration-500 group-hover:scale-150 opacity-0 group-hover:opacity-100" />
                    </div>
                    <motion.div
                      className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-white/10 backdrop-blur-md rounded text-xs text-white whitespace-nowrap pointer-events-none"
                      initial={false}
                      animate={{
                        opacity: isHovered ? 1 : 0,
                        y: isHovered ? 0 : 10,
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      {social.label}
                    </motion.div>
                  </motion.a>
                );
              })}
            </motion.div>

            {/* Copyright */}
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
          animate={{ x: [-500, 500] }}
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
