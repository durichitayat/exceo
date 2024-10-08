import type { Metadata } from "next";
import Head from "next/head";
import { Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});
export const metadata: Metadata = {
  title: "ExCEO.ai",
  description: "More time for what matters",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link
          rel="icon"
          href="/favicon.ico"
          sizes="any"
        />
      </Head>
      <body className={`${roboto.style} ${roboto.style} text-base antialiased`}>
        {children}
      </body>
    </html>
  );
}
