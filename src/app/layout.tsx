import "../styles/globals.css";
import Footer from "../components/Footer";
import Providers from "../components/Providers";
import Chatbot from "@/components/Chatbot";
import Header from "@/components/Header";
import PWARegister from "../components/PWARegister";
import StaticNotificationPrompt from "../components/StaticNotificationPrompt";

export const metadata = {
  title: "Agency Website | Portfolio & Services",
  description: "We build websites, SaaS apps, and digital solutions.",
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
