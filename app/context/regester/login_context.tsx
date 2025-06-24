"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const LoginClientContext = createContext();

export function LoginClientProvider({ children }) {
    const [error, setErrors] = useState("");
    const [isLoading, setisLoading] = useState(false);
    const [saveData, setSaveData] = useState(null);     // بيانات المستخدم
    const [token, setToken] = useState(null);           // التوكن فقط

    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    // تحميل التوكن و userData من localStorage بعد الريفرش
    useEffect(() => {
        const storedUserData = localStorage.getItem("userData");
        const storedToken = localStorage.getItem("token");

        if (storedUserData) setSaveData(JSON.parse(storedUserData));
        if (storedToken) setToken(storedToken);
    }, []);

    function getUserData(eventInfo) {
        const updated = { ...user, [eventInfo.target.name]: eventInfo.target.value };
        setUser(updated);
    }

    async function sendData() {
        try {
        const { data } = await axios.post(
            `https://projectapi-ekhpcndsdgbahqhm.canadacentral-01.azurewebsites.net/api/account/login`,
            user,
            { validateStatus: () => true }
        );

        if (data.errors == null) {
            setisLoading(false);

            // حفظ التوكن وبيانات المستخدم كل على حدة
            localStorage.setItem("token", data.token);
            localStorage.setItem("userData", JSON.stringify(data));

            setToken(data.token);
            setSaveData(data);

            window.location.href = "/";
        } else {
            setisLoading(false);
            setErrors(data.errors);
        }
        } catch (error) {
        setisLoading(false);
        setErrors("فشل الاتصال بالخادم.");
        }
    }

    function submitForm(e) {
        e.preventDefault();
        setisLoading(true);
        sendData();
    }

    async function updateProfilePicture(file) {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("لم يتم العثور على التوكن، يرجى تسجيل الدخول مجددًا.");
    }

    try {
        const formData = new FormData();
        formData.append("newProfilePicture", file);

        const response = await fetch(
        "https://projectapi-ekhpcndsdgbahqhm.canadacentral-01.azurewebsites.net/api/Account/update-profile-picture",
        {
            method: "PUT",
            headers: {
            Authorization: `Bearer ${token}`,
            },
            body: formData,
        }
        );

        if (!response.ok) {
        const result = await response.json();
        throw new Error(result.message || "فشل رفع الصورة");
        }

        const newUrl = await response.text(); // السيرفر بيرجع رابط الصورة كنص

        const oldDataRaw = localStorage.getItem("userData");
        if (!oldDataRaw) throw new Error("بيانات المستخدم غير موجودة");

        const oldData = JSON.parse(oldDataRaw);
        const updatedData = { ...oldData, profilePictureUrl: newUrl };

        localStorage.setItem("userData", JSON.stringify(updatedData));
        setSaveData(updatedData);

        return newUrl;
    } catch (error) {
        console.error("فشل رفع الصورة:", error);
        throw error;
    }
    }
    
async function updateAccountInfo(updatedFields) {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("لم يتم العثور على التوكن");

  try {
    const response = await fetch(
      "https://projectapi-ekhpcndsdgbahqhm.canadacentral-01.azurewebsites.net/api/Account/update",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedFields),
      }
    );

    if (!response.ok) {
      const text = await response.text();
      let result = {};
      try {
        result = JSON.parse(text);
      } catch {
        result.message = text || "فشل التحديث";
      }
      throw new Error(result.message || "فشل التحديث");
    }

    // ✅ نجيب اسم المدينة
    let cityName = "";
    try {
      const cityRes = await fetch("https://projectapi-ekhpcndsdgbahqhm.canadacentral-01.azurewebsites.net/api/Cities");
      const cityList = await cityRes.json();
      const foundCity = Array.isArray(cityList)
        ? cityList.find((c) => c.id === updatedFields.cityId)
        : null;

      cityName = foundCity?.name || "";
    } catch (err) {
      console.warn("فشل في جلب اسم المدينة:", err);
    }

    // ✅ نحدث userData يدويًا
    const oldDataRaw = localStorage.getItem("userData");
    const oldData = oldDataRaw ? JSON.parse(oldDataRaw) : {};

    const updatedUserData = {
      ...oldData,
      displayName: updatedFields.name || oldData.displayName,
      phoneNumber: updatedFields.phoneNumber || oldData.phoneNumber,
      address: updatedFields.address || oldData.address,
      buildingNumber: updatedFields.buildingNumber || oldData.buildingNumber,
      cityId: updatedFields.cityId || oldData.cityId,
      cityName: cityName || oldData.cityName,
      age: updatedFields.age || oldData.age,
      description: updatedFields.description || oldData.description,
      companyName: updatedFields.companyName || oldData.companyName,
      experienceYears: updatedFields.experienceYears || oldData.experienceYears,
      serviceId: updatedFields.serviceId || oldData.serviceId,
    };

    localStorage.setItem("userData", JSON.stringify(updatedUserData));
    setSaveData(updatedUserData);

    return updatedUserData;
  } catch (error) {
    console.error("فشل التحديث:", error);
    throw error;
  }
}








    return (
        <LoginClientContext.Provider
        value={{
            error,
            isLoading,
            getUserData,
            submitForm,
            saveData,
            token,
            updateProfilePicture,
            updateAccountInfo,
        }}
        >
        {children}
        </LoginClientContext.Provider>
    );
    }

    export function useLoginClient() {
    const context = useContext(LoginClientContext);
    if (!context) {
        throw new Error("useLoginClient must be used within a LoginClientProvider");
    }
    return context;
}
