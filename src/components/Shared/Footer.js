import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white p-8">
      {/* Top Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <Link href="/">
          <Image
            src="/logo-with-text.png"
            width={150}
            height={150}
            alt="logo"
          />
        </Link>
        <div className="flex items-center md:items-end gap-5">
          <p className="mb-2">Ready to get started?</p>
          {/* Register Button */}
          <Link
            href="/register"
            className="bg-white text-gray-900 hover:bg-red-600 hover:text-white transition-colors px-6 py-2 rounded"
          >
            Register Now
          </Link>
        </div>
      </div>
      {/* Bottom Section */}
      <div className="mt-8 border-t border-gray-700 pt-4 flex flex-col md:flex-row justify-between items-center">
        <div className="flex space-x-4 mb-4 md:mb-0">
          <Link href="/terms-and-conditions" className="hover:underline">
            Terms &amp; Conditions
          </Link>
          <Link href="/privacy-policy" className="hover:underline">
            Privacy Policy
          </Link>
        </div>

        {/* Social Icons */}
        <div className="flex space-x-4">
          <a href="#" aria-label="Facebook" className="hover:text-red-600">
            <FaFacebookF />
          </a>
          <a href="#" aria-label="Twitter" className="hover:text-red-600">
            <FaTwitter />
          </a>
          <a href="#" aria-label="Instagram" className="hover:text-red-600">
            <FaInstagram />
          </a>
        </div>
      </div>
    </footer>
  );
}
