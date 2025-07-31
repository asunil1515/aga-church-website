import React, { useEffect, useMemo } from "react";
import { motion, useAnimation } from "framer-motion";
import { beliefs } from "./Beliefs-data";

// --- Shared Glow Component (No Animation) ---
export const IconGlow = React.memo(function IconGlow({
  active,
}: {
  active: boolean;
}) {
  if (!active) return null;
  return (
    <span
      aria-hidden="true"
      className="
        absolute inset-1 rounded-full
        bg-gradient-to-tr from-white/80 via-slate-200/60 to-slate-400/0
        blur-lg opacity-90 pointer-events-none
      "
    />
  );
});

// --- Helpers ---
export type AnimatedIconProps = { active: boolean };
const getIconColor = (active: boolean) =>
  active ? "text-slate-200" : "text-white/30";

// --- 1. Salvation Icon ---
export const SalvationIcon = React.memo(function SalvationIcon({
  active,
}: AnimatedIconProps) {
  const icon = useMemo(() => beliefs.find((b) => b.id === "salvation"), []);
  return (
    <div className="relative w-12 h-12 flex items-center justify-center">
      <IconGlow active={active} />
      <motion.div
        animate={active ? { scale: [1, 1.15, 1] } : { scale: 1 }}
        transition={
          active
            ? {
                duration: 2,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut",
              }
            : { duration: 0.4 }
        }
        className="relative"
      >
        <svg
          viewBox="0 0 466 466"
          xmlns="http://www.w3.org/2000/svg"
          width={36}
          height={36}
          fill="currentColor"
          className={`${getIconColor(active)} transition-colors duration-300`}
          aria-label="Salvation"
          role="img"
        >
          <title>Salvation Icon</title>
          <path d={icon?.icon.elements[0].d} fill="currentColor" />
        </svg>
      </motion.div>
    </div>
  );
});

// --- 2. Dove Icon (Ordinances) ---
type IconSVGProps = { className?: string };
export const DoveOutlineSVG = React.memo(function DoveOutlineSVG({
  className,
}: IconSVGProps) {
  const dove = useMemo(() => beliefs.find((b) => b.id === "ordinances"), []);
  return (
    <svg
      viewBox="0 0 64 64"
      width={36}
      height={36}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      className={className}
      aria-label="Ordinances"
      role="img"
    >
      <title>Ordinances Icon (Dove)</title>
      <path d={dove?.icon.elements[0].d} />
      <circle
        cx={dove?.icon.elements[1].cx}
        cy={dove?.icon.elements[1].cy}
        r={dove?.icon.elements[1].r}
        stroke="none"
        fill="currentColor"
      />
    </svg>
  );
});

export const DoveIconAnimated = React.memo(function DoveIconAnimated({
  active,
}: AnimatedIconProps) {
  return (
    <div className="relative w-12 h-12 flex items-center justify-center">
      <IconGlow active={active} />
      <motion.div
        animate={active ? { y: [0, -4, 0] } : { y: 0 }}
        transition={
          active
            ? {
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }
            : { duration: 0.4 }
        }
      >
        <DoveOutlineSVG
          className={`${getIconColor(active)} transition-colors duration-300`}
        />
      </motion.div>
    </div>
  );
});

// --- 3. Flame Icon (Sanctification) ---
export const FlameIconAnimated = React.memo(function FlameIconAnimated({
  active,
}: AnimatedIconProps) {
  const icon = useMemo(
    () => beliefs.find((b) => b.id === "sanctification"),
    []
  );
  return (
    <div className="relative flex items-center justify-center w-12 h-12">
      <IconGlow active={active} />
      <motion.svg
        width={36}
        height={36}
        viewBox="0 0 16 16"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        className={`${getIconColor(active)} transition-colors duration-300`}
        aria-label="Sanctification"
        role="img"
        animate={
          active
            ? { scale: 1.15, rotate: 6, x: 2, y: -2 }
            : { scale: 1, rotate: 0, x: 0, y: 0 }
        }
        transition={
          active
            ? {
                duration: 1,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
              }
            : { duration: 0.3 }
        }
      >
        <title>Sanctification Icon (Flame)</title>
        <path d={icon?.icon.elements[0].d} fill="currentColor" />
      </motion.svg>
    </div>
  );
});

// --- 4. Heart Icon (Healing) ---
export const HeartIconAnimated = React.memo(function HeartIconAnimated({
  active,
}: AnimatedIconProps) {
  const icon = useMemo(() => beliefs.find((b) => b.id === "healing"), []);
  const controls = useAnimation();

  useEffect(() => {
    if (active) {
      controls.start({
        scale: [1, 1.1, 1.05, 1.1, 1, 1],
        transition: {
          duration: 1.5,
          times: [0, 0.15, 0.3, 0.45, 0.6, 1],
          ease: "easeInOut",
          repeat: Infinity,
          repeatDelay: 0.5,
        },
      });
    } else {
      controls.stop();
      controls.set({ scale: 1 });
    }
  }, [active, controls]);

  return (
    <div className="relative flex items-center justify-center w-12 h-12">
      <IconGlow active={active} />
      <motion.div animate={controls} style={{ originX: 0.5, originY: 0.5 }}>
        <svg
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          stroke="currentColor"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`${getIconColor(active)} transition-colors duration-300`}
          width={36}
          height={36}
          aria-label="Healing"
          role="img"
        >
          <title>Healing Icon (Heart)</title>
          <path d={icon?.icon.elements[0].d} />
        </svg>
      </motion.div>
    </div>
  );
});

// --- 5. Crown Icon (Eternity) ---
export const CrownIcon = React.memo(function CrownIcon({
  active,
}: AnimatedIconProps) {
  const icon = useMemo(() => beliefs.find((b) => b.id === "eternity"), []);
  const animatedStyle: React.CSSProperties = active
    ? { animation: "pulseFloat 2s ease-in-out infinite" }
    : {};

  return (
    <>
      <style>
        {`
          @keyframes pulseFloat {
            0%, 100% { transform: translateY(0) scale(1); opacity: 1; }
            50% { transform: translateY(-2px) scale(1.15); opacity: 0.95; }
          }
        `}
      </style>
      <div className="relative flex items-center justify-center w-12 h-12">
        <span
          className={`absolute inset-1 rounded-full bg-gradient-to-tr from-white/80 via-slate-200/60 to-slate-400/0 blur-lg pointer-events-none transition-all duration-300 ${
            active ? "opacity-90" : "opacity-0 scale-0"
          }`}
          aria-hidden="true"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 135.031 135.031"
          fill="currentColor"
          className={`w-9 h-9 transition-colors duration-300 relative z-10 ${getIconColor(
            active
          )}`}
          style={animatedStyle}
          aria-label="Eternity"
          role="img"
        >
          <title>Eternity Icon (Crown)</title>
          <path d={icon?.icon.elements[0].d} fill="currentColor" />
        </svg>
      </div>
    </>
  );
});

// --- Icon Map ---
export const AnimatedIcons = {
  salvation: SalvationIcon,
  ordinances: DoveIconAnimated,
  sanctification: FlameIconAnimated,
  healing: HeartIconAnimated,
  eternity: CrownIcon,
};
