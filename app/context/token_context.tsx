"use client";
import { createContext, useContext, useState, useEffect } from "react";
import {jwtDecode} from "jwt-decode";

const TokenContext = createContext();
export function TokenProvider({ children }) {
    const [userData, setUserData] = useState(null);

    function saveUserData() {
        let encodedToken = localStorage.getItem("token");
    
        if (!encodedToken || encodedToken.split(".").length !== 3) {
            // console.warn("Invalid or missing token");
            return;
        }
        const decodedToken = jwtDecode(encodedToken);
        setUserData(decodedToken);
        console.log(decodedToken);        
    }
    

    useEffect(() => {
        saveUserData();
    }, []);

    function logOut(){
        // localStorage.removeItem('token');
        localStorage.clear();
        setUserData(null);
        window.location.href = "/";
    }
return (
    <TokenContext.Provider value={{ userData, saveUserData, logOut }}>
    {children}
    </TokenContext.Provider>
);
}

export function useToken() {
    return useContext(TokenContext);
}
