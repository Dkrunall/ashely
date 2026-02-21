import type { Metadata } from "next";
import { Geist, Geist_Mono, Anton } from "next/font/google";
import "./globals.css";
import SmoothScrolling from "@/components/smooth-scrolling";
import GrainOverlay from "@/components/ui/grain-overlay";
import BeatMixer from "@/components/ui/beat-mixer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const anton = Anton({
  variable: "--font-anton",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ASHLEY ALVARES | Official Website",
  description: "Experience the dynamic mixes and electrifying performances of DJ Ashley Alvares. Explore latest releases, tour dates, and booking information.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${anton.variable} antialiased`}
      >
        <GrainOverlay />
        <BeatMixer />
        <SmoothScrolling>{children}</SmoothScrolling>
      </body>
    </html>
  );
}
