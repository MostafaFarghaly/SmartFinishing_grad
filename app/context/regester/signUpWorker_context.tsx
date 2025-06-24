// context/regester/signUpWorker_context.js
"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useToken } from "../token_context";

const SignUpIndustrialContext = createContext();

export function SignUpIndustrialProvider({ children }) {
  const { saveUserData } = useToken();
  const [error, setError] = useState(null);
  const [cities, setCities] = useState([]);
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const [user, setUser] = useState({
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    address: '',
    buildingNumber: '',
    cityName: '',
    age: '',
    profilePictureUrl: '',
    serviceName: '',
    description: '',
    minPrice: '',
    maxPrice: '',
    availableDays: [],
  });

useEffect(() => {
  const fetchData = async () => {
    try {
      const [citiesRes, servicesRes] = await Promise.all([
        axios.get("https://projectapi-ekhpcndsdgbahqhm.canadacentral-01.azurewebsites.net/api/Cities"),
        axios.get("https://projectapi-ekhpcndsdgbahqhm.canadacentral-01.azurewebsites.net/api/categories/services?pageSize=1000")
      ]);

      setCities(citiesRes.data.data || citiesRes.data);

      const raw = servicesRes.data.data || [];
      const valid = raw.filter(service => service && service.id && service.name);
      
      setServices(valid);
    } catch (err) {
      console.error("❌ Failed to fetch data:", err);
      setError("فشل في تحميل البيانات المطلوبة. حاول مرة أخرى.");
    }
  };

  fetchData();
}, []);

  function getUserData(e) {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value ?? '' }));
  }

  function handleFileChange(e) {
    const file = e.target.files[0];
    setSelectedFile(file);
  }

  function addAvailableDay() {
    setUser(prev => ({
      ...prev,
      availableDays: [...prev.availableDays, { day: '', startTime: '', endTime: '' }]
    }));
  }

  function updateAvailableDay(index, field, value) {
    const updated = [...user.availableDays];
    updated[index][field] = value;
    setUser(prev => ({ ...prev, availableDays: updated }));
  }

  function removeAvailableDay(index) {
    const updated = user.availableDays.filter((_, i) => i !== index);
    setUser(prev => ({ ...prev, availableDays: updated }));
  }

  async function sendData() {
    const formData = new FormData();

    for (const key in user) {
      if (key === "availableDays") {
        formData.append("availableDays", JSON.stringify(user.availableDays));
      } else {
        formData.append(key, user[key] ?? '');
      }
    }

    if (selectedFile) {
      formData.append("profilePicture", selectedFile);
    }

    setIsLoading(true);
    try {
      const res = await axios.post(
        "https://projectapi-ekhpcndsdgbahqhm.canadacentral-01.azurewebsites.net/api/account/register/worker",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          validateStatus: () => true
        }
      );

      if (res.data.errors == null) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userData", JSON.stringify(res.data));
        saveUserData();
        window.location.href = "/";
      } else {
        setError(res.data.errors);
      }
    } catch (err) {
      setError("Failed to send data. Try again later.");
    } finally {
      setIsLoading(false);
    }
  }

  function submitForm() {
    sendData();
  }

  return (
    <SignUpIndustrialContext.Provider
      value={{
        error,
        cities,
        services,
        isLoading,
        user,
        getUserData,
        handleFileChange,
        submitForm,
        addAvailableDay,
        updateAvailableDay,
        removeAvailableDay,
        setUser,
        clearError: () => setError(null)
      }}
    >
      {children}
    </SignUpIndustrialContext.Provider>
  );
}

export function useSignUpIndustrial() {
  const context = useContext(SignUpIndustrialContext);
  if (!context) {
    throw new Error("useSignUpIndustrial must be used within a SignUpIndustrialProvider");
  }
  return context;
}