import Header from "@/components/Shared/Header";
import "./globals.css";
import Footer from "@/components/Shared/Footer";
import Providers from "@/lib/Providers/Providers";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "Red Drop",
  description: "Red Drop is a blood donation platform.",
};

export default function RootLayout({ children }) {
  return (
    <Providers>
      <html lang="en">
        <body>
          <Header />
          {children}
          <Footer />
          <Toaster />
        </body>
      </html>
    </Providers>
  );
}
