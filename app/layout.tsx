import { ReactNode } from "react";
import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";

import "@stream-io/video-react-sdk/dist/css/styles.css";
import "react-datepicker/dist/react-datepicker.css";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "I2I Video Call App - Professional Video Conferencing Platform",
    template: "%s | I2I Video Call App"
  },
  description: "I2I is a professional video conferencing platform built with Next.js and Stream. Start instant meetings, schedule calls, share screens, record sessions, and collaborate with teams. Features secure authentication, real-time communication, meeting recordings, personal rooms, and responsive design for all devices.",
  keywords: [
    "video conferencing",
    "video calls",
    "online meetings",
    "screen sharing",
    "meeting recording",
    "team collaboration",
    "webinar platform",
    "virtual meetings",
    "video chat",
    "conference calls",
    "remote work",
    "digital meetings",
    "I2I",
    "Next.js",
    "TypeScript",
    "Stream.io",
    "real-time video",
    "secure meetings",
    "instant meetings",
    "scheduled meetings"
  ],
  authors: [{ name: "I2I Team" }],
  creator: "I2I Development Team",
  publisher: "I2I",
  applicationName: "I2I Video Call App",
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/images/I2I.png" },
      { url: "/images/I2I.png", sizes: "32x32", type: "image/png" },
      { url: "/images/I2I.png", sizes: "16x16", type: "image/png" }
    ],
    shortcut: "/images/I2I.png",
    apple: "/images/I2I.png",
  },
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_BASE_URL || "https://i2i-video.vercel.app",
    siteName: "I2I Video Call App",
    title: "I2I Video Call App - Professional Video Conferencing Platform",
    description: "Professional video conferencing with instant meetings, screen sharing, recording, and team collaboration. Built with Next.js and Stream for secure, real-time communication.",
    images: [
      {
        url: "/images/I2I.png",
        width: 1200,
        height: 630,
        alt: "I2I Video Call App - Professional Video Conferencing",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "I2I Video Call App - Professional Video Conferencing Platform",
    description: "Start instant meetings, schedule calls, share screens, and record sessions with I2I's professional video conferencing platform.",
    images: ["/images/I2I.png"],
    creator: "@Zahran_I2I",
  },
  category: "Business & Productivity",
  classification: "Video Conferencing Software",
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "format-detection": "telephone=no",
    "msapplication-TileColor": "#0E78F9",
    "theme-color": "#0E78F9",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <ClerkProvider
        appearance={{
          layout: {
            socialButtonsVariant: "iconButton",
            logoImageUrl: "/images/I2I.png",
          },
          variables: {
            colorText: "#fff",
            colorPrimary: "#0E78F9",
            colorBackground: "#1C1F2E",
            colorInputBackground: "#252A41",
            colorInputText: "#fff",
          },
        }}
      >
        <body className={`${inter.className} bg-dark-2`}>
          <Toaster />
          {children}
        </body>
      </ClerkProvider>
    </html>
  );
}
