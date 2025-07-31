"use client";

import React, { useState, useCallback } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { MapPinIcon } from "@phosphor-icons/react/dist/ssr";
// Components
import Location from "./Location";
import ServiceTimes from "./ServiceTimes";
import Contact from "./Contact";
import UpcomingEvents, { EventType } from "./Upcoming";

const services = [
  { day: "Saturday Service", time: "7:00pm - 9:00pm" },
  { day: "Sunday School", time: "9:15am - 9:55am" },
  { day: "Sunday Service", time: "10:00am - 12:30pm" },
];

const events: EventType[] = [
  {
    title: "Worship Night",
    date: "2025-08-06",
    time: "7:00pm - 9:00pm",
    desc: "Join us for an evening of worship and fellowship in Christ's presence.",
    link: "/worshipflyer2.png",
  },
  {
    title: "Youth Conference",
    date: "2025-08-08",
    dateEnd: "2025-08-10",
    time: "All Day",
    desc: "Gather with us for worship, teaching, and Christ-centered fellowship.",
    link: "",
  },
  {
    title: "Community Outreach",
    date: "2025-08-10",
    time: "9:00am - 2:00pm",
    desc: "Come serve alongside us as we share God's love with our local community.",
    link: "",
  },
];

// ----- Main Visit Component -----
export default function Visit() {
  // Collapsible UI state
  const [expandedSections, setExpandedSections] = useState({
    services: true,
    contact: true,
    events: true,
  });

  // Contact form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [contactLoading, setContactLoading] = useState(false);

  // Contact form handler
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    },
    []
  );

  // Contact form submission with backend API connection and debug logs
  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setContactLoading(true);
      try {
        // Use the endpoint based on file location
        const apiUrl = "/api/contact";
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        console.log(`Response status for ${apiUrl}:`, response.status);

        if (!response.ok) {
          throw new Error("Failed to send message");
        }

        toast.success("Message sent successfully!");
        setFormData({ name: "", email: "", phone: "", message: "" });
      } catch (error) {
        console.error("Form submission error:", error);
        toast.error("Failed to send message. Please try again.");
      } finally {
        setContactLoading(false);
      }
    },
    [formData]
  );

  // Section toggles
  const toggleSection = useCallback((key: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  }, []);

  return (
    <main
      id="visit"
      className="relative min-h-screen bg-[#141414] py-16 md:py-24 lg:py-40 px-4 flex justify-center overflow-hidden"
      aria-label="Visit Our Church"
    >
      {/* --- Decorative Gradients and Grid --- */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%]">
          <div
            className="absolute top-1/4 left-1/4 w-[300px] md:w-[600px] h-[300px] md:h-[600px] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(255, 255, 255, 0.02) 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute bottom-1/4 right-1/4 w-[400px] md:w-[800px] h-[400px] md:h-[800px] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(255, 255, 255, 0.01) 0%, transparent 70%)",
            }}
          />
        </div>
      </div>
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
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

      <div className="max-w-6xl mx-auto md:px-4 lg:px-8 relative z-10 w-full">
        {/* ---- Hero ---- */}
        <motion.header
          className="text-center mb-12 md:mb-20"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-block mb-1 md:mb-2"
            animate={{ y: [0, -8, 0] }}
            transition={{
              y: { duration: 2.8, repeat: Infinity, ease: "easeInOut" },
            }}
            whileHover={{ scale: 1.09 }}
          >
            <motion.span
              initial={{ scaleY: 1.35, scaleX: 0.78, opacity: 0.4 }}
              whileInView={{
                scaleY: [1.35, 0.78, 1.09, 1],
                scaleX: [0.78, 1.2, 0.93, 1],
                opacity: [0.4, 1, 1, 1],
              }}
              transition={{
                duration: 0.75,
                times: [0, 0.5, 0.8, 1],
                ease: [0.33, 1, 0.68, 1],
              }}
              viewport={{ amount: 0.65, once: false }}
              whileHover={{ y: -8, scale: 1.09 }}
              className="inline-block"
            >
              <MapPinIcon
                className="text-gray-500 size-8 md:w-[50px] md:h-[50px]"
                aria-hidden="true"
              />
            </motion.span>
          </motion.div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="text-white">VISIT OUR</span>
            <br />
            <span className="text-gray-400">CHURCH</span>
          </h1>
        </motion.header>

        {/* ---- Location ---- */}
        <Location />

        {/* ---- Service Times/Contact ---- */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          <ServiceTimes
            services={services}
            expanded={expandedSections.services}
            onToggle={() => toggleSection("services")}
          />
          <Contact
            expanded={expandedSections.contact}
            onToggle={() => toggleSection("contact")}
            formData={formData}
            onChange={handleChange}
            onSubmit={handleSubmit}
            loading={contactLoading}
          />
        </div>

        {/* ---- Upcoming Events ---- */}
        <UpcomingEvents
          events={events}
          expanded={expandedSections.events}
          onToggle={() => toggleSection("events")}
        />
      </div>
    </main>
  );
}
