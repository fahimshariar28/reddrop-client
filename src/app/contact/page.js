"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { FaFacebookF, FaLinkedin } from "react-icons/fa";

export default function ContactUs() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    // Here you would typically send the form data to your server
    console.log("Form submitted:", data);
    // Reset form after submission
    reset();
    alert("Thank you for your message. We will get back to you soon!");
  };

  return (
    <div className="bg-red-50 min-h-screen pt-16 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Contact Us
          </h1>
          <p className="mt-4 text-lg text-gray-500">
            Have questions about blood donation? We&apos;re here to help!
          </p>
        </div>
        <div className="mt-12">
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2">
            <div>
              <h2 className="text-lg font-medium text-gray-900">
                Contact Information
              </h2>
              <dl className="mt-4 text-base text-gray-500">
                <div>
                  <dt className="sr-only">Address</dt>
                  <dd>
                    <p>123 Blood Donation Street</p>
                    <p>City, State 12345</p>
                  </dd>
                </div>
                <div className="mt-4">
                  <dt className="sr-only">Phone number</dt>
                  <dd>
                    <Link
                      href="tel:+8801955477668"
                      className="hover:underline hover:text-red-600"
                    >
                      +880 1955 477668
                    </Link>
                  </dd>
                </div>
                <div className="mt-4">
                  <dt className="sr-only">Email</dt>
                  <dd>
                    <Link
                      href="mailto:fahimshariar28@gmail.com"
                      className="hover:underline hover:text-red-600"
                    >
                      fahimshariar28@gmail.com
                    </Link>
                  </dd>
                </div>
              </dl>
              <div className="mt-8">
                <h3 className="text-lg font-medium text-gray-900">Follow us</h3>
                <div className="mt-4 flex space-x-6">
                  <Link
                    rel="noopener noreferrer"
                    target="_blank"
                    href="https://www.facebook.com/RedDrop.Official/"
                    aria-label="Facebook"
                    className="text-gray-400 hover:text-red-600 text-2xl"
                  >
                    <FaFacebookF />
                  </Link>
                  <Link
                    rel="noopener noreferrer"
                    target="_blank"
                    href="https://www.linkedin.com/company/red-drop"
                    aria-label="LinkedIn"
                    className="text-gray-400 hover:text-red-600 text-2xl"
                  >
                    <FaLinkedin />
                  </Link>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-lg font-medium text-gray-900">
                Send us a message
              </h2>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="mt-4 grid grid-cols-1 gap-y-6"
              >
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Name
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="name"
                      {...register("name", { required: "Name is required" })}
                      className="py-3 px-4 block w-full shadow-lg focus:ring-red-500 focus:border-red-500 border-gray-300 rounded-md"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.name.message}
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <div className="mt-1">
                    <input
                      type="email"
                      id="email"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address",
                        },
                      })}
                      className="py-3 px-4 block w-full shadow-sm focus:ring-red-500 focus:border-red-500 border-gray-300 rounded-md"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Message
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="message"
                      rows="4"
                      {...register("message", {
                        required: "Message is required",
                      })}
                      className="py-3 px-4 block w-full shadow-sm focus:ring-red-500 focus:border-red-500 border-gray-300 rounded-md"
                    ></textarea>
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.message.message}
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center py-3 px-6 border border-black hover:border-red-600 shadow-sm text-base font-medium rounded-md text-black bg-transparent hover:text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Send message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
