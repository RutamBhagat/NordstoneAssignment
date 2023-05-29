"use client";
import useAuth from "@/hooks/useAuth";
import Link from "next/link";
import React, { useContext, useState } from "react";
import { AuthenticationContext } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const { loading, data } = useContext(AuthenticationContext);
  const { signOut } = useAuth();

  const signOutHandler = () => {
    signOut();
    router.push("/auth/signin");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 border-gray-200 px-2 sm:px-4 py-2.5 h-[60px] bg-gray-900">
      <div className="container flex rounded flex-wrap items-center justify-between mx-auto">
        <Link href="/" className="flex items-center">
          <img
            src="https://media.licdn.com/dms/image/C4D0BAQHGSg1Bni4TYw/company-logo_200_200/0/1616853744387?e=2147483647&v=beta&t=tF_3p6OZKkNd0TyC9oXS45JkkyuVm6nLO6TIC1ilIqw"
            className="h-6 mr-3 sm:h-9"
            alt="Flowbite Logo"
          />
          <span className="self-center text-xl font-semibold whitespace-nowrap text-white">Nordstone</span>
        </Link>
        <div className="block w-auto" id="navbar-default">
          <ul className="font-medium flex p-0 rounded-lg space-x-8 mt-0 border-0 bg-gray-900 border-gray-700">
            <li>
              <Link
                href="/"
                className={`${
                  pathname === "/" ? "text-blue-500" : "text-white"
                } block rounded border-0 p-0 hover:text-blue-500 md:hover:bg-transparent`}
                aria-current="page"
              >
                Notifications
              </Link>
            </li>
            <li>
              <Link
                href="/photos"
                className={`${
                  pathname === "/photos" ? "text-blue-500" : "text-white"
                } block rounded border-0 p-0 hover:text-blue-500 md:hover:bg-transparent`}
              >
                Photos
              </Link>
            </li>
            <li>
              <Link
                href="/text"
                className={`${
                  pathname === "/text" ? "text-blue-500" : "text-white"
                } block rounded border-0 p-0 hover:text-blue-500 md:hover:bg-transparent`}
              >
                Text
              </Link>
            </li>
            <li>
              <Link
                href="/calculator/simple"
                className={`${
                  pathname.startsWith("/calculator") ? "text-blue-500" : "text-white"
                } block rounded border-0 p-0 hover:text-blue-500 md:hover:bg-transparent`}
              >
                Calculator
              </Link>
            </li>
          </ul>
        </div>
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
