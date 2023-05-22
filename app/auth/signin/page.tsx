"use client";
import React from "react";
import Link from "next/link";

export default function page() {
  return (
    <div className="w-screen min-h-screen bg-gray-900 py-5">
      <div className="flex h-full flex-col items-center justify-center px-4 sm:px-0">
        <div className="flex h-[675px] w-full rounded-2xl bg-gray-300 shadow-lg sm:mx-0 sm:w-3/4 md:w-5/6 lg:max-w-5xl">
          <div className="flex w-full flex-col justify-center px-10 md:w-1/2 md:px-4 lg:px-10">
            <h1 className="text-4xl font-medium">Login</h1>
            <p className="text-slate-500">Hi, Welcome back 👋</p>
            <form onSubmit={() => {}} action="" className="mt-10 mb-5">
              <div className="flex flex-col space-y-5">
                <label htmlFor="email">
                  <p className="pb-2 font-medium text-slate-700">Email address</p>
                  <input
                    required
                    onChange={() => {}}
                    id="email"
                    name="email"
                    type="email"
                    value={"email"}
                    className="w-full rounded-lg border border-slate-200 py-3 px-3 hover:shadow focus:border-slate-500 focus:outline-none"
                    placeholder="Enter email address"
                  />
                </label>
                <label htmlFor="password">
                  <p className="pb-2 font-medium text-slate-700">Password</p>
                  <input
                    required
                    onChange={() => {}}
                    id="password"
                    name="password"
                    type="password"
                    value={"password"}
                    className="w-full rounded-lg border border-slate-200 py-3 px-3 hover:shadow focus:border-slate-500 focus:outline-none"
                    placeholder="Enter your password"
                  />
                </label>
                <div className="flex justify-end">
                  <Link
                    href="/auth/register"
                    className="inline-flex items-center space-x-1 font-sm text-sm text-violet-800 hover:text-violet-900"
                  >
                    <span>Forgot Password</span>
                  </Link>
                </div>
                <button className="inline-flex w-full items-center justify-center space-x-2 rounded-lg border-violet-800 bg-violet-800 py-3 font-medium text-white hover:bg-violet-900 hover:shadow">
                  <span>Sign In</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                    />
                  </svg>
                </button>
                <p className="text-center">
                  Not registered yet?{" "}
                  <Link
                    href="/auth/register"
                    className="inline-flex items-center space-x-1 font-medium text-violet-800 hover:text-violet-900"
                  >
                    <span>Register now </span>
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </span>
                  </Link>
                </p>
              </div>
            </form>
          </div>
          <div className="group relative items-center justify-center m-3 overflow-hidden shadow-xl rounded-2xl w-1/2 hidden md:flex">
            <img
              src="https://images.unsplash.com/photo-1517999144091-3d9dca6d1e43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=627&q=80"
              className="absolute w-full h-full transition-all duration-500 ease-in-out transform bg-center bg-cover hover:scale-150 group-hover:scale-150"
            ></img>
            <h1 className="absolute cursor-default text-5xl font-black transition-all duration-500 ease-in-out transform scale-150 text-gray-50 opacity-60 text-center hover:scale-100 group-hover:scale-100">
              NORD
              <br />
              STONE
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}
