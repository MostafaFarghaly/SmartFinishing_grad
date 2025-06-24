"use client";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useSignUpClient } from "../../context/regester/signupclient_context";

export default function SignUpClient() {
  const { error, cities, isLoading, user, getUserData, submitForm } = useSignUpClient();
  const [step, setStep] = useState(1);

  const nextStep = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const prevStep = (e) => {
    e.preventDefault();
    setStep(1);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="flex w-full max-w-4xl bg-white shadow-lg rounded-2xl">
        {/* Left Section */}
        <div className="w-10/12 p-8">
          <h2 className="text-3xl font-bold my-text-green mb-1">Sign Up Client</h2>
          <p className="text-gray-600 mb-1">
            Let’s get you all set up so you can access your personal account
          </p>

          {error && (
            <div className="text-red-600 text-sm space-y-1 mb-3">
              {Array.isArray(error) ? error.map((err, idx) => <p key={idx}>{err}</p>) : <p>{error}</p>}
            </div>
          )}

          <form className="space-y-4" onSubmit={step === 2 ? submitForm : nextStep}>
            {/* Step 1 */}
            {step === 1 && (
              <>
                <label htmlFor="name">
                  Full Name
                </label>
                <input
                  name="name"
                  value={user.name}
                  onChange={getUserData}
                  placeholder="Full Name"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                  required
                />
                <label htmlFor="email">
                  Email 
                </label>
                <input
                  name="email"
                  type="email"
                  value={user.email}
                  onChange={getUserData}
                  placeholder="Email"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                  required
                />
                <label htmlFor="password">
                  Password 
                </label>
                <input
                  name="password"
                  type="password"
                  value={user.password}
                  onChange={getUserData}
                  placeholder="Password"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                  required
                />
                <label htmlFor="confirmPassword">
                  Confirm Password 
                </label>
                <input
                  name="confirmPassword"
                  type="password"
                  value={user.confirmPassword}
                  onChange={getUserData}
                  placeholder="Confirm Password"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                  required
                />
                <label htmlFor="phoneNumber">
                  Phone Number 
                </label>
                <input
                  name="phoneNumber"
                  value={user.phoneNumber}
                  onChange={getUserData}
                  placeholder="Phone Number"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                  required
                />

                <button
                  type="submit"
                  className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Next
                </button>
              </>
            )}

            {/* Step 2 */}
            {step === 2 && (
              <>
                <label htmlFor="address">
                  Address 
                </label>
                <input
                  name="address"
                  value={user.address}
                  onChange={getUserData}
                  placeholder="Address"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                  required
                />
                <label htmlFor="buildingNumber">
                  Building Number
                </label>
                <input
                  name="buildingNumber"
                  value={user.buildingNumber}
                  onChange={getUserData}
                  placeholder="Building Number"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                  required
                />
                <label htmlFor="cityId">
                  City
                </label>
                <select
                  name="cityId"
                  value={user.cityId}
                  onChange={getUserData}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                  required
                >
                  <option value="">Select a city</option>
                  {cities.map((city) => (
                    <option key={city.id} value={city.id}>
                      {city.name}
                    </option>
                  ))}
                </select>
                <label htmlFor="age">
                  Age
                </label>
                <input
                  name="age"
                  type="number"
                  value={user.age}
                  onChange={getUserData}
                  placeholder="Age"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                />
                <label htmlFor="profilePicture">
                  Profile Picture 
                </label>
                <input
                  name="profilePicture"
                  type="file"
                  accept="image/*"
                  onChange={getUserData}
                  placeholder="Profile Picture"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                />

                <div className="flex justify-between gap-2">
                  <button
                    onClick={prevStep}
                    className="w-1/2 bg-gray-300 text-gray-700 py-1 rounded-lg hover:bg-gray-400 transition-colors"
                  >
                    Previous
                  </button>
                  <button
                    type="submit"
                    className="w-1/2 bg-green-600 text-white py-1 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    {isLoading ? <i className="fa fa-spinner fa-spin"></i> : "Create Account"}
                  </button>
                </div>
              </>
            )}
          </form>

          <p className="mt-3 text-sm text-center text-gray-500">
            Already have an account?{" "}
            <Link href="/login" className="text-green-500 hover:underline">
              Sign in
            </Link>
          </p>
        </div>

        {/* Right Section */}
        <div className="w-50 bg-green-50 flex items-center justify-center p-6">
          <Image src="/images/signup.png" alt="Sign Up" width={550} height={550} className="mx-auto" />
        </div>
      </div>
    </div>
  );
}
