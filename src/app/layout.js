import Header from "@/components/Shared/Header";
import "./globals.css";
import Footer from "@/components/Shared/Footer";

export const metadata = {
  title: "Rokto Bondhu",
  description: "Rokto Bondhu is a blood donation platform.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Header />
      <body>{children}</body>
      <Footer />
    </html>
  );
}
