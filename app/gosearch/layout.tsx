import { Metadata } from "next";
import Navbar from "../components/Navbar/page";
import Footer from "../components/Footer/page";

export const metadata: Metadata = {
    title: "Service Search",
    description: "Generated by create next app",
};

export default function AuthLayout({children,}: Readonly<{children: React.ReactNode;}>) {
return(<>
    <Navbar  />
    {children}
    <Footer />
</>);
}