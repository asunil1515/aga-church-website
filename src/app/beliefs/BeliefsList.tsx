import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion"; // Removed useReducedMotion import
import { beliefs } from "./Beliefs-data";
import { AnimatedIcons } from "./Beliefs-icons";

interface BeliefsListProps {
  expandedBelief: string | null;
  onExpandBelief: (id: string | null) => void;
  onBackToOverview: () => void;
}

export const BeliefsList: React.FC<BeliefsListProps> = ({
  expandedBelief,
  onExpandBelief,
  onBackToOverview,
}) => {
  const [contentHeights, setContentHeights] = useState<{
    [key: string]: number;
  }>({});

  // Use type assertion to bypass strict null checking
  const contentRefs = useRef<React.RefObject<HTMLDivElement>[]>(
    Array.from({ length: beliefs.length }, () =>
      React.createRef()
    ) as React.RefObject<HTMLDivElement>[]
  );

  // Calculate heights of content for each belief item on mount or when expandedBelief changes
  useEffect(() => {
    const newHeights: { [key: string]: number } = {};
    beliefs.forEach((belief, index) => {
      const ref = contentRefs.current[index];
      if (ref.current) {
        newHeights[belief.id] = ref.current.scrollHeight;
      }
    });
    setContentHeights(newHeights);
    // Debug log to verify heights (remove after testing)
    console.log("Calculated Content Heights:", newHeights);
  }, [expandedBelief]); // Recalculate when expandedBelief changes to ensure accuracy

  return (
    <motion.section
      key="beliefs"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="w-full"
      aria-label="Beliefs"
    >
      {/* Page Header */}
      <motion.header
        className="text-center mt-12 mb-10 md:mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        aria-label="Beliefs Introduction"
      >
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4">
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500">
            OUR BELIEFS.
          </span>
        </h1>
        <p className="text-sm md:text-base text-gray-400">
          Explore the heart of our faith, shaped by God&apos;s Word.
        </p>
      </motion.header>

      {/* Beliefs Card List */}
      <ul
        className="max-w-3xl space-y-4 md:space-y-6 mx-auto"
        aria-label="List of Beliefs"
      >
        {beliefs.map((belief, index) => {
          const Icon = AnimatedIcons[belief.id as keyof typeof AnimatedIcons];
          const isActive = expandedBelief === belief.id;
          const contentHeight = contentHeights[belief.id] || 0;

          return (
            <motion.li
              key={belief.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: "easeOut",
              }}
            >
              <div
                className={`relative overflow-hidden rounded-2xl border backdrop-blur-xl transition-all duration-500 ${
                  isActive
                    ? "bg-white/[0.08] border-white/30"
                    : "bg-white/[0.03] border-white/10 hover:border-white/20"
                }`}
              >
                <button
                  onClick={() => onExpandBelief(isActive ? null : belief.id)}
                  className="w-full p-6 md:p-10 text-left"
                  aria-expanded={isActive}
                  aria-controls={`belief-panel-${belief.id}`}
                  aria-label={
                    isActive
                      ? `Hide details for ${belief.title}`
                      : `Show details for ${belief.title}`
                  }
                >
                  <div className="flex items-center gap-4 h-full">
                    <span
                      className="flex items-center justify-center h-full w-12"
                      aria-hidden="true"
                    >
                      <Icon active={isActive} />
                    </span>
                    <div className="flex-1">
                      <h2 className="text-xl md:text-2xl font-bold text-white mb-2">
                        {belief.title}
                      </h2>
                      <p className="text-sm md:text-base text-gray-400">
                        {belief.preview}
                      </p>
                    </div>
                    <motion.div
                      className="text-white/40 text-2xl flex items-center"
                      animate={{
                        rotate: isActive ? 45 : 0,
                      }}
                      transition={{ duration: 0.2 }}
                      aria-hidden="true"
                    >
                      +
                    </motion.div>
                  </div>
                </button>

                <AnimatePresence mode="wait">
                  {isActive && (
                    <motion.section
                      id={`belief-panel-${belief.id}`}
                      variants={{
                        hidden: {
                          maxHeight: 0,
                          opacity: 0,
                          overflow: "hidden",
                        },
                        visible: {
                          maxHeight: contentHeight * 1.5,
                          opacity: 1,
                          transition: { duration: 0.5, ease: "easeOut" },
                        }, // Expansion 
                        exit: {
                          maxHeight: 0,
                          opacity: 0,
                          transition: { duration: 0.35, ease: "easeOut" },
                        }, // Minimization 
                      }}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="overflow-hidden"
                      aria-live="polite"
                      tabIndex={-1}
                    >
                      <div
                        ref={contentRefs.current[index]}
                        className="px-6 md:px-8 pb-6 md:pb-8"
                      >
                        <div className="pl-16 md:ml-2 pt-2 border-t border-white/10">
                          <p className="leading-normal text-sm md:text-base md:leading-relaxed text-gray-300 pt-6">
                            {belief.text}
                          </p>
                        </div>
                      </div>
                    </motion.section>
                  )}
                </AnimatePresence>

                {/* Animated Line at Bottom */}
                <motion.div
                  className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-white/50 to-white/20"
                  initial={{ width: "0%" }}
                  animate={{
                    width: isActive ? "100%" : "0%",
                  }}
                  transition={{ duration: 0.3 }}
                  aria-hidden="true"
                />
              </div>
            </motion.li>
          );
        })}
      </ul>

      {/* Back to Top Button */}
      <motion.div
        className="text-center mt-10 md:mt-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <button
          onClick={onBackToOverview}
          className="text-gray-500 hover:text-gray-400 text-sm transition-colors duration-300"
          aria-label="Back to Overview"
        >
          ← Back to overview
        </button>
      </motion.div>

      {/* Scripture Quote */}
      <motion.footer
        className="text-center mt-8 md:mt-10 md:mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
        aria-label="Scripture Quote"
      >
        <div className="flex items-center justify-center gap-3 max-w-xs mx-auto">
          <div className="w-12 h-px bg-gradient-to-r from-transparent to-gray-700/50" />
          <div className="flex-shrink-0">
            <p className="text-xs md:text-sm text-gray-400/70 italic">
              &ldquo;All Scripture is God-breathed&rdquo;
            </p>
            <p className="text-[10px] md:text-xs text-gray-500/70 mt-1">
              2 Timothy 3:16
            </p>
          </div>
          <div className="w-12 h-px bg-gradient-to-l from-transparent to-gray-700/50" />
        </div>
      </motion.footer>
    </motion.section>
  );
};
