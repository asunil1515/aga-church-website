"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Send } from "lucide-react";

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}
export interface ContactProps {
  expanded: boolean;
  onToggle: () => void;
  formData: ContactFormData;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onSubmit: (e: React.FormEvent) => void;
  loading: boolean;
}

const Contact: React.FC<ContactProps> = React.memo(
  ({ expanded, onToggle, formData, onChange, onSubmit, loading }) => (
    <motion.section
      className="relative"
      initial={{ opacity: 0, x: 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
      viewport={{ once: true }}
      aria-labelledby="contact-title"
    >
      <div className="relative bg-white/[0.03] backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-white/10">
        <div
          className="absolute -top-32 -right-32 w-64 h-64 bg-white/[0.02] rounded-full opacity-50 hidden lg:block pointer-events-none"
          aria-hidden="true"
        />
        <button
          onClick={onToggle}
          className="relative w-full p-6 md:p-8 flex justify-between items-center text-left hover:bg-white/[0.01] transition-colors z-10"
          type="button"
          aria-expanded={expanded}
          aria-controls="contact-section"
          aria-label={expanded ? "Hide contact form" : "Show contact form"}
        >
          <h2
            id="contact-title"
            className="text-xl md:text-2xl font-bold text-white mb-0"
          >
            GET IN TOUCH
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
              id="contact-section"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              role="region"
              aria-labelledby="contact-title"
            >
              <div className="px-6 pb-6 md:px-8 md:pb-8">
                <p className="text-sm md:text-base text-gray-400 leading-relaxed mb-6">
                  Have questions? We&apos;d love to hear from you. Send us a
                  message and we&apos;ll respond as soon as possible.
                </p>
                <form
                  onSubmit={onSubmit}
                  className="space-y-4"
                  aria-label="Contact Form"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <label className="sr-only" htmlFor="name">
                      Your Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      className="w-full bg-white/[0.03] text-white border border-white/10 p-3 rounded-lg placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-white/20 focus:border-white/20 transition-all text-sm"
                      value={formData.name}
                      onChange={onChange}
                      required
                    />
                    <label className="sr-only" htmlFor="email">
                      Your Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      className="w-full bg-white/[0.03] text-white border border-white/10 p-3 rounded-lg placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-white/20 focus:border-white/20 transition-all text-sm"
                      value={formData.email}
                      onChange={onChange}
                      required
                    />
                  </div>
                  <label className="sr-only" htmlFor="phone">
                    Phone Number (Optional)
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    placeholder="Phone Number (Optional)"
                    className="w-full bg-white/[0.03] text-white border border-white/10 p-3 rounded-lg placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-white/20 focus:border-white/20 transition-all text-sm"
                    value={formData.phone}
                    onChange={onChange}
                    autoComplete="tel"
                  />
                  <label className="sr-only" htmlFor="message">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Your Message"
                    className="w-full bg-white/[0.03] text-white border border-white/10 p-3 rounded-lg h-24 resize-none placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-white/20 focus:border-white/20 transition-all text-sm"
                    value={formData.message}
                    onChange={onChange}
                    required
                  />
                  <motion.button
                    type="submit"
                    className="w-full bg-white text-black hover:bg-gray-100 py-3 rounded-lg transition-all duration-300 disabled:opacity-50 font-semibold flex items-center justify-center gap-2 group"
                    disabled={loading}
                    whileTap={{ scale: 0.98 }}
                    aria-busy={loading}
                  >
                    {loading ? (
                      <>
                        <div
                          className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin"
                          aria-label="Loading"
                        />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send
                          className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                          aria-hidden="true"
                        />
                      </>
                    )}
                  </motion.button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  )
);

// Fix for react/display-name
Contact.displayName = "Contact";

export default Contact;