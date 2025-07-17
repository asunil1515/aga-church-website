"use client";

import React, { useState } from "react";
import { ChevronDown, Navigation, Send, ChevronsRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import useMeasure from "react-use-measure";
import { MapPinIcon } from "@phosphor-icons/react/dist/ssr";

const Visit = () => {
  const [expandedSections, setExpandedSections] = useState({
    services: true,
    contact: true,
    events: true,
  });
  const [activeCard, setActiveCard] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [showAllEvents, setShowAllEvents] = useState(false);

  const [ref, { height }] = useMeasure();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      alert("Message sent successfully!");
      setFormData({ name: "", email: "", phone: "", message: "" });
      setLoading(false);
    }, 1500);
  };

  const toggleCard = (card: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [card]: !prev[card],
    }));
  };

  const services = [
    { day: "Saturday Service", time: "7:00pm - 9:00pm" },
    { day: "Sunday School", time: "9:15am - 9:55am" },
    { day: "Sunday Service", time: "10:00am - 12:00pm" },
  ];

  const events = [
    {
      title: "Worship Night",
      date: "Apr 26",
      time: "7:00pm - 9:00pm",
      desc: "Join us for an evening of worship and fellowship in Christ's presence.",
      link: "/worshipflyer2.png",
    },
    {
      title: "Youth Conference",
      date: "May 3-5",
      time: "All Day",
      desc: "Annual youth gathering for spiritual growth and fellowship.",
      link: "#",
    },
    {
      title: "Community Outreach",
      date: "May 11",
      time: "9:00am - 2:00pm",
      desc: "Serving our local community together with love and compassion.",
      link: "#",
    },
    {
      title: "Community Out",
      date: "May 11",
      time: "9:00am - 2:00pm",
      desc: "Serving our local community together with love and compassion.",
      link: "#",
    },
  ];

  return (
    <section
      id="visit"
      className="relative min-h-screen bg-[#141414] py-16 md:py-24 lg:py-40 px-4 flex justify-center overflow-hidden"
    >
      {/* Decorative background gradients */}
      <div className="absolute inset-0 pointer-events-none">
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

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
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
        {/* Header */}
        <motion.div
          className="text-center mb-12 md:mb-20"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-block mb-4 md:mb-6"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <MapPinIcon size={32} className="text-gray-500" />
          </motion.div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="text-white">VISIT OUR</span>
            <br />
            <span className="text-gray-400">CHURCH</span>
          </h2>
        </motion.div>

        {/* Location with map */}
        <motion.div
          className="mb-8 lg:mb-12"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <div className="relative bg-white/[0.03] backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-white/10">
            <div className="absolute -top-32 -right-32 w-64 h-64 bg-white/[0.02] rounded-full opacity-50 hidden lg:block pointer-events-none" />
            <div className="relative w-full aspect-[16/9] md:aspect-[2/1] rounded-xl overflow-hidden mb-6 md:mb-8 group">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3470.8446852172447!2d-95.37095492579168!3d29.550017075176267!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x86409319798274f3%3A0x8041efadd4cefc72!2s2550%20County%20Rd%2090%2C%20Pearland%2C%20TX%2077584!5e0!3m2!1sen!2sus!4v1742343326804!5m2!1sen!2sus"
                allowFullScreen
                loading="lazy"
                className="absolute inset-0 w-full h-full grayscale z-10"
              />

              {/* Shadow overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#141414]/60 to-transparent z-20 pointer-events-none" />
            </div>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                  OUR LOCATION
                  <div className="h-0.5 w-16 bg-gray-600 mt-2" />
                </h3>
                <p className="text-sm md:text-base text-gray-400">
                  2550 County Rd 90, Pearland, TX 77584
                </p>
              </div>
              <motion.a
                href="https://www.google.com/maps/dir//2550+County+Rd+90,+Pearland,+TX+77584"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex justify-center gap-2 bg-white text-black hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold transition-all duration-300 group"
                onMouseEnter={() => setActiveCard("directions")}
                onMouseLeave={() => setActiveCard(null)}
                whileTap={{ scale: 0.98 }}
              >
                Get Directions
                <span
                  className={`transition-all duration-300 ${
                    activeCard === "directions" ? "translate-x-1" : ""
                  }`}
                >
                  <Navigation size={20} />
                </span>
              </motion.a>
            </div>
          </div>
        </motion.div>

        {/* Services & Contact sections */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Service Times */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <div className="relative bg-white/[0.03] backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-white/10 ">
              <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-white/[0.02] rounded-full opacity-50 hidden lg:block pointer-events-none" />
              <button
                onClick={() => toggleCard("services")}
                className="relative w-full p-6 md:p-8 flex justify-between items-center text-left hover:bg-white/[0.01] transition-colors z-10"
              >
                <h3 className="text-xl md:text-2xl font-bold text-white">
                  SERVICE TIMES
                  <div className="h-0.5 w-16 bg-gray-600 mt-2" />
                </h3>
                <motion.div
                  animate={{ rotate: expandedSections.services ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-6 h-6 text-gray-400" />
                </motion.div>
              </button>
              <AnimatePresence initial={false}>
                {expandedSections.services && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-6 md:px-8 pb-6 md:pb-28">
                      <p className="text-sm md:text-base text-gray-400 leading-relaxed mb-6">
                        Join us for worship and fellowship throughout the week.
                        All are welcome!
                      </p>
                      <div className="space-y-3 text-sm md:text-base">
                        {services.map((service, index) => (
                          <motion.div
                            key={service.day}
                            className="bg-white/[0.02] rounded-lg p-4 border border-white/5 hover:bg-white/[0.05] transition-all duration-300"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <div className="flex justify-between items-center">
                              <div>
                                <h4 className="font-semibold text-white text-xs md:text-base">
                                  {service.day}
                                </h4>
                              </div>
                              <span className="text-xs text-gray-300 bg-white/5 px-3 py-1 rounded-full">
                                {service.time}
                              </span>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Get In Touch */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <div className="relative bg-white/[0.03] backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-white/10 ">
              <div className="absolute -top-32 -right-32 w-64 h-64 bg-white/[0.02] rounded-full opacity-50 hidden lg:block pointer-events-none" />
              <button
                onClick={() => toggleCard("contact")}
                className="relative w-full p-6 md:p-8 flex justify-between items-center text-left hover:bg-white/[0.01] transition-colors z-10"
              >
                <h3 className="text-xl md:text-2xl font-bold text-white">
                  GET IN TOUCH
                  <div className="h-0.5 w-16 bg-gray-600 mt-2" />
                </h3>
                <motion.div
                  animate={{ rotate: expandedSections.contact ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-6 h-6 text-gray-400" />
                </motion.div>
              </button>
              <AnimatePresence initial={false}>
                {expandedSections.contact && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-6 md:px-8 pb-6 md:pb-8">
                      <p className="text-sm md:text-base text-gray-400 leading-relaxed mb-6">
                        Have questions? We'd love to hear from you. Send us a
                        message and we'll respond as soon as possible.
                      </p>
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <input
                            type="text"
                            name="name"
                            placeholder="Your Name"
                            className="w-full bg-white/[0.03] text-white border border-white/10 p-3 rounded-lg placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-white/20 focus:border-white/20 transition-all text-sm"
                            value={formData.name}
                            onChange={handleChange}
                            required
                          />
                          <input
                            type="email"
                            name="email"
                            placeholder="Your Email"
                            className="w-full bg-white/[0.03] text-white border border-white/10 p-3 rounded-lg placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-white/20 focus:border-white/20 transition-all text-sm"
                            value={formData.email}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <input
                          type="tel"
                          name="phone"
                          placeholder="Phone Number (Optional)"
                          className="w-full bg-white/[0.03] text-white border border-white/10 p-3 rounded-lg placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-white/20 focus:border-white/20 transition-all text-sm"
                          value={formData.phone}
                          onChange={handleChange}
                        />
                        <textarea
                          name="message"
                          placeholder="Your Message"
                          className="w-full bg-white/[0.03] text-white border border-white/10 p-3 rounded-lg h-24 resize-none placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-white/20 focus:border-white/20 transition-all text-sm"
                          value={formData.message}
                          onChange={handleChange}
                          required
                        />
                        <motion.button
                          type="submit"
                          className="w-full bg-white text-black hover:bg-gray-100 py-3 rounded-lg transition-all duration-300 disabled:opacity-50 font-semibold flex items-center justify-center gap-2 group"
                          disabled={loading}
                          whileTap={{ scale: 0.98 }}
                        >
                          {loading ? (
                            <>
                              <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                              <span>Sending...</span>
                            </>
                          ) : (
                            <>
                              <span>Send Message</span>
                              <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </>
                          )}
                        </motion.button>
                      </form>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* Upcoming Events */}
        <motion.div
          className="relative mt-8 lg:mt-12"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.0, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <div className="relative bg-white/[0.03] backdrop-blur-sm rounded-2xl shadow-xl transition-all overflow-hidden border border-white/10">
            <button
              onClick={() => toggleCard("events")}
              className="relative w-full p-6 md:p-8 flex justify-between items-center text-left hover:bg-white/[0.01] transition-colors z-10"
            >
              <h3 className="text-xl md:text-2xl font-bold text-white">
                UPCOMING EVENTS
                <div className="h-0.5 w-16 bg-gray-600 mt-2" />
              </h3>
              <motion.div
                animate={{ rotate: expandedSections.events ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown className="w-6 h-6 text-gray-400" />
              </motion.div>
            </button>

            <AnimatePresence initial={false}>
              {expandedSections.events && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <div className="px-6 md:px-8 pb-6 md:pb-8">
                    <motion.div
                      animate={{ height: height || "auto" }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      style={{ overflow: "hidden" }}
                    >
                      <div ref={ref}>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {/* First 3 events - always visible when expanded */}
                          {events.slice(0, 3).map((event, index) => (
                            <motion.div
                              key={event.title}
                              className="bg-white/[0.02] rounded-lg p-5 border border-white/5 relative overflow-hidden group hover:bg-white/[0.05] transition-all duration-300"
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{
                                duration: 0.3,
                                delay: index * 0.1,
                                ease: "easeOut",
                              }}
                            >
                              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-white/20 to-transparent" />
                              <div className="flex items-center justify-between mb-3">
                                <h4 className="font-semibold text-white">
                                  {event.title}
                                </h4>
                                <span className="text-xs bg-white text-black px-2 py-1 rounded-full font-medium">
                                  {event.date}
                                </span>
                              </div>
                              <p className="text-xs text-gray-400 mb-2">
                                {event.time}
                              </p>
                              <p className="text-sm text-gray-300 mb-3 leading-relaxed">
                                {event.desc}
                              </p>
                              <a
                                href={event.link}
                                className="text-sm text-white hover:text-gray-300 transition-colors inline-flex items-center gap-1 group"
                              >
                                View Details
                                <ChevronDown className="w-3 h-3 -rotate-90 group-hover:translate-x-0.5 transition-transform" />
                              </a>
                            </motion.div>
                          ))}

                          {/* Extra events */}
                          <AnimatePresence>
                            {showAllEvents &&
                              events.slice(3).map((event, index) => (
                                <motion.div
                                  key={event.title}
                                  className="bg-white/[0.02] rounded-lg p-5 border border-white/5 relative overflow-hidden group hover:bg-white/[0.05] transition-all duration-300"
                                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                                  animate={{ opacity: 1, scale: 1, y: 0 }}
                                  exit={{ opacity: 0, scale: 0.8, y: 20 }}
                                  transition={{
                                    duration: 0.3,
                                    delay: index * 0.1,
                                    ease: "easeOut",
                                  }}
                                >
                                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-white/20 to-transparent" />
                                  <div className="flex items-center justify-between mb-3">
                                    <h4 className="font-semibold text-white">
                                      {event.title}
                                    </h4>
                                    <span className="text-xs bg-white text-black px-2 py-1 rounded-full font-medium">
                                      {event.date}
                                    </span>
                                  </div>
                                  <p className="text-xs text-gray-400 mb-2">
                                    {event.time}
                                  </p>
                                  <p className="text-sm text-gray-300 mb-3 leading-relaxed">
                                    {event.desc}
                                  </p>
                                  <a
                                    href={event.link}
                                    className="text-sm text-white hover:text-gray-300 transition-colors inline-flex items-center gap-1 group"
                                  >
                                    View Details
                                    <ChevronDown className="w-3 h-3 -rotate-90 group-hover:translate-x-0.5 transition-transform" />
                                  </a>
                                </motion.div>
                              ))}
                          </AnimatePresence>
                        </div>
                      </div>
                    </motion.div>

                    {/* show more */}
                    {events.length > 3 && (
                      <div className="mt-6 text-center">
                        <motion.button
                          className="inline-flex items-center gap-2 text-white font-semibold hover:text-gray-300 transition-colors group"
                          onClick={() => setShowAllEvents(!showAllEvents)}
                          onMouseEnter={() => setActiveCard("events")}
                          onMouseLeave={() => setActiveCard(null)}
                          whileTap={{ scale: 0.95 }}
                        >
                          {showAllEvents ? "Show Less" : "View All Events"}
                          <motion.span
                            className="transition-transform duration-300"
                            animate={{
                              x: activeCard === "events" ? 4 : 0,
                              rotate: showAllEvents ? -90 : 0,
                            }}
                          >
                            <ChevronsRight size={20} />
                          </motion.span>
                        </motion.button>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Visit;
