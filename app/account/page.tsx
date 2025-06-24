"use client";
import { useState, useRef, useEffect } from "react";
import { useLoginClient } from "../context/regester/login_context";
import {
  FaUserCircle,
  FaBell,
  FaLock,
  FaWallet,
  FaUser,
  FaQuestionCircle,
} from "react-icons/fa";
import Image from "next/image";
import Navbar from "../components/Nav/page";

export default function Account() {
  const { saveData, updateProfilePicture } = useLoginClient();
  const [profileImage, setProfileImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [uploadErrorMessage, setUploadErrorMessage] = useState("");
  const fileInputRef = useRef(null);

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const previewUrl = URL.createObjectURL(file);
      setProfileImage(previewUrl);
      setUploadStatus(null);
      setUploadErrorMessage("");
    }
  };

  const uploadProfilePictureToServer = async () => {
    if (!selectedFile) return;

    try {
      const newUrl = await updateProfilePicture(selectedFile); // ✅ استخدام الدالة الجديدة
      setUploadStatus("success");
      setUploadErrorMessage("");
      setProfileImage(newUrl); // ✅ تحديث الصورة في الواجهة
      setSelectedFile(null);   // reset
    } catch (error) {
      console.error("Upload failed:", error);
      setUploadStatus("error");
      setUploadErrorMessage(error.message || "حدث خطأ أثناء رفع الصورة.");
    }
  };

  useEffect(() => {
    if (saveData?.profilePictureUrl) {
      setProfileImage(saveData.profilePictureUrl);
    }
  }, [saveData?.profilePictureUrl]);

  useEffect(() => {
    return () => {
      if (profileImage?.startsWith("blob:")) {
        URL.revokeObjectURL(profileImage);
      }
    };
  }, [profileImage]);

  if (!saveData) {
    return (
      <div className="min-h-screen bg-gray-100 text-gray-800">
        <Navbar />
        <p className="p-4">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <Navbar />
      <div className="flex p-4 gap-6">
        {/* Left - Profile Card */}
        <div className="bg-white rounded-lg shadow w-1/4 text-center py-6 px-4">
          {profileImage ? (
            <Image
              width={112}
              height={112}
              src={profileImage}
              alt="Profile"
              className="w-28 h-28 mx-auto rounded-full object-cover"
            />
          ) : (
            <FaUserCircle className="text-gray-400 mx-auto text-7xl" />
          )}
          <h2 className="text-lg font-semibold mt-4">{saveData.displayName}</h2>
          <p className="text-sm text-gray-500 mb-4">{saveData.email}</p>

          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageChange}
            className="hidden"
          />
          <button
            onClick={handleUploadClick}
            className="border border-gray-300 px-4 py-2 text-sm rounded-md"
          >
            Upload photo
          </button>

          {selectedFile && (
            <div className="mt-3 space-y-2">
              <button
                onClick={uploadProfilePictureToServer}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                حفظ الصورة
              </button>
              {uploadStatus === "success" && (
                <p className="text-green-600 text-sm">✅ تم حفظ الصورة بنجاح</p>
              )}
              {uploadStatus === "error" && (
                <p className="text-red-600 text-sm">❌ {uploadErrorMessage}</p>
              )}
            </div>
          )}
        </div>

        {/* Right - Info Boxes */}
        <div className="flex-1 space-y-4">
          <InfoBox
            icon={<FaUser />}
            title="My profile"
            desc="Edit your profile picture, name, email, phone number, and Location"
            onClick={() => (window.location.href = "/updateaccount")}
          />
          <InfoBox
            icon={<FaWallet />}
            title="Safe"
            desc="Top up your account, check your balance, and manage your payment preferences."
            onClick={() => (window.location.href = "/payment")}
          />
          <InfoBox
            icon={<FaLock />}
            title="Change password"
            desc="Update and manage your password."
          />
          <InfoBox icon={<FaQuestionCircle />} title="Help" desc="Need help?" />
        </div>
      </div>

      <footer className="text-sm text-gray-500 text-center py-6 border-t">
        2025 Lilason, Inc. –{" "}
        <a href="#" className="underline">
          Terms of Use
        </a>{" "}
        –{" "}
        <a href="#" className="underline">
          Privacy Policy
        </a>{" "}
        –{" "}
        <a href="#" className="underline">
          Accessibility
        </a>{" "}
        –{" "}
        <a href="#" className="underline">
          Service Code
        </a>
      </footer>
    </div>
  );
}

function InfoBox({ icon, title, desc, onClick }) {
  return (
    <div
      onClick={onClick}
      className="bg-white p-4 rounded shadow cursor-pointer hover:bg-gray-50"
    >
      <div className="flex justify-between items-start gap-2">
        <div className="flex items-start gap-2">
          <div className="text-xl text-green-600">{icon}</div>
          <div>
            <h3 className="font-semibold">{title}</h3>
            <p className="text-sm text-gray-600">{desc}</p>
          </div>
        </div>
        <span className="text-2xl text-gray-400">›</span>
      </div>
    </div>
  );
}
