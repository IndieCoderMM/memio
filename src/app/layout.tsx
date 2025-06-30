import Navbar from "@/components/navbar";
import type { Metadata } from "next";
import { Poppins, Reddit_Mono, Unica_One } from "next/font/google";
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

const poppins = Poppins({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400"],
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
        className={`relative ${redditMono.variable} h-full ${unicaOne.variable} ${poppins.variable} antialiased`}
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
