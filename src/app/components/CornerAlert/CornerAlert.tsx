"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";

interface ChurchAlertProps {
  onClose?: () => void;
}

export default function ChurchAlert({ onClose }: ChurchAlertProps) {
  const [showAlert, setShowAlert] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const alertRef = useRef<HTMLDivElement>(null);

  // Calculate hero threshold once, for client-side
  const heroThreshold =
    typeof window !== "undefined" ? window.innerHeight * 0.025 : 100;

  // Only run this effect client-side
  useEffect(() => {
    if (typeof window !== "undefined") {
      const alertClosed = localStorage.getItem("churchAlertClosed");
      if (!alertClosed) setShowAlert(true);
    }
  }, []);

  // Scroll handler
  const handleScroll = useCallback(() => {
    const scrolledPastHero = window.scrollY > heroThreshold;
    if (!isExpanded) setPastHero(scrolledPastHero);
  }, [isExpanded, heroThreshold]);

  useEffect(() => {
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", throttledScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", throttledScroll);
  }, [handleScroll]);

  // If expanded, always considered 'past hero'
  useEffect(() => {
    if (isExpanded) setPastHero(true);
  }, [isExpanded]);

  // Click outside handler for overlay
  useEffect(() => {
    if (!isExpanded) return;
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (
        alertRef.current &&
        !alertRef.current.contains(event.target as Node)
      ) {
        setIsExpanded(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside, {
      passive: true,
    });
    document.addEventListener("touchstart", handleClickOutside, {
      passive: true,
    });
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isExpanded]);

  const handleExpand = useCallback(() => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 170); // animation duration
    setIsExpanded((val) => !val);
  }, []);

  const handleDismiss = useCallback(() => {
    setShowAlert(false);
    setIsExpanded(false);
    if (typeof window !== "undefined") {
      localStorage.setItem("churchAlertClosed", "true");
    }
    onClose?.();
  }, [onClose]);

  // Class Strings
  const containerClasses =
    "fixed bottom-4 right-4 md:bottom-6 md:right-6 z-20 transition-all duration-500 ease-out transform " +
    (showAlert && pastHero
      ? "translate-y-0 opacity-100 scale-100"
      : "translate-y-8 opacity-0 scale-75 pointer-events-none");

  const buttonClasses =
    "bg-zinc-950 hover:bg-black text-white rounded-xl p-2.5 md:p-3.5 shadow-2xl hover:shadow-3xl transition-all duration-300 relative border border-gray-800 transform " +
    (isClicked
      ? "scale-95 rotate-12 bg-black shadow-inner"
      : "scale-100 rotate-0 hover:scale-105");

  const expandedClasses =
    "absolute bottom-16 md:bottom-20 right-0 w-72 md:w-80 transition-all duration-300 ease-out transform origin-bottom-right " +
    (isExpanded
      ? "translate-y-0 opacity-100 scale-100 pointer-events-auto"
      : "translate-y-4 opacity-0 scale-95 pointer-events-none");

  if (!showAlert) return null;

  return (
    <div
      className={containerClasses}
      ref={alertRef}
      tabIndex={-1}
      role="alert"
      aria-live="polite"
      aria-atomic="true"
    >
      <div className="relative">
        <button
          onClick={handleExpand}
          className={buttonClasses}
          aria-label={
            isExpanded ? "Collapse service update" : "View service update"
          }
          aria-expanded={isExpanded}
          type="button"
        >
          {isClicked && (
            <div
              className="absolute inset-0 rounded-xl bg-white opacity-20 animate-ping"
              aria-hidden="true"
            ></div>
          )}
          <svg
            width="18"
            height="18"
            className="md:w-[22px] md:h-[22px]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            focusable="false"
          >
            <path
              d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
              className={`transition-all duration-300 ${
                isExpanded
                  ? "stroke-2 drop-shadow-sm"
                  : isClicked
                  ? "stroke-[3px]"
                  : "stroke-1.5"
              }`}
            />
            <polyline
              points="9,22 9,12 15,12 15,22"
              className={`transition-all duration-300 ${
                isExpanded
                  ? "stroke-2 drop-shadow-sm transform rotate-180"
                  : isClicked
                  ? "stroke-[3px] transform scale-110"
                  : "stroke-1.5"
              }`}
            />
          </svg>

          {!isExpanded && (
            <span
              className={`absolute -top-1 -right-1 bg-white text-gray-900 text-sm md:text-base rounded-full h-5 w-5 md:h-6 md:w-6 flex items-center justify-center font-bold border-2 border-zinc-950 shadow-lg transition-all duration-300 ${
                isClicked ? "scale-150 bg-gray-200 border-black" : ""
              }`}
              style={{
                animation: "gentle-pulse 1.5s ease-in-out infinite",
                textShadow: "0 1px 2px rgba(0,0,0,0.1)",
              }}
              aria-hidden="true"
            >
              !
            </span>
          )}
        </button>

        <div className={expandedClasses} aria-hidden={!isExpanded}>
          <div className="bg-white rounded-xl md:rounded-2xl shadow-2xl border-l-4 border-gray-900 p-4 md:p-5 backdrop-blur-sm border border-gray-200">
            <div className="flex items-start gap-3 md:gap-4 mb-3 md:mb-4">
              <div
                className="text-gray-900 mt-1 flex-shrink-0 bg-gray-100 rounded-lg p-1.5 md:p-2"
                aria-hidden="true"
              >
                <svg
                  width="16"
                  height="16"
                  className="md:w-[18px] md:h-[18px]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  focusable="false"
                >
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9,22 9,12 15,12 15,22" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm md:text-base font-bold text-gray-900 mb-1.5 md:mb-2 tracking-tight">
                  Service Update
                </h3>
                <p className="text-xs md:text-sm text-gray-700 leading-relaxed font-medium">
                  We&apos;re temporarily holding cottage meetings in place of
                  our regular Sunday service.{" "}
                  <Link
                    href="/#visit"
                    className="text-gray-900 hover:text-black font-semibold underline decoration-2 underline-offset-2 hover:decoration-gray-400 transition-all duration-300"
                  >
                    Contact us
                  </Link>{" "}
                  for location details.
                </p>
              </div>
            </div>
            <div className="flex gap-2 md:gap-3 pt-2 md:pt-3 border-t border-gray-200">
              <button
                onClick={handleExpand}
                className="flex-1 px-3 md:px-4 py-2 md:py-2.5 text-xs md:text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-300 font-medium border border-gray-300 hover:border-gray-400 active:scale-95"
                type="button"
              >
                Got it
              </button>
              <button
                onClick={handleDismiss}
                className="flex-1 px-3 md:px-4 py-2 md:py-2.5 text-xs md:text-sm font-medium bg-gray-900 hover:bg-black text-white rounded-lg transition-all duration-300 active:scale-95"
                type="button"
              >
                Hide
              </button>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes gentle-pulse {
          0%,
          100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.9;
            transform: scale(1.11);
          }
        }
      `}</style>
    </div>
  );
}
