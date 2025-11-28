import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Slate360",
  description: "The Operating System for the Physical World",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
