// config/seo.ts
import type { Metadata } from "next"

const isDev = process.env.NODE_ENV === "development"

const baseUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://camara-focus.vercel.app"

const nombreApp = "Cámara Focus"
const descriptionApp = "Herramienta de Cámara para una mejora en el flujo de trabajo"
const mainImg = "/logos/WEBP/ISO-AMARILLO_NEGRO.webp"

export const seoConfig: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: nombreApp,
    template: `%s | ${nombreApp}`,
  },
  description: descriptionApp,
  keywords: [
    "Focus",
    "herramienta",
    "trabajo",
    "rendimiento",
    "centralizacion",
  ],
  authors: [{ name: "Facundo Machado at Cámara TBWA" }],
  creator: "Facundo Machado",
  publisher: "Cámara TBWA",
  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    type: "website",
    url: baseUrl,
    siteName: nombreApp,
    title: "Cámara Focus Web App",
    description: descriptionApp,
    images: [
      {
        url: mainImg, // 1200x630 recomendado
        width: 1200,
        height: 630,
        alt: "Logo de Cámara TBWA",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: nombreApp,
    description: descriptionApp,
    images: [mainImg],
  },

  icons: {
    icon: isDev ? "/logos/SVG/ISO-NEGRO_AMARILLO.svg" : "/logos/SVG/ISO-AMARILLO_NEGRO.svg",
  },

  category: "technology",
}