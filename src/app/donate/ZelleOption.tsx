import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SiZelle } from "react-icons/si";
import { FiCopy, FiCheck } from "react-icons/fi";

export interface ZelleAccount {
  id: string;
  label: string;
  email: string;
}

interface ZelleOptionProps {
  expanded: boolean;
  onToggle: () => void;
  accounts: ZelleAccount[];
  copiedEmail: string | null;
  handleCopy: (email: string, id: string) => void;
}

// React.memo for performance, as with VenmoOption
export const ZelleOption: React.FC<ZelleOptionProps> = React.memo(
  ({ expanded, onToggle, accounts, copiedEmail, handleCopy }) => (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="group relative"
      aria-labelledby="zelle-section-title"
    >
      <div
        className={`relative overflow-hidden rounded-2xl border backdrop-blur-xl transition-all duration-500 ${
          expanded
            ? "bg-gray-200 text-black border-white shadow-2xl"
            : "bg-white/[0.03] hover:bg-white/[0.05] border-white/10 hover:border-white/20 shadow-xl"
        }`}
      >
        <button
          onClick={onToggle}
          className="w-full p-6 md:p-8 lg:p-10 text-left"
          aria-expanded={expanded}
          aria-controls="zelle-details"
          aria-label={expanded ? "Hide Zelle details" : "Show Zelle details"}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 md:gap-6">
              <motion.span
                className={`transition-all duration-500 ${
                  expanded ? "text-black" : "text-white/60"
                }`}
                animate={{ rotate: expanded ? 360 : 0 }}
                transition={{ duration: 0.5 }}
                aria-hidden="true"
                title="Zelle logo"
              >
                <SiZelle className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12" />
              </motion.span>
              <div>
                <h3
                  id="zelle-section-title"
                  className={`text-xl md:text-2xl lg:text-3xl font-bold transition-colors duration-300 ${
                    expanded ? "text-black" : "text-white"
                  }`}
                >
                  Zelle
                </h3>
                <p className={`text-xs md:text-sm mt-1 transition-colors duration-300 ${
                  expanded ? "text-black/60" : "text-gray-400"
                }`}>
                  Direct bank transfers – safe and instant.
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
        {/* Zelle Details */}
        <AnimatePresence>
          {expanded && (
            <motion.section
              id="zelle-details"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="border-t border-black/10"
              aria-live="polite"
            >
              <div className="p-6 md:p-8 lg:p-10 pt-4 md:pt-6 space-y-2 md:space-y-3">
                {accounts.map((account, index) => (
                  <motion.button
                    key={account.id}
                    onClick={() => handleCopy(account.email, account.id)}
                    className="w-full text-left p-3 md:p-4 rounded-xl bg-black/5 hover:bg-black/10 transition-all duration-300 group"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.07 }}
                    aria-label={`Copy ${account.label} Zelle email address`}
                    type="button"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-black text-sm md:text-base">
                          {account.label}
                        </p>
                        <p className="text-xs md:text-sm text-black/50 font-mono mt-1">
                          {account.email}
                        </p>
                      </div>
                      <span
                        className={`transition-all duration-300 ${
                          copiedEmail === account.id
                            ? "text-green-600"
                            : "text-black/30 group-hover:text-black/60"
                        }`}
                        aria-label={copiedEmail === account.id ? "Copied" : "Copy"}
                        role="img"
                        title={copiedEmail === account.id ? "Copied!" : "Copy to clipboard"}
                      >
                        {copiedEmail === account.id ? (
                          <FiCheck className="w-4 h-4 md:w-5 md:h-5" />
                        ) : (
                          <FiCopy className="w-4 h-4 md:w-5 md:h-5" />
                        )}
                      </span>
                    </div>
                  </motion.button>
                ))}
                <p className="text-[10px] md:text-xs text-black/40 text-center mt-3 md:mt-4">
                  Click any email to copy
                </p>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
);

ZelleOption.displayName = "ZelleOption";