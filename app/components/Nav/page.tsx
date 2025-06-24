"use client";
import Link from "next/link";
import { useToken } from "../../context/token_context";
import { useLoginClient } from "../../context/regester/login_context";
import { UserCircleIcon, ChevronDownIcon, ArrowRightOnRectangleIcon, LifebuoyIcon } from "@heroicons/react/24/outline";
import { useState, useRef, useEffect } from "react";

export default function MinimalNavbar() {
    const { userData, logOut } = useToken();
    const { saveData } = useLoginClient();
    const [dropOpen, setDropOpen] = useState(false);
    const dropRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
        if (dropRef.current && !dropRef.current.contains(e.target)) {
            setDropOpen(false);
        }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <nav className="relative p-4 text-black shadow-md backdrop-blur-sm">
        <div className="container mx-auto flex justify-between items-center">
            {/* Logo */}
            <Link href="/" className="text-xl font-bold  flex items-center">
            <span className="inline-block w-5 h-5 mr-2  rounded-full" />
            logo
            </Link>

            {/* Right section */}
            <div className={`lg:flex lg:items-center lg:w-auto  w-full lg:block mt-4 lg:mt-0`} ref={dropRef}>
                {userData ? (
                    <>
                    <div className="flex gap-4 font-medium px-2">
                        <Link href="/requests" className=" hover:text-green-400 px-3 py-1 rounded">Requests</Link>
                        <Link href="/inbox" className="hover:text-green-400 px-3 py-1 rounded">Inbox</Link>
                    </div>

                    <div className="relative ml-4">
                        <button
                        onClick={() => setDropOpen(!dropOpen)}
                        className="flex items-center bg-green-500 text-white px-4 py-2 rounded-md hover:bg-opacity-90 focus:outline-none"
                        >
                        <UserCircleIcon className="h-5 w-5" />
                        <span className="ml-2">{saveData.displayName.split(' ')[0]}</span>
                        <ChevronDownIcon className={`h-4 w-4 ml-1 transform transition-transform ${dropOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {dropOpen && (
                        <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-[9999] overflow-hidden text-black">
                            <Link href="/account" className="flex items-center px-4 py-2 hover:bg-gray-100">
                            <UserCircleIcon className="h-5 w-5 mr-2 text-gray-600" /> Account
                            </Link>
                            <Link href="/support" className="flex items-center px-4 py-2 bg-green-50 hover:bg-green-100">
                            <LifebuoyIcon className="h-5 w-5 mr-2 text-green-600" /> Support
                            </Link>
                            <button
                            onClick={logOut}
                            className="w-full text-left flex items-center px-4 py-2 hover:bg-gray-100"
                            >
                            <ArrowRightOnRectangleIcon className="h-5 w-5 mr-2 text-gray-600" /> Log out
                            </button>
                        </div>
                        )}
                    </div>
                    </>
                ) : (
                    <div className="flex items-center justify-center space-x-4">
                    <Link href="/login" className="px-4 py-2 border text-white rounded-md hover:bg-gray-100">
                        Login
                    </Link>
                    <Link href="/signup" className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
                        Sign Up
                    </Link>
                    </div>
                )}
            </div>
        </div>
        </nav>
    );
}
