import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

// ✅ جلب البيانات
async function getData() {
  const res = await fetch(
    "https://projectapi-ekhpcndsdgbahqhm.canadacentral-01.azurewebsites.net/api/categories",
    {
      cache: "force-cache",
      next: { revalidate: 60 },
    }
  );

  if (!res.ok) throw new Error("Failed to fetch data");
  return res.json();
}

// ✅ صفحة GoSearch - مبنية على ID السيرفيس
export default async function GoSearch({ params }) {
  const serviceId = params.id;

  const data = await getData();

  const allServices =
    data?.data?.flatMap((category) => category.services || []) || [];

  // ✅ ابحث عن السيرفيس بناءً على ID
  const selectedService = allServices.find(
    (s) => String(s.id) === String(serviceId)
  );

  if (!selectedService) return notFound();

  const heroImage = selectedService.pictureUrl || "/images/default-hero.jpg";

  const workers = selectedService.workers || [];

  return (
    <div className="">
      {/* صورة الهيرو + العنوان والوصف في صف */}
      <div className="max-w-6xl mx-auto my-6 px-4 flex flex-col md:flex-row gap-6 items-center">
        {/* الصورة على اليسار */}
        <div className="w-full md:w-1/2">
          <Image
            src={heroImage}
            alt={`Banner for ${selectedService.name}`}
            width={600}
            height={400}
            className="rounded-lg object-cover w-full h-auto"
          />
        </div>

        {/* النصوص على اليمين */}
        <div className="w-full md:w-1/2">
          <h2 className="text-xl font-semibold text-green-700 mb-2">
            🔹 Top {selectedService.name} workers near you
          </h2>
          <p className="text-gray-600 text-sm mb-4">
            These workers have been highly rated for knowledge, experience, and
            customer satisfaction.
          </p>
          <hr className="border-gray-300" />
        </div>
      </div>

      {/* قائمة العمال */}
      <div className="max-w-5xl mx-auto bg-white rounded-lg">
        {workers.length > 0 ? (
          workers.map((worker) => (
            <div key={worker.id}>
              <div className="group flex items-center border pb-4 mb-4 border-gray-200 bg-white rounded-lg p-4">
                <div>
                  <Image
                    src={worker.profilePicture || "/images/default-user.png"}
                    alt={worker.name || "Worker profile"}
                    width={80}
                    height={80}
                    className="rounded-lg bg-gray-200"
                  />
                </div>
                <div className="flex-1 px-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {worker.name}
                  </h3>
                  <p className="text-gray-600 text-sm">{worker.email}</p>
                  <p className="text-gray-600 text-sm">{worker.city}</p>
                  <p className="text-gray-600 text-sm">
                    {worker.rating || "No rating available"} ⭐
                  </p>
                </div>
                <div className="grid grid-cols-1">
                  <Link
                    href={`/request/${worker.id}`}
                    className="mb-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-white hover:text-black"
                  >
                    Request Quote
                  </Link>
                  <Link
                    href={`/viewprofile/${worker.id}`}
                    className="mt-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-white hover:text-black"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600 text-sm py-10">
            No workers found for this service.
          </p>
        )}
      </div>
    </div>
  );
}
