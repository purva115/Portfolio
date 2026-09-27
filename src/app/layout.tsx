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

const description =
  "Full stack software engineer in Charlotte, NC with 3+ years shipping backend services, data pipelines, and LLM-powered applications.";

export const metadata: Metadata = {
  metadataBase: new URL("https://aboutpurva.work"),
  title: "Purva Jagtap · Full Stack Software Engineer",
  description,
  openGraph: {
    title: "Purva Jagtap · Full Stack Software Engineer",
    description,
    url: "https://aboutpurva.work",
    siteName: "Purva Jagtap",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Purva Jagtap · Full Stack Software Engineer",
    description,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
