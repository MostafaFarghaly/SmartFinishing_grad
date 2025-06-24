"use client";
import Image from 'next/image';
import { Search } from "lucide-react";
import { useState } from "react";

export default function Home() {
    const [search, setSearch] = useState("");

    return (
        <div className="min-h-screen bg-gradient-to-r from-black via-gray-900 to-gray-800 text-white">
            {/* Hero Section */}
            <div className="flex flex-col md:flex-row items-center justify-between px-10 py-16">
                {/* Left: Text */}
                <div className="md:w-1/2 space-y-6">
                    <h1 className="text-4xl md:text-5xl font-bold">
                        Transform <span className="text-green-400">Your Home</span> With Our <br />
                        <span className="text-green-400">Professional Finishing</span> services
                    </h1>
                    <p className="text-gray-300">
                        We help families transform their homes with professional finishing and maintenance services.
                    </p>
                    <div className="flex gap-4">
                        <button className="px-6 py-3 bg-green-500 rounded-lg hover:bg-green-600 transition">join us</button>
                        <button className="px-6 py-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition">Transform Your house now</button>
                    </div>
                    {/* Search Bar */}
                    <div className="flex mt-6">
                        <input
                        type="text"
                        placeholder="Hire a professional now"
                        className="w-full px-4 py-3 rounded-l-lg text-black"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        />
                        <button className="px-6 py-3 bg-green-500 rounded-r-lg hover:bg-green-600 transition">
                        <Search className="text-white" size={28} />
                        </button>
                    </div>
                </div>
                {/* Right: Image */}
                <div className="md:w-1/2 mt-10 md:mt-0 flex justify-end">
                    <div className="rounded-2xl overflow-hidden shadow-2xl w-[420px] h-[280px]">
                        <Image
                        src="/images/Root.png"
                        alt="Modern House"
                        width={420}
                        height={280}
                        className="object-cover w-full h-full"
                        />
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-center mt-10">
                <p className="mb-4 text-lg">What service are you looking for?</p>            
            </div>
        </div>
    );
}