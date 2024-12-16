"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // TODO: Replace with actual user data
  const user = false;
  const pathname = usePathname();

  useEffect(() => {
    setIsMounted(true);

    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial scroll position

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navLinks = user
    ? [
        { href: "/", label: "Home" },
        { href: "/find-blood", label: "Find Blood" },
        { href: "/request", label: "Requests" },
        { href: "/donation", label: "Donations" },
        { href: "/contact", label: "Contact" },
      ]
    : [
        { href: "/", label: "Home" },
        { href: "/find-blood", label: "Find Blood" },
        { href: "/register", label: "Register" },
        { href: "/contact", label: "Contact" },
      ];

  if (!isMounted) {
    return null; // or a loading placeholder
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        isScrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="md:flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 hidden md:block">
            <Link href="/">
              <Image
                src="/logo-with-text.png"
                alt="logo"
                width={120}
                height={120}
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`hover:text-red-600 transition-colors pb-1 ${
                      pathname === link.href
                        ? "border-b-2 border-red-600 text-red-600"
                        : ""
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Desktop Button */}
          <div className="hidden md:block">
            <div className="flex items-center justify-center gap-3">
              {/* //TODO: Implement Message */}
              {/* Message */}
              {/* <Link href="/">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="44"
                  height="44"
                  fill="#000000"
                  className="rounded-full bg-gray-300 p-2"
                >
                  <path d="M12 2C6.486 2 2 6.202 2 11.5c0 3.068 1.672 5.866 4.35 7.629V22l4.058-2.188C11.232 19.912 11.612 20 12 20c5.514 0 10-4.202 10-8.5S17.514 2 12 2zm-1.53 11.063l-2.15-1.955-4.3 3.776 4.216-4.216 2.17 1.97 2.35-2.058 4.29-3.772-4.211 4.211-2.365 2.044z" />
                </svg>
              </Link> */}

              {/* Notification */}
              {user && (
                <Link href="/">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="44"
                    height="44"
                    fill="#000000"
                    className="rounded-full bg-gray-300 p-2"
                  >
                    <path d="M18.364 16.95L17 15.586V10c0-3.308-2.692-6-6-6S5 6.692 5 10v5.586l-1.364 1.364C3.226 17.033 3 17.508 3 18v1c0 .553.447 1 1 1h16c.553 0 1-.447 1-1v-1c0-.492-.226-.967-.636-1.05zM12 24c1.104 0 2-.896 2-2h-4c0 1.104.896 2 2 2z" />
                  </svg>
                </Link>
              )}

              {/* //TODO: Show Profile Picture instead of svg */}
              {/* Profile */}
              {user && (
                <Link href="/profile">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="44"
                    height="44"
                    fill="#000000"
                    className="rounded-full bg-gray-300 p-2"
                  >
                    <circle cx="12" cy="8" r="4" />
                    <path d="M12 14c-5 0-9 2.5-9 6v1h18v-1c0-3.5-4-6-9-6z" />
                  </svg>
                </Link>
              )}

              {/* Login */}
              {!user && (
                <Link
                  href="/login"
                  className="bg-white hover:bg-red-600 text-black hover:text-white font-semibold py-2 px-4 rounded transition-colors outline outline-2 outline-black hover:outline-none"
                >
                  Login
                </Link>
              )}
            </div>
          </div>

          {/* Mobile Header */}
          <div className="flex items-center justify-between w-full md:hidden">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600"
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
                <path
                  fillRule="evenodd"
                  d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                ></path>
              </svg>
            </button>

            {/* Mobile Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="text-xl font-bold">
                <Image
                  src="/logo-with-text.png"
                  alt="logo"
                  width={100}
                  height={100}
                />
              </Link>
            </div>

            {/* Mobile Button */}
            <div className="flex items-center justify-center gap-3">
              {/* //TODO: Implement Message */}
              {/* Message */}
              {/* <Link href="/">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="44"
                  height="44"
                  fill="#000000"
                  className="rounded-full bg-gray-300 p-2"
                >
                  <path d="M12 2C6.486 2 2 6.202 2 11.5c0 3.068 1.672 5.866 4.35 7.629V22l4.058-2.188C11.232 19.912 11.612 20 12 20c5.514 0 10-4.202 10-8.5S17.514 2 12 2zm-1.53 11.063l-2.15-1.955-4.3 3.776 4.216-4.216 2.17 1.97 2.35-2.058 4.29-3.772-4.211 4.211-2.365 2.044z" />
                </svg>
              </Link> */}

              {/* Notification */}
              {user && (
                <Link href="/">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="44"
                    height="44"
                    fill="#000000"
                    className="rounded-full bg-gray-300 p-2"
                  >
                    <path d="M18.364 16.95L17 15.586V10c0-3.308-2.692-6-6-6S5 6.692 5 10v5.586l-1.364 1.364C3.226 17.033 3 17.508 3 18v1c0 .553.447 1 1 1h16c.553 0 1-.447 1-1v-1c0-.492-.226-.967-.636-1.05zM12 24c1.104 0 2-.896 2-2h-4c0 1.104.896 2 2 2z" />
                  </svg>
                </Link>
              )}

              {/* //TODO: Show Profile Picture instead of svg */}
              {/* Profile */}
              {user && (
                <Link href="/profile">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="44"
                    height="44"
                    fill="#000000"
                    className="rounded-full bg-gray-300 p-2"
                  >
                    <circle cx="12" cy="8" r="4" />
                    <path d="M12 14c-5 0-9 2.5-9 6v1h18v-1c0-3.5-4-6-9-6z" />
                  </svg>
                </Link>
              )}

              {/* Login */}
              {!user && (
                <Link
                  href="/login"
                  className="bg-white hover:bg-red-600 text-black hover:text-white font-semibold py-2 px-4 rounded transition-colors outline outline-2 outline-black hover:outline-none"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden ${isMobileMenuOpen ? "block" : "hidden"}`}
          aria-hidden={!isMobileMenuOpen}
        >
          <div className="mt-2 pt-2 pb-4 border-t border-gray-200 flex">
            <nav className="flex-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block px-2 py-1 text-lg ${
                    pathname === link.href ? "font-bold text-red-600" : ""
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
