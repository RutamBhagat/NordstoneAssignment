"use client";
import useAuth from "@/hooks/useAuth";
import React, { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import { AuthenticationContext } from "@/app/context/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";

const defaultFormFields = {
  email: "",
  password: "",
};

export default function page() {
  const router = useRouter();
  const [input, setInput] = useState(defaultFormFields);
  const [isDisabled, setIsDisabled] = useState(true);
  const [showError, setShowError] = useState(false);
  const { signUp } = useAuth();
  const { error } = useContext(AuthenticationContext);

  useEffect(() => {
    if (input.email && input.password) {
      return setIsDisabled(false);
    }
    setIsDisabled(true);
  }, [input]);

  const resetFormFields = () => {
    setInput(defaultFormFields);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setInput({ ...input, [name]: value });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await signUp(input);
      resetFormFields();
      router.push("/");
    } catch (error) {
      setShowError(true);
    }
  };

  return (
    <div className="w-screen min-h-screen bg-gray-900 py-5">
      <div className="flex h-full flex-col items-center justify-center px-4 sm:px-0">
        <div className="flex h-[675px] w-full rounded-2xl bg-gray-300 shadow-lg sm:mx-0 sm:w-3/4 md:w-5/6 lg:max-w-5xl">
          <div className="relative flex w-full flex-col justify-center px-10 md:w-1/2 md:px-4 lg:px-10">
            {error && (
              <div
                id="alert-2"
                className={`absolute top-2 left-2 right-2 flex p-4 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 ${
                  showError ? "" : "hidden"
                }`}
                role="alert"
              >
                <svg
                  aria-hidden="true"
                  className="flex-shrink-0 w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="sr-only">Info</span>
                <div className="ml-3 text-sm font-medium">{error}</div>
                <button
                  onClick={() => {
                    setShowError(false);
                  }}
                  type="button"
                  className="ml-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex h-8 w-8 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-gray-700"
                  aria-label="Close"
                >
                  <span className="sr-only">Close</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </button>
              </div>
            )}
            <h1 className="text-4xl font-medium">Sign UP</h1>
            <p className="text-slate-500">Create an account</p>
            <form autoComplete="new-password" onSubmit={handleSubmit} action="#" className="mt-10 mb-5">
              <div className="flex flex-col space-y-5">
                <label htmlFor="email">
                  <p className="pb-2 font-medium text-slate-700">Email address</p>
                  <input
                    required
                    onChange={handleChange}
                    id="email"
                    name="email"
                    type="email"
                    value={input.email}
                    className="w-full rounded-lg border border-slate-200 py-3 px-3 hover:shadow focus:border-slate-500 focus:outline-none"
                    placeholder="Enter email address"
                  />
                </label>
                <label htmlFor="password">
                  <p className="pb-2 font-medium text-slate-700">Password</p>
                  <input
                    required
                    onChange={handleChange}
                    id="password"
                    name="password"
                    type="password"
                    value={input.password}
                    className="w-full rounded-lg border border-slate-200 py-3 px-3 hover:shadow focus:border-slate-500 focus:outline-none"
                    placeholder="Enter your password"
                  />
                </label>
                <button
                  disabled={isDisabled}
                  className={`${
                    isDisabled ? "bg-violet-500" : "bg-violet-800 hover:bg-violet-900"
                  } inline-flex w-full items-center justify-center space-x-2 rounded-lg border-violet-800 py-3 font-medium text-white hover:shadow`}
                >
                  <span>Sign Up</span>
                </button>
                <p className="text-center">
                  Already have an account?{" "}
                  <Link
                    href="/auth/signin"
                    className="inline-flex items-center space-x-1 font-medium text-violet-800 hover:text-violet-900"
                  >
                    <span>Sign In </span>
                  </Link>
                </p>
              </div>
            </form>
          </div>
          <div className="group relative items-center justify-center m-3 overflow-hidden shadow-xl rounded-2xl w-1/2 hidden md:flex">
            <img
              src="https://images.unsplash.com/photo-1533162507191-d90c625b2640?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3087&q=80"
              className="absolute w-full h-full transition-all duration-500 ease-in-out transform object-center object-cover hover:scale-150 group-hover:scale-150"
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