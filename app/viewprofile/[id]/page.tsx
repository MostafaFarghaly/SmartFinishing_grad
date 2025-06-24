import React from 'react'
import Image from 'next/image'

export default function ViewProfile() {
return (<>
    <div className="p-4 bg-white" >
        <div className="flex border-b pb-4 mb-4">
            <Image src="/images/Container" alt="Company Logo" width={60} height={100}className="rounded-lg" />
            <div className="ml-4">
                <h1 className="text-2xl font-semibold">Dr.Flow Heating & Cooling Inc</h1>
                <p className="text-red-500">⭐⭐⭐⭐⭐ 5.0 (24 reviews)</p>
            </div>
        </div>
    </div>
    <div className="flex gap-6 bg-white h-screen">
        <div>
             {/* About Section */}
        <div className="mb-6">
            <h2 className="text-lg font-semibold">About</h2>
            <p className="text-gray-600 text-sm">Dr.Flow Heating & Cooling is known for affordability and customer satisfaction! We handle installation, maintenance, and repair.</p>
            <button className="mt-4 bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition">Request a quote</button>
        </div>
        {/* Highlights Section */}
        <div className="grid grid-cols-2 gap-4 border-t pt-4 mb-6">
            <div>
                <h3 className="text-sm font-semibold">Highlights</h3>
                <ul className="text-gray-600 text-sm list-disc pl-4">
                    <li>Fixed Prices</li>
                    <li>10+ Years in Business</li>
                </ul>
            </div>
            <div>
                <h3 className="text-sm font-semibold">Social Media</h3>
                <p className="text-blue-500">🌐 @drflowheating</p>
            </div>
        </div>
         {/* Reviews Section */}
        <div className="border-t pt-4 mb-6">
            <h2 className="text-lg font-semibold">Reviews</h2>
            <p className="text-green-600 text-xl font-bold">5.0</p>
            <p className="text-sm text-gray-600">⭐⭐⭐⭐⭐ (24 reviews)</p>
            <div className="mt-4">
                <p className="text-sm font-semibold">Chris L.</p>
                <p className="text-gray-600 text-sm">"Great service, quick response, and professional team! Highly recommended."</p>
            </div>
            <div className="mt-4">
                <p className="text-sm font-semibold">Maria S.</p>
                <p className="text-gray-600 text-sm">"Knowledgeable staff and excellent pricing!"</p>
            </div>
        </div>
        </div>
        {/* Photos Section */}
        <div className="pt-4">
            <h2 className="text-lg font-semibold mb-4">Photos and Videos</h2>
            <div className="grid grid-cols-3 gap-2">
                <Image src="/images/photo1.jpg" alt="Work Image" width={100} height={100} className="rounded-lg" />
                <Image src="/images/photo2.jpg" alt="Work Image" width={100} height={100} className="rounded-lg" />
                <Image src="/images/photo3.jpg" alt="Work Image" width={100} height={100} className="rounded-lg" />
                <Image src="/images/photo4.jpg" alt="Work Image" width={100} height={100} className="rounded-lg" />
                <Image src="/images/photo5.jpg" alt="Work Image" width={100} height={100} className="rounded-lg" />
                <Image src="/images/photo6.jpg" alt="Work Image" width={100} height={100} className="rounded-lg" />
            </div>
        </div>
    </div>
    
</>)
}
