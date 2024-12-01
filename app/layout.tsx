import type { Metadata } from "next";
import { headers } from "next/headers";
import { Roboto } from "next/font/google";
import Header from "@/components/website-ui/header";
import AdminHeader from "@/components/admin-ui/header";
import Footer from "@/components/ui/footer";
import "./globals.css";

const roboto = Roboto({
  weight: ["400", "700"],
  style: "normal",
  subsets: ["latin"],
  display: "swap",
});
export const metadata: Metadata = {
  title: "ExCEO",
  description: "More time for what matters",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = headers();
  const isPlatformSubdomain =
    headersList.get("x-is-platform-subdomain") === "true";
  console.log("isPlatformSubdomain", isPlatformSubdomain);

  return (
    <html lang="en">
      <body className={`${roboto.style}`}>
        {isPlatformSubdomain ? (
          <AdminHeader>{children}</AdminHeader>
        ) : (
          <Header />
        )}
        <Footer />
      </body>
    </html>
  );
}
