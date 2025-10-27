import "../styles/globals.css";
import Footer from "../components/Footer";
import Providers from "../components/Providers";
import Chatbot from "@/components/Chatbot";
import Header from "@/components/Header";
import PWARegister from "../components/PWARegister";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

export const metadata = {
  title: {
    default: "Ashish Agency | Portfolio & Services",
    template: "%s | Agency",
  },
  description: "We build websites, SaaS apps, and digital solutions.",
  applicationName: "Agency Website",
  keywords: [
    "web development",
    "next.js",
    "react",
    "tailwindcss",
    "portfolio",
    "agency",
  ],
  authors: [{ name: "Ashishsharmastudio", url: BASE_URL }],
  robots: {
    index: true,
    follow: true,
    nocache: false,
  },
  openGraph: {
    title: "Agency Website | Portfolio & Services",
    description: "We build websites, SaaS apps, and digital solutions.",
    url: BASE_URL,
    siteName: "Agency Website",
    images: [
      {
        url: `${BASE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Agency Website",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Agency Website",
    description: "We build websites, SaaS apps, and digital solutions.",
    site: "@your_twitter",
    creator: "@your_twitter",
  },
  alternates: {
    canonical: BASE_URL,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0ea5e9" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <link rel="apple-touch-icon" href="/Apps.png" />
      </head>
      <body className="bg-gray-50 text-gray-900" suppressHydrationWarning={true}>
        <Providers>
          <Header/>
          <main className="min-h-screen">{children}</main>
          <Footer />
          <Chatbot />
          <PWARegister />
          {/* <StaticNotificationPrompt /> */}
        </Providers>
      </body>
    </html>
  );
}
