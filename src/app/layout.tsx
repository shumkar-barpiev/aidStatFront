import React from "react";
import type { Metadata } from "next";
import Providers from "@/app/providers";

export const metadata: Metadata = {
  title: "Aid Stat - Aid Stat",
  description: "Автоматизированная система учета внешней (донорской) помощи",
  icons: {
    icon: "/aid.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
