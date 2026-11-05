
import type { Metadata } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";

import "./globals.css";
import ThemeProvider from "@/components/providers/ThemeProvider";
import SiteHeader from "@/components/layout/site-header";
import Footer from "@/components/layout/Footer";


const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "Harry Studio | Creative Spaces",
  description:
    "Discover and book inspiring creative studios, photography spaces, podcast rooms, and music suites.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${manrope.variable} ${spaceGrotesk.variable} antialiased`}
      >
        <ThemeProvider>
          <SiteHeader />
          {children}
          <Footer/>
        </ThemeProvider>
      </body>
    </html>
  );
}
