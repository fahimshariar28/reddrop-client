"use client";

import { useGetCollaboratorsQuery } from "@/redux/api/collaboratorsApi";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Marquee from "react-fast-marquee";

const Collaborators = () => {
  const { data } = useGetCollaboratorsQuery({});

  return (
    <section className="px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold mb-8 text-center">
          Our Collaborators
        </h2>
        <Marquee pauseOnHover={true} gradient={true} speed={40}>
          {data?.map((item) => (
            <div key={item._id} className="mx-8">
              <Link
                href={`${item.url}`}
                className="w-32 h-32 bg-gray-200 rounded-lg flex items-center justify-center"
                title={item.name}
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  width={100}
                  height={100}
                />
              </Link>
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
};

export default Collaborators;
