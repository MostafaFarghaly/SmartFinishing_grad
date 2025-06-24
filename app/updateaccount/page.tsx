"use client";
import React, { useState, useEffect } from "react";
import { useLoginClient } from "../context/regester/login_context";
import axios from "axios";
import Link from "next/link";

function ProfileModal({ onClose }) {
  const { updateAccountInfo } = useLoginClient();
  const [step, setStep] = useState(1);

  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [buildingNumber, setBuildingNumber] = useState("");
  const [cityId, setCityId] = useState("");
  const [age, setAge] = useState(0);
  const [description, setDescription] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [experienceYears, setExperienceYears] = useState(0);
  const [serviceId, setServiceId] = useState("");

  const [cities, setCities] = useState([]);
  const [services, setServices] = useState([]);
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    const data = localStorage.getItem("userData");
    if (data) {
      const user = JSON.parse(data);
      setName(user.displayName || "");
      setPhoneNumber(user.phoneNumber || "");
      setAddress(user.address || "");
      setBuildingNumber(user.buildingNumber || "");
      setCityId(user.cityId?.toString() || "");
      setAge(user.age || 0);
      setDescription(user.description || "");
      setCompanyName(user.companyName || "");
      setExperienceYears(user.experienceYears || 0);
      setServiceId(user.serviceId?.toString() || "");
    }

    const fetchData = async () => {
      try {
        const [citiesRes, servicesRes] = await Promise.all([
          axios.get("https://projectapi-ekhpcndsdgbahqhm.canadacentral-01.azurewebsites.net/api/Cities"),
          axios.get("https://projectapi-ekhpcndsdgbahqhm.canadacentral-01.azurewebsites.net/api/categories/services?pageSize=1000")
        ]);

        const citiesData = citiesRes.data?.data || citiesRes.data || [];
        setCities(Array.isArray(citiesData) ? citiesData : []);

        const servicesRaw = servicesRes.data?.data || servicesRes.data || [];
        const validServices = Array.isArray(servicesRaw)
          ? servicesRaw.filter((service) => service?.id && service?.name)
          : [];
        setServices(validServices);
      } catch (err) {
        console.error("❌ Failed to fetch data:", err);
      }
    };

    fetchData();
  }, []);

  const handleSave = async () => {
    try {
      await updateAccountInfo({
        name,
        phoneNumber,
        address,
        buildingNumber,
        cityId: Number(cityId),
        age: Number(age),
        description,
        companyName,
        experienceYears: Number(experienceYears),
        serviceId: Number(serviceId),
      });

      setMessage({ type: "success", text: "✅ تم التحديث بنجاح" });
    } catch (err) {
      setMessage({ type: "error", text: "❌ فشل التحديث: " + err.message });
      setStep(1);
    }
  };

  return (
    <div style={modalBackdropStyle}>
      <div style={modalContainerStyle}>
        <Link href="/account">
          <button onClick={onClose} style={closeBtnStyle}>&#10005;</button>
        </Link>

        <h3 style={{ fontWeight: 600, fontSize: 20, marginBottom: 12 }}>
          Edit Profile Info ({step}/2)
        </h3>

        {message.text && (
          <div style={{
            marginBottom: "12px",
            padding: "10px",
            borderRadius: "5px",
            backgroundColor: message.type === "success" ? "#d4edda" : "#f8d7da",
            color: message.type === "success" ? "#155724" : "#721c24",
            border: `1px solid ${message.type === "success" ? "#c3e6cb" : "#f5c6cb"}`
          }}>
            {message.text}
          </div>
        )}

        {step === 1 && (
          <>
            <label>Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} style={inputStyle} />

            <label>Phone Number</label>
            <input value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} style={inputStyle} />

            <label>Age</label>
            <input type="number" value={age} onChange={(e) => setAge(e.target.value)} style={inputStyle} />

            <label>City</label>
            <select value={cityId} onChange={(e) => setCityId(e.target.value)} style={inputStyle}>
              <option value="">اختر المدينة</option>
              {cities.map((city) => (
                <option key={city.id} value={city.id}>
                  {city.name}
                </option>
              ))}
            </select>

            <label>Address</label>
            <input value={address} onChange={(e) => setAddress(e.target.value)} style={inputStyle} />

            <label>Building Number</label>
            <input value={buildingNumber} onChange={(e) => setBuildingNumber(e.target.value)} style={inputStyle} />

            <button style={saveBtnStyle} onClick={() => setStep(2)}>التالي</button>
          </>
        )}

        {step === 2 && (
          <>
            <label>Company Name</label>
            <input value={companyName} onChange={(e) => setCompanyName(e.target.value)} style={inputStyle} />

            <label>Experience Years</label>
            <input type="number" value={experienceYears} onChange={(e) => setExperienceYears(e.target.value)} style={inputStyle} />

            <label>Description</label>
            <input value={description} onChange={(e) => setDescription(e.target.value)} style={inputStyle} />

            <label>Service</label>
            <select value={serviceId} onChange={(e) => setServiceId(e.target.value)} style={inputStyle}>
              <option value="">اختر الخدمة</option>
              {services.map((service) => (
                <option key={service.id} value={service.id}>
                  {service.name}
                </option>
              ))}
            </select>

            <div style={{ display: "flex", gap: "8px", marginTop: "10px" }}>
              <button onClick={() => setStep(1)} style={{ ...saveBtnStyle, backgroundColor: "#aaa" }}>السابق</button>
              <button style={saveBtnStyle} onClick={handleSave}>حفظ</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

const modalBackdropStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const modalContainerStyle = {
  backgroundColor: "#fff",
  padding: "20px",
  borderRadius: "8px",
  width: "400px",
  boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  position: "relative",
};

const closeBtnStyle = {
  position: "absolute",
  top: "10px",
  right: "10px",
  background: "none",
  border: "none",
  fontSize: "24px",
  cursor: "pointer",
};

const inputStyle = {
  width: "100%",
  padding: "8px",
  margin: "10px 0",
  borderRadius: "4px",
  border: "1px solid #ccc",
};

const saveBtnStyle = {
  backgroundColor: "#4CAF50",
  color: "white",
  padding: "10px 15px",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  width: "100%",
};

export default ProfileModal;
