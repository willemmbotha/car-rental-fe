"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@descope/react-sdk";
import Navbar from "@/components/navbar/navbar";
import React from "react";
import { SnackbarProvider } from "notistack";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider projectId={`${process.env.NEXT_PUBLIC_DESCOPE_PROJECT_ID}`}>
          <Navbar></Navbar>
          <SnackbarProvider maxSnack={3}>
            {children}
          </SnackbarProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
