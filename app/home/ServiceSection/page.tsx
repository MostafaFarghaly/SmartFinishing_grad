"use client";
import Image from "next/image";
import React from "react";
import Link from "next/link";

const steps = [
    {
        icon: "/images/choose-service.png",
        title: "Choose Your Service",
        desc: "Select the type of work you need, such as plumbing, carpentry, painting, or more.",
        dotColor: "bg-purple-400",
        bg: "bg-purple-100",
    },
    {
        icon: "/images/define-space.png",
        title: "Define Your Space",
        desc: "Pick your apartment type and size so we understand your environment.",
        dotColor: "bg-green-400",
        bg: "bg-green-100",
    },
    {
        icon: "/images/set-style.png",
        title: "Set Your Style and Budget",
        desc: "Tell us your preferred design style and how much you plan to spend.",
        dotColor: "bg-pink-200",
        bg: "bg-pink-100",
    },
    {
        icon: "/images/add-details.png",
        title: "Add Project Details",
        desc: "Upload reference images and describe your needs in your own words.",
        dotColor: "bg-violet-400",
        bg: "bg-violet-100",
    },
    {
        icon: "/images/send-professional.png",
        title: "Send to a Professional",
        desc: "We'll match your project with the right expert near your location.",
        dotColor: "bg-pink-300",
        bg: "bg-pink-100",
    },
];

const ServiceSection = () => {
return (
    <section className="bg-white py-16 px-4" id="service-section">

        <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-2">Start Your Project Today</h2>
            <p className="text-gray-500 mb-12 max-w-2xl mx-auto">
                Whether you’re renovating your home or furnishing a new apartment,
                follow these simple steps to connect with top professionals.
            </p>

            {/* Steps with dotted lines */}
            <div className="relative flex flex-col items-center">
                {/* Top row */}
                <div className="grid grid-cols-3 gap-x-16 w-full mb-16">
                    {steps.slice(0, 3).map((step, idx) => (
                    <div key={idx} className="flex flex-col items-center relative">
                        <div
                        className={`mb-4 w-[80px] h-[80px] flex items-center justify-center rounded-xl shadow-md ${step.bg}`}
                        >
                        <Image
                            src={step.icon}
                            alt={step.title}
                            width={40}
                            height={40}
                        />
                        </div>
                        <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                        <p className="text-gray-500 text-sm">{step.desc}</p>
                        {/* Dot */}
                        <span
                        className={`absolute -bottom-6 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full ${step.dotColor}`}
                        ></span>
                        {/* Dotted line except last */}
                        {idx < 2 && (
                        <span className="absolute top-10 right-[-60px] w-[120px] h-0.5 border-t-2 border-dotted border-gray-300"></span>
                        )}
                    </div>
                    ))}
                </div>
                {/* Bottom row */}
                <div className="grid grid-cols-2 gap-x-16 w-2/3">
                    {steps.slice(3).map((step, idx) => (
                    <div key={idx} className="flex flex-col items-center relative">
                        <div
                        className={`mb-4 w-[80px] h-[80px] flex items-center justify-center rounded-xl shadow-md ${step.bg}`}
                        >
                        <Image
                            src={step.icon}
                            alt={step.title}
                            width={40}
                            height={40}
                        />
                        </div>
                        <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                        <p className="text-gray-500 text-sm">{step.desc}</p>
                        {/* Dot */}
                        <span
                        className={`absolute -bottom-6 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full ${step.dotColor}`}
                        ></span>
                        {/* Dotted line except last */}
                        {idx === 0 && (
                        <span className="absolute top-10 right-[-60px] w-[120px] h-0.5 border-t-2 border-dotted border-gray-300"></span>
                        )}
                    </div>
                    ))}
                </div>
            </div>

            {/* Start Project Button */}
            <div className="flex justify-center mt-16">
                <Link href="/startProject">
                    <button className="flex items-center gap-4 bg-green-500 hover:bg-green-600 text-white font-semibold px-8 py-3 rounded-full shadow transition">
                        <span className="text-xl">&#8592;</span>
                        <span>Start a new project</span>
                        <span className="text-xl">&#8594;</span>
                    </button>
                </Link>
            </div>
        </div>
    </section>
);
};

export default ServiceSection;
