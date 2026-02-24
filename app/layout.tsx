import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AppShell } from "@/components/layout/AppShell"
import "./globals.css";
import { Toaster } from "sonner"

const isDev = process.env.NODE_ENV === "development"
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Camara Focus",
  icons: {
    icon: isDev ? "/logos/SVG/ISO-NEGRO_AMARILLO.svg" : "/logos/SVG/ISO-AMARILLO_NEGRO.svg",
  },
  description: "An original tool for better workflow in design",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AppShell>{children}</AppShell>
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
