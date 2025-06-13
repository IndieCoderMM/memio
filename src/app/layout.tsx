import Navbar from "@/components/navbar";
import type { Metadata } from "next";
import { Reddit_Mono, Source_Sans_3, Unica_One } from "next/font/google";
import { Flip, ToastContainer } from "react-toastify";
import "./globals.css";

const redditMono = Reddit_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: "400",
});

const unicaOne = Unica_One({
  variable: "--font-title",
  subsets: ["latin"],
  weight: "400",
});

const sourceSans = Source_Sans_3({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Memio",
  description: "Memory training app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`relative ${redditMono.variable} h-full ${unicaOne.variable} ${sourceSans.variable} antialiased`}
      >
        <Navbar />
        <main className="relative min-h-screen pt-[80px]">{children}</main>
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          transition={Flip}
        />
      </body>
    </html>
  );
}
