import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoLogoVenmo } from "react-icons/io5";

interface VenmoOptionProps {
  expanded: boolean;
  onToggle: () => void;
}

export const VenmoOption: React.FC<VenmoOptionProps> = React.memo(
  ({ expanded, onToggle }) => {
    const [hover, setHover] = useState(false);

    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="group relative"
        aria-labelledby="venmo-section-title"
      >
        <div
          className={`relative overflow-hidden rounded-2xl border backdrop-blur-xl transition-all duration-500 ${
            expanded
              ? "bg-gray-200 text-black border-gray-200 shadow-2xl"
              : "bg-white/[0.03] hover:bg-white/[0.05] border-white/10 hover:border-white/20 shadow-xl"
          }`}
        >
          <button
            onClick={onToggle}
            className="w-full p-6 md:p-8 lg:p-10 text-left"
            aria-expanded={expanded}
            aria-controls="venmo-details"
            aria-label={expanded ? "Hide Venmo details" : "Show Venmo details"}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 md:gap-6">
                <motion.span
                  className={`transition-all duration-500 ${
                    expanded ? "text-black" : "text-white/60"
                  }`}
                  animate={{
                    rotate: expanded ? 360 : 0,
                  }}
                  transition={{ duration: 0.5 }}
                  aria-hidden="true"
                  title="Venmo logo"
                >
                  <IoLogoVenmo className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12" />
                </motion.span>
                <div>
                  <h3
                    id="venmo-section-title"
                    className={`text-xl md:text-2xl lg:text-3xl font-bold transition-colors duration-300 ${
                      expanded ? "text-black" : "text-white"
                    }`}
                  >
                    Venmo
                  </h3>
                  <p
                    className={`text-xs md:text-sm mt-1 transition-colors duration-300 ${
                      expanded ? "text-black/60" : "text-gray-400"
                    }`}
                  >
                    Quick digital payments – Secure, fast, and easy.
                  </p>
                </div>
              </div>
              <motion.span
                animate={{ rotate: expanded ? 45 : 0 }}
                transition={{ duration: 0.3 }}
                className={`text-xl md:text-2xl transition-colors duration-300 ${
                  expanded ? "text-black" : "text-white/40"
                }`}
                aria-hidden="true"
                title={expanded ? "Collapse" : "Expand"}
              >
                +
              </motion.span>
            </div>
          </button>
          {/* Venmo Details */}
          <AnimatePresence>
            {expanded && (
              <motion.div
                id="venmo-details"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="border-t border-black/10"
                aria-live="polite"
              >
                <div className="p-6 md:p-8 lg:p-10 pt-4 md:pt-6">
                  <a
                    href="https://account.venmo.com/u/Amazing-Grace-27"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 md:gap-3 bg-black text-white px-6 md:px-8 py-3 md:py-4 rounded-xl font-semibold hover:bg-black/90 transition-all duration-300 text-sm md:text-base"
                    aria-label="Donate via Venmo – secure, fast, and easy (opens in new tab)"
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}
                  >
                    <span>Open Venmo</span>
                    <motion.span
                      key={hover ? "venmo-hovered" : "venmo-bounce"}
                      animate={hover ? { x: 8 } : { x: [0, 4, 0] }}
                      transition={
                        hover
                          ? { duration: 0.3 }
                          : {
                              duration: 1.2,
                              repeat: Infinity,
                              repeatType: "loop",
                              ease: "easeInOut",
                            }
                      }
                      aria-hidden="true"
                      className="inline-block"
                      title="Arrow right"
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
    );
  }
);

VenmoOption.displayName = "VenmoOption";
