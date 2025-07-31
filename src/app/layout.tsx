import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Montserrat } from "next/font/google";
import { Toaster } from "sonner";
import ScrollHandler from "./ui/scrollhandler"; // Import the new component
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  // For search engines
  title: "AGA",
  description: "A welcoming church community focused on faith and fellowship.",
  // For shared links
  openGraph: {
    title: "AGA | Worship. Word. Community.",
    description: "Join our community of faith and fellowship.",
    url: "https://www.agachurch.org",
    siteName: "AGA Church",
    images: [
      {
        url: "/logo.jpg",
        width: 1200,
        height: 630,
        alt: "AGA Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={montserrat.variable}>
      <body className={montserrat.className}>
        <Analytics />
        <SpeedInsights />
        <Toaster />
        <main>
          <ScrollHandler>{children}</ScrollHandler>
        </main>
      </body>
    </html>
  );
}
