"use client";

import React, { useState } from "react";
import Link from "next/link";

// كارت عرض الخدمة
const ServiceCard = ({ name, img, price, comments }) => (
    <div className="rounded-lg overflow-hidden shadow bg-gradient-to-t from-gray-900/80 to-gray-700/40 relative flex flex-col justify-end"
        style={{
        backgroundImage: `url('${img}')`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        height: "260px",
        minWidth: "260px",
        }}>
        <div className="absolute top-3 left-3 bg-green-500 text-white text-xs px-3 py-1 rounded-full">
        Start from {price}
        </div>
        <div className="p-4 z-10">
        <h3 className=" text-base font-semibold">{name}</h3>
        <p className="text-gray-200 text-xs">{comments} certified comments</p>
        </div>
    </div>
    );

    export default function PopularSlider({ services }) {
    const [start, setStart] = useState(0);
    const visibleCount = 4;

    const canPrev = start > 0;
    const canNext = start + visibleCount < services.length;

    const handlePrev = () => {
        if (canPrev) setStart(start - 1);
    };

    const handleNext = () => {
        if (canNext) setStart(start + 1);
    };

    return (
        <section className="bg-white py-16 px-4">
        <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            Discover Most Popular Services
            </h2>
            <p className="text-gray-600">
            Explore our most in-demand services, trusted by customers for their exceptional quality and reliability.
            </p>
        </div>

        <div className="relative flex items-center justify-center mb-10">
            {/* السهم لليسار */}
            <button
            onClick={handlePrev}
            disabled={!canPrev}
            className={`z-10 w-10 h-10 flex items-center justify-center rounded-full bg-green-500 text-white text-2xl shadow transition hover:bg-green-600 absolute left-0 ${!canPrev && "opacity-40 cursor-not-allowed"}`}
            aria-label="Previous"
            >
            &#8592;
            </button>

            {/* الكروت */}
            <div className="flex gap-6 mx-14 w-full justify-center ">
            {services.slice(start, start + visibleCount).map((service, idx) => (
                <ServiceCard key={start + idx} {...service} />
            ))}
            </div>

            {/* السهم لليمين */}
            <button
            onClick={handleNext}
            disabled={!canNext}
            className={`z-10 w-10 h-10 flex items-center justify-center rounded-full bg-green-500 text-white text-2xl shadow transition hover:bg-green-600 absolute right-0 ${!canNext && "opacity-40 cursor-not-allowed"}`}
            aria-label="Next"
            >
            &#8594;
            </button>
        </div>

        {/* زر عرض كل الخدمات */}
        <div className="flex justify-center items-center gap-4 mt-4">
            <Link href="/allservices">
            <button className="bg-green-500 hover:bg-green-600 text-white font-semibold px-8 py-3 rounded-full shadow transition flex items-center gap-2">
                View all Services <span className="text-xl">&#8594;</span>
            </button>
            </Link>
        </div>
        </section>
    );
    
}
