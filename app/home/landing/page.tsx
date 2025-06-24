import Image from "next/image";

const features = [
  {
    id: 1,
    title: "Get high quality services",
    description:
      "To make our sector more confidence, you can check the quality of the service provider's works by reading real reviews from customers who have previously worked with them.",
    image: "/images/quality.png",
    align: "right",
  },
  {
    id: 2,
    title: "Save your time",
    description:
      "Don't waste your time checking references from family and friends. Get personalized offers that increase your work comfort, and have your time spared with a better service.",
    image: "/images/time.png",
    align: "left",
  },
  {
    id: 3,
    title: "Be confident",
    description:
      "You can trust our team to give you the support and peace of mind.",
    image: "/images/safe.png",
    align: "right",
  },
];

export default function Landing() {
  return (
    <section className="grid grid-cols-1 gap-10 p-10">
      {features.map((feature, _) => (
        <div
          key={feature.id}
          className={`flex gap-5 ${
            feature.align === "left" ? "flex-row-reverse" : ""
          }`}
        >
          <div className="relative">
            <Image
              src={feature.image}
              alt={feature.title}
              objectFit="contain"
              width={600}
              height={600}
            />
          </div>
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold">{feature.title}</h3>
            <p className="text-gray-600 mt-2">{feature.description}</p>
          </div>
        </div>
      ))}
    </section>
  );
}
