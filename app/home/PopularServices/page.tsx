import PopularSlider from "../../components/PopularSlider";

async function getPopularServices() {
    const res = await fetch(
        "https://projectapi-ekhpcndsdgbahqhm.canadacentral-01.azurewebsites.net/api/categories",
        {
        cache: "no-store",
        next: { revalidate: 60 },
        }
    );

    if (!res.ok) throw new Error("Failed to fetch services");

    const json = await res.json();
    return json.data.map((category) => ({
        name: category.name,
        img: category.services[1].pictureUrl ,
        price: "EGP 100",
        comments: category.services[0].workers.length || 0,
    }));
}
    export default async function PopularServicesPage() {
    const services = await getPopularServices();

    return <PopularSlider services={services} />;
}
