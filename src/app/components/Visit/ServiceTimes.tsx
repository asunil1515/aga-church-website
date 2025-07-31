"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

export interface ServiceTime {
  day: string;
  time: string;
}

export interface ServiceTimesProps {
  services: ServiceTime[];
  expanded: boolean;
  onToggle: () => void;
}

const ServiceTimes: React.FC<ServiceTimesProps> = React.memo(
  ({ services, expanded, onToggle }) => {
    return (
      <motion.section
        className="relative"
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
        viewport={{ once: true }}
        aria-labelledby="service-times-title"
      >
        <div className="relative bg-white/[0.03] backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-white/10">
          <div
            className="absolute -bottom-32 -left-32 w-64 h-64 bg-white/[0.02] rounded-full opacity-50 hidden lg:block pointer-events-none"
            aria-hidden="true"
          />
          {/* Collapsible button */}
          <button
            onClick={onToggle}
            className="relative w-full p-6 md:p-8 flex justify-between items-center text-left hover:bg-white/[0.01] transition-colors z-10"
            type="button"
            aria-expanded={expanded}
            aria-controls="service-times-section"
            aria-label={
              expanded
                ? "Hide service times details"
                : "Show service times details"
            }
          >
            <h2
              id="service-times-title"
              className="text-xl md:text-2xl font-bold text-white mb-0"
            >
              SERVICE TIMES
              <div className="h-0.5 w-16 bg-gray-600 mt-2" />
            </h2>
            <motion.div
              animate={{ rotate: expanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown
                className="w-6 h-6 text-gray-400"
                aria-hidden="true"
              />
            </motion.div>
          </button>
          <AnimatePresence initial={false}>
            {expanded && (
              <motion.div
                id="service-times-section"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                role="region"
                aria-labelledby="service-times-title"
              >
                <div className="px-6 md:px-8 pb-6 sm:pb-[9.35rem] min-[1101px]:pb-[7.8rem]">
                  <p className="text-sm md:text-base text-gray-400 leading-relaxed mb-6">
                    Join us for worship and fellowship throughout the week. All
                    are welcome!
                  </p>
                  <ul className="space-y-3 text-sm md:text-base">
                    {services.map((service, index) => (
                      <motion.li
                        key={service.day}
                        className="bg-white/[0.02] rounded-lg p-4 border border-white/5 hover:bg-white/[0.05] transition-all duration-300"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-semibold text-white text-xs md:text-base">
                            {service.day}
                          </span>
                          <span className="text-xs text-gray-300 bg-white/5 px-3 py-1 rounded-full">
                            {service.time}
                          </span>
                        </div>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.section>
    );
  }
);

ServiceTimes.displayName = "ServiceTimes";

export default ServiceTimes;
