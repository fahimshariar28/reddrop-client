import { FiEdit, FiHeart, FiCheck } from "react-icons/fi";
import Image from "next/image";
import heroImage from "@/assets/HomePage/hero-section.png";
import Link from "next/link";
import Collaborators from "@/components/Home/Collaborators";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="lg:flex items-center justify-center">
        <div className="lg:w-1/2">
          <Image src={heroImage} alt="Hero Section Picture" />
        </div>
        <div className="lg:w-1/2 px-6">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Save Life Donate Blood
            </h1>
            <p className="text-gray-600 mb-8">
              Join our mission to save lives through blood donation. Every drop
              counts in making a difference.
            </p>
            <Link
              href="/register"
              className="px-8 py-3 bg-white text-black rounded-full outline outline-2 outline-black hover:bg-red-600 hover:text-white hover:outline-none transition-colors"
            >
              Donate Now
            </Link>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mt-10 lg:mt-40 mb-12">
        <div className="shadow-xl mx-5 lg:mx-20 p-5">
          <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
          <p className="text-gray-600 ">
            We strive to connect blood donors with those in need, creating a
            seamless and efficient donation process. Our goal is to ensure that
            no life is lost due to a lack of blood supply. We believe that
            everyone has the power to save a life. Join us in our mission to
            make a difference.
          </p>
        </div>
      </section>

      {/* Collaborators Section */}
      <Collaborators />

      {/* How to Get Blood Section */}
      <section className="px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-semibold mb-12 text-center">
            How to Get Blood?
          </h2>

          <div className="grid grid-cols-1 gap-8">
            <div className="text-center mx-auto shadow-lg p-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-50 flex items-center justify-center">
                <FiHeart className="h-8 w-8 text-red-800" />
              </div>
              <h3 className="font-semibold mb-2">Find Match</h3>
              <p className="text-gray-600">
                We&apos;ll match you with compatible donors in your area
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="text-center shadow-lg p-6">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-50 flex items-center justify-center">
                  <FiEdit className="h-8 w-8 text-red-800" />
                </div>
                <h3 className="font-semibold mb-2">Register Request</h3>
                <p className="text-gray-600">
                  Fill out the blood request form with required details
                </p>
              </div>

              <div className="text-center shadow-lg p-6">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-50 flex items-center justify-center">
                  <FiCheck className="h-8 w-8 text-red-800" />
                </div>
                <h3 className="font-semibold mb-2">Receive Blood</h3>
                <p className="text-gray-600">
                  Get the required blood units at the specified time
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
