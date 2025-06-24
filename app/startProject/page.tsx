import StartProjectForm from "../components/StartProjectForm";

async function getData() {
    const [catRes, cityRes] = await Promise.all([
        fetch("https://projectapi-ekhpcndsdgbahqhm.canadacentral-01.azurewebsites.net/api/categories"),
        fetch("https://projectapi-ekhpcndsdgbahqhm.canadacentral-01.azurewebsites.net/api/cities"),
    ]);

    if (!catRes.ok || !cityRes.ok) throw new Error("Failed to fetch API data");

    const catJson = await catRes.json();
    const citiesArray = await cityRes.json(); // مفيش .data هنا

    const services = (catJson?.data || []).flatMap(category =>
        (category.services || []).map(s => ({
        id: s.id,
        name: s.name,
        }))
    );

    const cities = (citiesArray || []).map(city => city.name);

    return { services, cities };
}


    export default async function StartProjectPage() {
    const { services, cities } = await getData();
    return <StartProjectForm services={services} cities={cities} />;
    }