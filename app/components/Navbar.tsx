"use client";
import useAuth from "@/hooks/useAuth";
import Link from "next/link";
import React, { useContext, useState } from "react";
import { AuthenticationContext } from "../context/AuthContext";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  const [isLoginHidden, setIsLoginHidden] = useState(true);
  const [isSignUpHidden, setIsSignUpHidden] = useState(true);
  const { loading, data } = useContext(AuthenticationContext);
  const { signOut } = useAuth();

  const switchModel = () => {
    setIsLoginHidden(!isLoginHidden);
    setIsSignUpHidden(!isSignUpHidden);
  };

  const signOutHandler = () => {
    signOut();
    router.push("/auth/signin");
  };

  return (
    <nav className="border-gray-200 px-2 sm:px-4 py-2.5 bg-gray-900">
      <div className="container flex rounded flex-wrap items-center justify-between mx-auto">
        <Link href="/" className="flex items-center">
          <img src="https://img.icons8.com/nolan/512/dyndns.png" className="h-6 mr-3 sm:h-9" alt="Flowbite Logo" />
          <span className="self-center text-xl font-semibold whitespace-nowrap text-white">Nordstone</span>
        </Link>
        <div className="flex md:order-2">
          <div>
            {loading ? (
              <span></span>
            ) : (
              <div className="flex">
                {data ? (
                  <button
                    onClick={signOutHandler}
                    className="block p-1 mr-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    type="button"
                  >
                    Sign Out
                  </button>
                ) : (
                  <></>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
