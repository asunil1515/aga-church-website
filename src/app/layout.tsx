import type { Metadata } from "next";
import { BagProvider } from './components/Bag'; // Adjusted import path
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Montserrat } from 'next/font/google'
import "./globals.css";
import Head from 'next/head';  // Import Head from next/head


const montserrat = Montserrat({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
})
export const metadata: Metadata = {
  title: "AGA",
  description: "A welcoming church community focused on faith and fellowship.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${montserrat.variable}`}>
      <body className={montserrat.className}>
        <BagProvider>
          <Head>
            {/* Open Graph meta tags for homepage */}
            <meta property="og:title" content="Welcome to AGA Church" />
            <meta property="og:description" content="Join our community of faith and fellowship." />
            <meta property="og:image" content="https://www.agachurch.org/images/BG1.jpg" />
            <meta property="og:url" content="https://www.agachurch.org" />
            <meta property="og:type" content="website" />
          </Head>
          <main>{children}</main>  {/* Page-specific content here */}
        </BagProvider>
      </body>
    </html>
  );
}
