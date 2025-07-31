"use client";
import { motion, AnimatePresence } from "framer-motion";

export const LoadingScreen = ({ show = true }: { show?: boolean }) => (
  <AnimatePresence>
    {show && (
      <motion.div
        key="loading"
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, pointerEvents: "none" }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        style={{ zIndex: 50 }}
        className="fixed inset-0 flex items-center justify-center bg-neutral-950 text-white"
        aria-label="Loading content"
        aria-busy="true"
      >
        <motion.div
          className="flex flex-col items-center gap-2"
          initial={{ scale: 0.98, opacity: 0.7 }}
          animate={{
            scale: [0.98, 1.03, 0.98],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            repeat: Infinity,
            duration: 1.4,
            ease: "easeInOut",
          }}
        >
          <motion.svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            aria-hidden="true"
            className="mb-1"
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 1,
            }}
          >
            <circle
              cx="24"
              cy="24"
              r="20"
              stroke="currentColor"
              strokeWidth="4"
              opacity={0.12}
            />
            <path
              d="M44 24a20 20 0 0 0-20-20"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </motion.svg>
          <span className="text-xs uppercase tracking-widest text-gray-400">Loading</span>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);