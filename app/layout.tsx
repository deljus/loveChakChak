import type { Metadata } from "next";
import "react-day-picker/style.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Love chak chak",
  description: "Сайт по предзаказу чак чака",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light">
      <body className="bg-linear-to-r from-pink-200 via-purple-400 to-indigo-600">
        {children}
      </body>
    </html>
  );
}
