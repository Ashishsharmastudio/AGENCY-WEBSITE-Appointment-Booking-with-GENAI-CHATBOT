import "../styles/globals.css";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Chatbot from "../components/Chatbot";
import ClientScripts from "../components/ClientScripts";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

export const metadata = {
  title: {
    default: "Ashish Sharma — AI Systems & High-Value Digital Platforms",
    template: "%s | Ashish Sharma",
  },
  description: "I build intelligent digital platforms for consultants, coaches, and domain experts — so their knowledge works at scale, not just in one-on-one conversations.",
  applicationName: "Agency Website",
  keywords: [
    "web development",
    "next.js",
    "react",
    "portfolio",
    "agency",
    "AI",
  ],
  authors: [{ name: "Ashishsharmastudio", url: BASE_URL }],
  robots: {
    index: true,
    follow: true,
    nocache: false,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Instrument+Serif:ital@0;1&family=DM+Sans:wght@300;400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body suppressHydrationWarning={true}>
        <div className="cursor" id="cursor"></div>
        <div id="notif-box"><span id="notif-text"></span></div>
        <Header />
        <main>{children}</main>
        <Footer />
        <Chatbot />
        <ClientScripts />
      </body>
    </html>
  );
}
