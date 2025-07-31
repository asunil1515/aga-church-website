"use client";

import React, { useMemo, useState, useCallback } from "react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, X, Download, Copy } from "lucide-react";
import Image from "next/image";

// ---- Helpers ----
export type EventType = {
  title: string;
  date: string;
  dateEnd?: string;
  time: string;
  desc: string;
  link: string;
};

function displayEventDate(event: EventType): string {
  if (event.dateEnd) {
    const start = new Date(event.date + "T12:00:00");
    const end = new Date(event.dateEnd + "T12:00:00");
    return `${start.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
    })} - ${end.getDate()}`;
  }
  const dateObj = new Date(event.date + "T12:00:00");
  return dateObj.toLocaleString("en-US", { month: "short", day: "numeric" });
}

function isEventPast(event: EventType, buffer = 7): boolean {
  const end = event.dateEnd
    ? new Date(event.dateEnd + "T23:59:59")
    : new Date(event.date + "T23:59:59");
  end.setDate(end.getDate() + buffer);
  return end < new Date();
}

// ---- Component ----
export interface UpcomingEventsProps {
  events: EventType[];
  expanded: boolean;
  onToggle: () => void;
  bufferDays?: number;
}

const UPCOMING_BUFFER_DAYS = 7;

// Detect if full image copy is supported
function canCopyImage() {
  if (typeof window === "undefined") return false;
  return (
    !!navigator.clipboard &&
    typeof window.ClipboardItem !== "undefined" &&
    typeof navigator.clipboard.write === "function"
  );
}

export default function UpcomingEvents({
  events,
  expanded,
  onToggle,
  bufferDays = UPCOMING_BUFFER_DAYS,
}: UpcomingEventsProps) {
  const [flyerSrc, setFlyerSrc] = useState<string | null>(null);
  const [flyerLoaded, setFlyerLoaded] = useState(false);

  const visibleEvents = useMemo(
    () =>
      events.filter(
        (e) =>
          !isEventPast(e, 0) ||
          (isEventPast(e, 0) && !isEventPast(e, bufferDays))
      ),
    [events, bufferDays]
  );

  // --- Download and Copy ---
  const handleDownload = useCallback(() => {
    if (!flyerSrc) return;
    const link = document.createElement("a");
    link.href = flyerSrc;
    link.download = flyerSrc.split("/").pop() || "flyer.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Download started");
  }, [flyerSrc]);

  const handleCopy = useCallback(async () => {
    if (!flyerSrc) return;

    if (canCopyImage()) {
      try {
        const blob = await fetch(flyerSrc).then((r) => r.blob());
        await navigator.clipboard.write([
          new window.ClipboardItem({ [blob.type]: blob }),
        ]);
        toast.success("Image copied to clipboard!"); // success
        return;
      } catch {}
    }

    // Fallback: Copy image URL as text
    try {
      await navigator.clipboard.writeText(flyerSrc);
      toast.success("Image URL copied."); // <-- success
    } catch {
      toast.error(
        "Copy failed. Use a modern desktop browser for image clipboard use."
      ); // <-- use .error for red X
    }
  }, [flyerSrc]);

  // --- Modal Keydown (ESC to close) ---
  React.useEffect(() => {
    if (!flyerSrc) return;
    const esc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setFlyerSrc(null);
        setFlyerLoaded(false);
      }
    };
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [flyerSrc]);

  // --- Memoize copy support to avoid SSR hydration mismatch ---
  const [clipboardSupport, setClipboardSupport] =
    React.useState<boolean>(false);
  React.useEffect(() => {
    setClipboardSupport(canCopyImage());
  }, []);

  return (
    <motion.section
      className="relative mt-8 lg:mt-12"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      viewport={{ once: true }}
      aria-labelledby="upcoming-events-title"
    >
      <div className="relative bg-white/[0.03] backdrop-blur-sm rounded-2xl shadow-xl transition-all overflow-hidden border border-white/10">
        <button
          onClick={onToggle}
          className="relative w-full p-6 md:p-8 flex justify-between items-center text-left hover:bg-white/[0.01] transition-colors z-10"
          type="button"
          aria-expanded={expanded}
          aria-controls="upcoming-events-section"
          aria-label={
            expanded ? "Hide upcoming events list" : "Show upcoming events list"
          }
        >
          <h2
            id="upcoming-events-title"
            className="text-xl md:text-2xl font-bold text-white mb-0"
          >
            UPCOMING EVENTS
            <div className="h-0.5 w-16 bg-gray-600 mt-2" />
          </h2>
          <motion.div
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown className="w-6 h-6 text-gray-400" aria-hidden="true" />
          </motion.div>
        </button>
        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              id="upcoming-events-section"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              role="region"
              aria-labelledby="upcoming-events-title"
            >
              <div className="px-6 md:px-8 pb-6 md:pb-8">
                {visibleEvents.length === 0 ? (
                  <div className="text-gray-400 mb-6">No upcoming events.</div>
                ) : (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {visibleEvents.map((event, index) => {
                      const isPast = isEventPast(event, 0);
                      return (
                        <motion.div
                          key={event.title + event.date}
                          className={
                            "bg-white/[0.02] rounded-lg p-5 border border-white/5 relative overflow-hidden group hover:bg-white/[0.05] transition-all duration-300" +
                            (isPast ? " opacity-60" : "")
                          }
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            duration: 0.3,
                            delay: index * 0.1,
                            ease: "easeOut",
                          }}
                        >
                          <div
                            className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-white/20 to-transparent"
                            aria-hidden="true"
                          />
                          <div className="flex items-center justify-between mb-3">
                            <span
                              className={
                                "font-semibold text-white" +
                                (isPast
                                  ? " line-through decoration-2 decoration-gray-300"
                                  : "")
                              }
                            >
                              {event.title}
                            </span>
                            <span className="text-xs bg-white text-black px-2 py-1 rounded-full font-medium">
                              {displayEventDate(event)}
                            </span>
                          </div>
                          <p className="text-xs text-gray-400 mb-2">
                            {event.time}
                          </p>
                          <p className="text-sm text-gray-300 mb-3 leading-relaxed">
                            {event.desc}
                          </p>
                          {event.link && (
                            <button
                              type="button"
                              onClick={() => {
                                setFlyerLoaded(false);
                                setFlyerSrc(event.link);
                              }}
                              className="text-sm text-white hover:text-gray-300 transition-colors inline-flex items-center gap-1 group"
                              aria-label={`View flyer for ${event.title}`}
                            >
                              View Details
                              <ChevronDown
                                className="w-3 h-3 -rotate-90 group-hover:translate-x-0.5 transition-transform"
                                aria-hidden="true"
                              />
                            </button>
                          )}
                        </motion.div>
                      );
                    })}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {/* Modal for Flyer */}
      <AnimatePresence>
        {flyerSrc && (
          <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            aria-modal="true"
            role="dialog"
            aria-label="Event Flyer"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setFlyerSrc(null);
                setFlyerLoaded(false);
              }
            }}
          >
            <div className="relative bg-neutral-950 border border-white/10 rounded-xl p-4 sm:p-5 shadow-xl flex flex-col items-center w-[96vw] max-w-xs sm:max-w-md md:max-w-xl lg:max-w-2xl mx-2">
              {/* Close Button */}
              <button
                className="absolute top-1 right-1 z-10 rounded-full p-2 bg-black/70 border border-white/10 hover:bg-[#1e1e1e]/50 active:bg-white/20 hover:border-white/30 shadow-md hover:shadow-white/10 backdrop-blur-sm outline-none focus-visible:ring-2 focus-visible:ring-white/50 transition duration-200 group active:scale-95"
                aria-label="Close flyer modal"
                type="button"
                onClick={() => {
                  setFlyerSrc(null);
                  setFlyerLoaded(false);
                }}
              >
                <X className="size-4 md:size-5 text-white group-hover:text-gray-200 transition-colors duration-200 drop-shadow" />
              </button>
              {/* Flyer Content */}
              <div className="relative flex items-center justify-center mb-3 min-h-[300px] w-full">
                {!flyerLoaded && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.7 }}
                    className="absolute left-0 top-0 w-full h-full flex items-center justify-center"
                  >
                    <div className="w-16 h-16 flex items-center justify-center">
                      <div className="w-10 h-10 border-4 border-white/60 border-dashed rounded-full animate-spin" />
                    </div>
                  </motion.div>
                )}
                <Image
                  src={flyerSrc || ""}
                  alt="Event Flyer"
                  onLoad={() => setFlyerLoaded(true)}
                  className="shadow-lg rounded-lg border border-white/10 max-w-full max-h-[60vh] mx-auto block"
                  style={{
                    objectFit: "fill",
                    opacity: flyerLoaded ? 1 : 0,
                    transition: "opacity 0.35s",
                  }}
                  draggable={false}
                  width={800}
                  height={600}
                  unoptimized
                />
              </div>
              {/* Action Buttons */}
              <div className="hidden sm:flex gap-2 w-fit mx-auto mt-2 mb-1 z-10 relative">
                <button
                  type="button"
                  aria-label="Download Flyer"
                  className="group rounded-full transition border border-white/10 bg-black/40 hover:bg-white/10 active:bg-white/20 hover:border-white/30 shadow-md hover:shadow-white/10 backdrop-blur-sm outline-none focus-visible:ring-2 focus-visible:ring-white/50 p-2 sm:p-3 active:scale-95 duration-200"
                  onClick={handleDownload}
                >
                  <Download className="size-4 md:size-5 text-white group-hover:text-gray-200 transition-colors duration-200 drop-shadow" />
                </button>
                <button
                  type="button"
                  aria-label={
                    clipboardSupport
                      ? "Copy Flyer (image)"
                      : "Copy Flyer (URL only: image copy not supported on this device)"
                  }
                  className="group rounded-full transition border border-white/10 bg-black/40 hover:bg-white/10 active:bg-white/20 hover:border-white/30 shadow-md hover:shadow-white/10 backdrop-blur-sm outline-none focus-visible:ring-2 focus-visible:ring-white/50 p-2 sm:p-3 active:scale-95 duration-200"
                  onClick={handleCopy}
                  // Optional: disable if even copying text is not supported (rare)
                  disabled={
                    typeof window === "undefined" ||
                    typeof navigator.clipboard === "undefined"
                  }
                >
                  <Copy className="size-4 md:size-5 text-white group-hover:text-gray-200 transition-colors duration-200 drop-shadow" />
                </button>
              </div>
              {/* Optional mobile hint */}
              {!clipboardSupport && (
                <div className="text-xs text-gray-400 mt-2 text-center">
                  <span>
                    Note: Copying images is only supported in some desktop
                    browsers. On your device, the flyer URL will be copied
                    instead.
                  </span>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}
