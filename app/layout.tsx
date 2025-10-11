import type { Metadata } from "next";
import "../public/styles/index.css";

export const metadata: Metadata = {
  title: "TimeLuxe | ตลาดกลางนาฬิกาหรู ซื้อขายนาฬิกาแบรนด์เนมระดับโลก",
  description:
    "TimeLuxe - แพลตฟอร์มซื้อขายนาฬิกาหรูที่ใหญ่ที่สุด มีนาฬิกาแบรนด์เนมระดับโลก Rolex, Patek Philippe, Audemars Piguet รับประกันความแท้ 100% ระบบตรวจสอบโดยผู้เชี่ยวชาญ",
  keywords: [
    "นาฬิกาหรู",
    "ซื้อนาฬิกาแบรนด์เนม",
    "ขายนาฬิกาหรู",
    "Rolex",
    "Patek Philippe",
    "Audemars Piguet",
    "นาฬิกามือสอง",
    "นาฬิกาแท้",
    "TimeLuxe",
    "luxury watches",
    "watch marketplace",
  ],
  authors: [{ name: "TimeLuxe Team" }],
  creator: "Marosdee Uma",
  publisher: "TimeLuxe",
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
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
  ),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon/favicon.ico" },
    ],
    shortcut: ["/favicon/favicon.ico"],
    apple: ["/favicon/apple-touch-icon.png"],
  },
  manifest: "/favicon/site.webmanifest",
  openGraph: {
    title: "TimeLuxe | ตลาดกลางนาฬิกาหรู ซื้อขายนาฬิกาแบรนด์เนมระดับโลก",
    description:
      "แพลตฟอร์มซื้อขายนาฬิกาหรูที่ใหญ่ที่สุด Rolex, Patek Philippe, Audemars Piguet รับประกันความแท้ 100%",
    type: "website",
    siteName: "TimeLuxe",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "TimeLuxe - Luxury Watch Marketplace",
      },
    ],
    locale: "th_TH",
  },
  twitter: {
    card: "summary_large_image",
    title: "TimeLuxe | ตลาดกลางนาฬิกาหรู ซื้อขายนาฬิกาแบรนด์เนมระดับโลก",
    description:
      "แพลตฟอร์มซื้อขายนาฬิกาหรูที่ใหญ่ที่สุด รับประกันความแท้ 100% ระบบตรวจสอบโดยผู้เชี่ยวชาญ",
    images: ["/og-image.svg"],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "TimeLuxe",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`antialiased`}>{children}</body>
    </html>
  );
}
