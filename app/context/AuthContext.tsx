"use client";
import React, { useState, useEffect, createContext } from "react";
import axios from "axios";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

type User = {
  id: number;
  firstName: string;
  lastName: string;
  city: string;
  email: string;
  phone: string;
};

type State = {
  loading: boolean;
  data: User | null;
  error: string | null;
};

//this extends the State type with the setAuthState function
type AuthenticationContextType = State & {
  setAuthState: React.Dispatch<React.SetStateAction<State>>;
};

export const AuthenticationContext = createContext<AuthenticationContextType>({
  loading: false,
  data: null,
  error: null,
  setAuthState: () => {},
});

export default function AuthContext({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const [authState, setAuthState] = useState<State>({
    loading: true,
    data: null,
    error: null,
  });

  const fetchUser = async () => {
    setAuthState({
      loading: true,
      data: null,
      error: null,
    });

    try {
      const jwt = getCookie("jwt");
      if (!jwt) {
        setAuthState({
          loading: false,
          data: null,
          error: null,
        });
        if (pathname === "/auth/forgot_password" || pathname === "/auth/check_email" || pathname === "/auth/register") {
          // Dont do any rerouting in these cases
        } else {
          router.push("/auth/signin");
        }
        return;
      }

      const response = await axios.get("/api/auth/me", {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      //This will grab the json web token and append it to the header of every request
      //such that you wont have to do it manually in every request like above
      axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;

      setAuthState({
        loading: false,
        data: response.data,
        error: null,
      });

      router.push("/");
    } catch (error: any) {
      setAuthState({
        loading: false,
        data: null,
        error: error.response.data.errorMessage,
      });
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const value = { ...authState, setAuthState };
  return <AuthenticationContext.Provider value={value}>{children}</AuthenticationContext.Provider>;
}
