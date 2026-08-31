import type { Metadata } from "next";
import Script from "next/script";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { openSans } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dr. Autoimmune",
  description:
    "Functional medicine care for autoimmune conditions from Dr. Autoimmune.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${openSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-ink font-sans" suppressHydrationWarning>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <Script id="knock-knock-config" strategy="afterInteractive">
          {`window.company_id = '6a872b568d06085e05e32947';`}
        </Script>
        <Script
          id="knock-knock-widget"
          src="https://api.knock-knockapp.com/widget/widget.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
