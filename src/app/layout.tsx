import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DrugReactor - Check Drug Interactions & Get Supplement Guidance",
  description: "Check drug interactions and get personalized supplement guidance for your medications. Safe, reliable, and easy to use.",
  keywords: "drug interactions, medication interactions, supplement guidance, medication safety, pharmacy, drug checker",
  authors: [{ name: "DrugReactor" }],
  openGraph: {
    title: "DrugReactor - Check Drug Interactions",
    description: "Check drug interactions and get personalized supplement guidance for your medications.",
    type: "website",
    url: "https://drugreactor.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "DrugReactor - Check Drug Interactions",
    description: "Check drug interactions and get personalized supplement guidance for your medications.",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-1QQZMZFGLS"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-1QQZMZFGLS');
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
