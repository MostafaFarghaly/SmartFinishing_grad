import Image from "next/image";
import Navbar from "../components/Navbar/page";
import Footer from "../components/Footer/page";
import HomeCleaningSlider from "../components/HomeCleaningSlider"; // المسار حسب مكان الملف

async function getData() {
  const res = await fetch(
    "https://projectapi-ekhpcndsdgbahqhm.canadacentral-01.azurewebsites.net/api/categories",
    {
      cache: "no-store", // أو استخدم revalidate حسب الحاجة
    }
  );

  if (!res.ok) throw new Error("Failed to fetch data");

  const json = await res.json();

  return json.data.map((category) => ({
    categoryName: category.name,
    services: category.services.map((s) => ({
      id: s.id,
      name: s.name,
      img: s.pictureUrl ,
    })),
  }));
}

const CleaningServicesBanner = () => (
  <div
    className="relative w-full h-[380px] flex items-center bg-cover bg-center"
    style={{
      backgroundImage: "url(/images/allservicesBackground.png)",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
    }}
  >
    <div className="absolute inset-0 bg-black bg-opacity-50"></div>
    <div className="relative z-10 text-white px-6 max-w-2xl">
      <span className="bg-green-600 text-white px-3 py-1 rounded-full text-base font-medium">
        Integrated Home Solutions
      </span>
      <h1 className="text-3xl font-bold mt-3">
        Discover LOGO Distinctive Services
      </h1>
      <p className="mt-2 text-base leading-relaxed">
        Master Clean provides you with integrated home solutions, where quality meets professionalism in every service we provide.
      </p>
    </div>
  </div>
);

const CleaningServicesSection = () => (
  <div className="w-full flex items-center justify-between bg-green-900 relative min-h-[500px] px-16 rounded-t-2xl mt-16">
    <div className="w-1/2 max-w-xl">
      <h2 className="text-4xl font-bold leading-tight text-white">
        Your ideal choice in the world of cleaning
      </h2>
      <p className="mt-4 text-lg leading-relaxed text-white">
        <span className="text-green-300 font-semibold">logo</span> is not just
        a cleaning company, it is your partner in maintaining a healthy and beautiful environment.
      </p>
      <div className="flex gap-10 mt-6 text-lg text-white">
        <ul className="space-y-3">
          <li className="flex items-center gap-2">Extensive experience</li>
          <li className="flex items-center gap-2">Professional work team</li>
          <li className="flex items-center gap-2">Competitive prices</li>
        </ul>
        <ul className="space-y-3">
          <li className="flex items-center gap-2">Quality assurance</li>
          <li className="flex items-center gap-2">Excellent customer service</li>
          <li className="flex items-center gap-2">Various services</li>
        </ul>
      </div>
    </div>
    <div className="absolute bottom-0 right-0">
      <Image
        src="/images/allservices.png"
        alt="Cleaning Team"
        width={650}
        height={450}
        className="object-cover"
      />
    </div>
  </div>
);

export default async function AllServices() {
  const data = await getData();

  return (
    <div>
      <Navbar />
      <CleaningServicesBanner />
      <section className="py-10 bg-white container mx-auto px-4">
        {data.map((group, index) => (
          <HomeCleaningSlider
            key={index}
            category={group.categoryName}
            services={group.services}
          />
        ))}
      </section>
      <CleaningServicesSection />
      <Footer />
    </div>
  );
}
