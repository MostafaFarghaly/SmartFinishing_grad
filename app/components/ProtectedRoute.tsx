"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useToken } from "../context/token_context";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
const { userData } = useToken();
const router = useRouter();

useEffect(() => {
if (!userData) {
    const token = localStorage.getItem("token");
    if (!token) {
    router.push("/login");
    }
}
}, [userData, router]);

if (!userData) return null; // أو Spinner هنا

return <>{children}</>;
}
