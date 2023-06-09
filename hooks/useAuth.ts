import axios from "axios";
import { useContext } from "react";
import { AuthenticationContext } from "@/app/context/AuthContext";
import { deleteCookie } from "cookies-next";
import { useQueryClient } from "@tanstack/react-query";

const useAuth = () => {
  const { setAuthState } = useContext(AuthenticationContext);
  const queryClient = useQueryClient();

  const signIn = async ({ email, password }: { email: string; password: string }) => {
    setAuthState({
      loading: true,
      data: null,
      error: null,
    });
    try {
      const response = await axios.post("/api/auth/signin", {
        email,
        password,
      });
      setAuthState({
        loading: false,
        data: response.data,
        error: null,
      });
      return response.data;
    } catch (error: any) {
      setAuthState({
        loading: false,
        data: null,
        error: error.response.data.errorMessage,
      });
      console.log("error.response.data.errorMessage", error.response.data.errorMessage);
      throw new Error("Error signing in");
    }
  };

  const signUp = async ({ email, password }: { email: string; password: string }) => {
    setAuthState({
      loading: true,
      data: null,
      error: null,
    });
    try {
      const response = await axios.post("/api/auth/signup", {
        email,
        password,
      });
      setAuthState({
        loading: false,
        data: response.data,
        error: null,
      });
      return response.data;
    } catch (error: any) {
      setAuthState({
        loading: false,
        data: null,
        error: error.response.data.errorMessage,
      });
      throw new Error("Error signing up");
    }
  };

  const resetPassword = async ({
    email,
    password,
    confirm_password,
  }: {
    email: string;
    password: string;
    confirm_password: string;
  }) => {
    setAuthState({
      loading: true,
      data: null,
      error: null,
    });
    try {
      const response = await axios.post("/api/auth/resetPassword", {
        email,
        password,
        confirm_password,
      });
      setAuthState({
        loading: false,
        data: response.data,
        error: null,
      });
      return response.data;
    } catch (error: any) {
      setAuthState({
        loading: false,
        data: null,
        error: error.response.data.errorMessage,
      });
      console.log("error.response.data.errorMessage", error.response.data.errorMessage);
      throw new Error("Error changing password");
    }
  };

  const checkEmail = async ({ email }: { email: string }) => {
    setAuthState({
      loading: true,
      data: null,
      error: null,
    });
    try {
      const response = await axios.post("/api/auth/sendEmail", {
        email,
      });
      setAuthState({
        loading: false,
        data: null,
        error: "Click on redirection link in your email",
      });
      return true;
    } catch (error: any) {
      setAuthState({
        loading: false,
        data: null,
        error: error.response.data.errorMessage,
      });
      console.log("error.response.data.errorMessage", error.response.data.errorMessage);
      throw new Error("Error sending email");
    }
  };

  const signOut = async () => {
    queryClient.clear();
    deleteCookie("jwt");
    setAuthState({
      loading: false,
      data: null,
      error: null,
    });
  };

  return {
    signIn,
    signUp,
    signOut,
    resetPassword,
    checkEmail,
  };
};

export default useAuth;
