import "../styles/globals.css";
import Footer from "../components/Footer";
import Providers from "../components/Providers";
import Chatbot from "@/components/Chatbot";
import Header from "@/components/Header";

export const metadata = {
  title: "Agency Website | Portfolio & Services",
  description: "We build websites, SaaS apps, and digital solutions.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900" suppressHydrationWarning={true}>
        <Providers>
          <Header/>
          <main className="min-h-screen">{children}</main>
          <Footer />
          <Chatbot />
        </Providers>
      </body>
    </html>
  );
}
