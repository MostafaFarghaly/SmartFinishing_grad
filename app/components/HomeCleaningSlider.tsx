"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function HomeCleaningSlider({ category, services }) {
    const slidesPerView = 4;
    const [start, setStart] = useState(0);

    const handlePrev = () => {
        setStart((prev) => Math.max(0, prev - 1));
    };

    const handleNext = () => {
        setStart((prev) => Math.min(services.length - slidesPerView, prev + 1));
    };

    return (
        <div className="mb-10">
        <h2 className="text-2xl font-bold mb-2">{category}</h2>
        <p className="mb-6">
            Enjoy a clean and healthy home with our services and get rid of dust and bacteria!
        </p>

        <div className="relative flex items-center">
            <button
            onClick={handlePrev}
            className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
            disabled={start === 0}
            >
            &#8592;
            </button>

            <div className="flex gap-4 w-full overflow-hidden px-2">
            {services.slice(start, start + slidesPerView).map((service, i) => (
                <Link
                href={`/gosearch/${service.id}`}
                key={i}
                className="bg-white rounded-xl shadow-md overflow-hidden min-w-[220px] max-w-[300px] flex-1"
                >
                <div className="relative w-full h-60">
                    <Image
                    src={service.img}
                    alt={service.name}
                    fill
                    className="object-cover"
                    />
                </div>
                <div className="p-4 text-center text-black font-semibold">
                    {service.name}
                </div>
                </Link>
            ))}
            </div>

            <button
            onClick={handleNext}
            className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
            disabled={start >= services.length - slidesPerView}
            >
            &#8594;
            </button>
        </div>
        </div>
    );
}
