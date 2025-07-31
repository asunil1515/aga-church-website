"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { BaseNavbar } from "./BaseNavbar";
import { FloatingNavbar } from "./FloatingNavbar";
import { MobileNavbar } from "./MobileNavbar";

export interface NavbarProps {
  variant?: "default" | "opaque" | "YHWH";
  disableFloating?: boolean;
}

export interface BlackNavbarProps {
  variant?: "default" | "opaque" | "YHWH";
}

// Original Navbar with floating capability
export function Navbar({
  variant = "default",
  disableFloating = false,
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  // Optimized scroll handler
  React.useEffect(() => {
    if (disableFloating) return;
    let ticking: number | null = null;
    const handleScroll = () => {
      if (!ticking) {
        ticking = window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 50);
          ticking = null;
        });
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (ticking) cancelAnimationFrame(ticking);
    };
  }, [disableFloating]);

  return (
    <>
      <nav
        className={cn(
          disableFloating ? "absolute" : "fixed",
          "top-0 w-full z-[999] bg-transparent py-1 px-5",
          "flex justify-end items-center",
          "transition-transform duration-500 ease-out",
          !disableFloating && isScrolled
            ? "-translate-y-full"
            : "translate-y-0",
          (variant === "opaque" || variant === "YHWH") && "lg:z-[10000]"
        )}
        aria-label="Primary Navigation"
        role="navigation"
        itemScope
        itemType="http://schema.org/SiteNavigationElement"
      >
        <div className="flex items-center justify-end w-full max-w-[1400px]">
          <BaseNavbar />
        </div>
      </nav>

      {!disableFloating && (
        <nav
          className={cn(
            "hidden lg:block",
            "fixed top-4 left-1/2 -translate-x-1/2 z-[1000]",
            "transition-transform duration-500 ease-out",
            isScrolled ? "translate-y-0" : "-translate-y-[200%]"
          )}
          aria-label="Floating Desktop Navigation"
          role="navigation"
        >
          <div
            className={cn(
              "bg-[rgba(12,12,12,0.97)]",
              "rounded-full px-8 py-2",
              "shadow-[0_8px_32px_rgba(0,0,0,0.4)]",
              "backdrop-blur-md",
              "border border-white/5"
            )}
          >
            <FloatingNavbar />
          </div>
        </nav>
      )}

      <MobileNavbar
        isOpen={isMobileMenuOpen}
        onOpenChange={setIsMobileMenuOpen}
      />
    </>
  );
}

// BlackNavbar with disabled floating and black text
export function BlackNavbar({ variant = "default" }: BlackNavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <>
      <nav
        className={cn(
          "absolute",
          "top-0 w-full z-[999] bg-transparent py-1 px-5",
          "flex justify-end items-center",
          "transition-transform duration-500 ease-out",
          "translate-y-0",
          (variant === "opaque" || variant === "YHWH") && "lg:z-[10000]",
          "text-black"
        )}
        aria-label="Primary Navigation"
        role="navigation"
        itemScope
        itemType="http://schema.org/SiteNavigationElement"
      >
        <div className="flex items-center justify-end w-full max-w-[1400px]">
          <BaseNavbar textColorClass="text-black" />
        </div>
      </nav>

      <MobileNavbar
        isOpen={isMobileMenuOpen}
        onOpenChange={setIsMobileMenuOpen}
      />
    </>
  );
}

// "use client";
// import * as React from "react";
// import { cn } from "@/lib/utils";
// import { BaseNavbar } from "./BaseNavbar";
// import { FloatingNavbar } from "./FloatingNavbar";
// import { MobileNavbar } from "./MobileNavbar";

// export interface NavbarProps {
//   variant?: "default" | "opaque" | "YHWH";
//   bagItemCount?: number;
//   disableFloating?: boolean;
// }

// export function Navbar({
//   variant = "default",
//   bagItemCount = 0,
//   disableFloating = false,
// }: NavbarProps) {
//   const [isScrolled, setIsScrolled] = React.useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

//   // Optimized scroll handler
//   React.useEffect(() => {
//     if (disableFloating) return;
//     let ticking: number | null = null;
//     const handleScroll = () => {
//       if (!ticking) {
//         ticking = window.requestAnimationFrame(() => {
//           setIsScrolled(window.scrollY > 50);
//           ticking = null;
//         });
//       }
//     };
//     window.addEventListener("scroll", handleScroll, { passive: true });
//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//       if (ticking) cancelAnimationFrame(ticking);
//     };
//   }, [disableFloating]);

//   return (
//     <>
//       <nav
//         className={cn(
//           disableFloating ? "absolute" : "fixed",
//           "top-0 w-full z-[999] bg-transparent py-1 px-5",
//           "flex justify-end items-center",
//           "transition-transform duration-500 ease-out",
//           !disableFloating && isScrolled
//             ? "-translate-y-full"
//             : "translate-y-0",
//           (variant === "opaque" || variant === "YHWH") && "lg:z-[10000]"
//         )}
//         aria-label="Primary Navigation"
//         role="navigation"
//         itemScope
//         itemType="http://schema.org/SiteNavigationElement"
//       >
//         <div className="flex items-center justify-end w-full max-w-[1400px]">
//           <BaseNavbar />
//         </div>
//       </nav>

//       {!disableFloating && (
//         <nav
//           className={cn(
//             "hidden lg:block",
//             "fixed top-4 left-1/2 -translate-x-1/2 z-[1000]",
//             "transition-transform duration-500 ease-out",
//             isScrolled ? "translate-y-0" : "-translate-y-[200%]"
//           )}
//           aria-label="Floating Desktop Navigation"
//           role="navigation"
//         >
//           <div
//             className={cn(
//               "bg-[rgba(12,12,12,0.97)]",
//               "rounded-full px-8 py-2",
//               "shadow-[0_8px_32px_rgba(0,0,0,0.4)]",
//               "backdrop-blur-md",
//               "border border-white/5"
//             )}
//           >
//             <FloatingNavbar />
//           </div>
//         </nav>
//       )}

//       <MobileNavbar
//         isOpen={isMobileMenuOpen}
//         onOpenChange={setIsMobileMenuOpen}
//       />
//     </>
//   );
// }
