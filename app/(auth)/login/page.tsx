"use client"
import "@fortawesome/fontawesome-free/css/all.min.css";
import Image from 'next/image';
import Link from "next/link";
import React , { useState } from 'react';
import { useLoginClient } from "../../context/regester/login_context";

export default function Login() {
  const { error,isLoading,getUserData,submitForm } = useLoginClient();
  
  
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="flex w-full max-w-4xl bg-white shadow-lg rounded-2xl overflow-hidden">
          {/* Left Section */}
          <div className="w-10/12 p-8">
            <h2 className="text-3xl font-bold my-text-green mb-2">Welcome back!</h2>
            <p className="text-gray-600 mb-6">Login to access your account</p>
            {error.length >0 ? <div className="text-red-600">{error}</div> : ""}
            <form className="space-y-4" onSubmit={submitForm}>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                <input onChange={getUserData} type="email" id="email" name="email" placeholder="Enter your email" required
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"/>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <input onChange={getUserData} type="password" id="password" name="password" placeholder="Enter your password" required
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"/>
                
                <div className="text-right mt-2">
                  <Link href="/forgetPass" className="text-sm text-green-500 hover:underline">Forgot password?</Link>
                </div>
              <button type="submit" className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors">
                {isLoading == true ? <i className="fa fa-spinner fa-spin"></i> : "Login"}
              </button>
            </form>
            <div className="mt-6 flex items-center justify-between">
              <hr className="w-1/4 border-gray-300" />
              <span className="text-sm text-gray-500">or</span>
              <hr className="w-1/4 border-gray-300" />
            </div>
            <div className="mt-4 flex space-x-4">
              <button className="flex-1 flex items-center justify-center bg-white border border-gray-300 text-gray-700 py-2 rounded-lg hover:shadow hover:bg-red-500 hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 128 128"><path fill="#fff" d="M44.59 4.21a63.28 63.28 0 0 0 4.33 120.9a67.6 67.6 0 0 0 32.36.35a57.13 57.13 0 0 0 25.9-13.46a57.44 57.44 0 0 0 16-26.26a74.3 74.3 0 0 0 1.61-33.58H65.27v24.69h34.47a29.72 29.72 0 0 1-12.66 19.52a36.2 36.2 0 0 1-13.93 5.5a41.3 41.3 0 0 1-15.1 0A37.2 37.2 0 0 1 44 95.74a39.3 39.3 0 0 1-14.5-19.42a38.3 38.3 0 0 1 0-24.63a39.25 39.25 0 0 1 9.18-14.91A37.17 37.17 0 0 1 76.13 27a34.3 34.3 0 0 1 13.64 8q5.83-5.8 11.64-11.63c2-2.09 4.18-4.08 6.15-6.22A61.2 61.2 0 0 0 87.2 4.59a64 64 0 0 0-42.61-.38"/><path fill="#e33629" d="M44.59 4.21a64 64 0 0 1 42.61.37a61.2 61.2 0 0 1 20.35 12.62c-2 2.14-4.11 4.14-6.15 6.22Q95.58 29.23 89.77 35a34.3 34.3 0 0 0-13.64-8a37.17 37.17 0 0 0-37.46 9.74a39.25 39.25 0 0 0-9.18 14.91L8.76 35.6A63.53 63.53 0 0 1 44.59 4.21"/><path fill="#f8bd00" d="M3.26 51.5a63 63 0 0 1 5.5-15.9l20.73 16.09a38.3 38.3 0 0 0 0 24.63q-10.36 8-20.73 16.08a63.33 63.33 0 0 1-5.5-40.9"/><path fill="#587dbd" d="M65.27 52.15h59.52a74.3 74.3 0 0 1-1.61 33.58a57.44 57.44 0 0 1-16 26.26c-6.69-5.22-13.41-10.4-20.1-15.62a29.72 29.72 0 0 0 12.66-19.54H65.27c-.01-8.22 0-16.45 0-24.68"/><path fill="#319f43" d="M8.75 92.4q10.37-8 20.73-16.08A39.3 39.3 0 0 0 44 95.74a37.2 37.2 0 0 0 14.08 6.08a41.3 41.3 0 0 0 15.1 0a36.2 36.2 0 0 0 13.93-5.5c6.69 5.22 13.41 10.4 20.1 15.62a57.13 57.13 0 0 1-25.9 13.47a67.6 67.6 0 0 1-32.36-.35a63 63 0 0 1-23-11.59A63.7 63.7 0 0 1 8.75 92.4"/></svg>
                  Login with Google
              </button>
              <button className="flex-1 flex items-center justify-center bg-white border border-gray-300 text-gray-700 py-2 rounded-lg hover:shadow hover:bg-blue-500 hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 48 48"><path fill="#2f88ff" stroke="#000" strokeLinejoin="round" strokeWidth="3.8" d="M36 12.5997H31.2489H29.9871C28.9009 12.5997 28.0203 13.4803 28.0203 14.5666V21.4674H36L34.8313 29.0643H28.0203V43H19.2451V29.0643H12V21.4674H19.1515L19.2451 14.2563L19.2318 12.9471C19.1879 8.60218 22.6745 5.04434 27.0194 5.0004C27.0459 5.00013 27.0724 5 27.0989 5H36V12.5997Z"/></svg>
                Login with Facebook
              </button>
            </div>
            <p className="mt-6 text-sm text-center text-gray-500">
              Don’t have an account? <Link href="/signup" className="text-green-500 hover:underline">Sign Up</Link>
            </p>
          </div>

          {/* Right Section */}
          <div className="w-1/2 bg-green-50 flex items-center justify-center p-8">
            <Image
                src="/images/Login.png"
                alt="Login"
                width={550}
                height={550}
                className="mx-auto"/>        
          </div>
      </div>
    </div>
  );
}

