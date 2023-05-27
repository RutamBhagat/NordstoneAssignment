"use client";
import { AuthenticationContext } from "@/app/context/AuthContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import React, { useContext } from "react";
import { useRef, useEffect } from "react";
import { toast } from "react-hot-toast";
import ts from "typescript";

export default function UploadWidget({ command, photoId }: { command?: string; photoId?: number }) {
  const auth = useContext(AuthenticationContext);
  const queryClient = useQueryClient();
  let toastPostID: string;
  const cloudinaryRef = useRef(null);
  const widgetRef = useRef(null);

  const uploadMutation = useMutation(
    async (secure_url: string) => {
      axios.post("/api/photos/upload", {
        email: auth?.data?.email,
        url: secure_url,
      });
    },
    {
      onError: (error) => {
        if (error instanceof AxiosError) {
          toast.error(error?.response?.data.message, { id: toastPostID });
        }
      },
      onSuccess: (data) => {
        toast.success("Photo uploaded successfully.", { id: toastPostID });
        queryClient.invalidateQueries(["photos"]);
      },
    }
  );

  const updateMutation = useMutation(
    async ({ photoId, secure_url }: { photoId: number; secure_url: string }) => {
      try {
        const response = await axios.post("/api/photos/update", {
          id: photoId,
          newUrl: secure_url,
        });
        return response.data;
      } catch (error) {
        console.log(error);
      }
    },
    {
      onError: (error) => {
        if (error instanceof AxiosError) {
          toast.error(error?.response?.data.message, { id: toastPostID });
        }
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries(["photos"]);
        toast.success("Photo updated successfully.", { id: toastPostID });
      },
    }
  );

  useEffect(() => {
    // @ts-ignore
    if (window.cloudinary !== undefined) {
      // @ts-ignore
      cloudinaryRef.current = window?.cloudinary;
      // @ts-ignore
      if (cloudinaryRef?.current?.createUploadWidget !== undefined)
        // @ts-ignore
        widgetRef.current = cloudinaryRef?.current?.createUploadWidget(
          { cloudName: "drxe0t2yg", uploadPreset: "my_uploads" },
          (error: any, result: any) => {
            console.log("result", result);
            if (result.event === "success") {
              if (command === "CREATE") {
                uploadMutation.mutate(result.info.secure_url);
              } else {
                if (photoId) {
                  updateMutation.mutate({ photoId: photoId, secure_url: `${result.info.secure_url}` });
                }
              }
            }
          }
        );
    }
  }, []);

  return command === "CREATE" ? (
    <button
      onClick={() => {
        // @ts-ignore
        widgetRef.current.open();
      }}
      type="button"
      className="p-3 text-indigo-600 bg-indigo-50 rounded-lg duration-150 hover:bg-indigo-100 active:bg-indigo-200"
    >
      <svg
        aria-hidden="true"
        className="w-6 h-6"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
          clipRule="evenodd"
        ></path>
      </svg>
    </button>
  ) : (
    <button
      onClick={() => {
        // @ts-ignore
        widgetRef.current.open();
      }}
      type="button"
      className="p-3 text-indigo-600 bg-indigo-50 rounded-lg duration-150 hover:bg-indigo-100 active:bg-indigo-200"
    >
      <img
        className="w-8 h-8"
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAACvUlEQVR4nO2aT2vUQBjGk971LHhu0btS8NiJh81IQSdBu3sUe9PNLJYKsqx4Klg8tbDQfgrxJtjN1EOh+A3qSfDmP/Sm8MhY3WazabK7SeikeR942U0yQ/b5zcw7M5tYFolEIpEmV3uAq8E+VuU+1o2JEGsdhQWrTHX2cCVQeCsVYGIEIY5KM99WWAwUvp21yTMB8PAAF6XCp+GNFH7JEK+kwosgxIYh0X00wHwpADoKTyOUPwfvcM2qk6TC+2FXC3Hfqpukwo//AB7v4ZJVN8lIorHqKEkAQD1A0hAA5QBJSRBVmQVsh3svGRc/mSs29XGdZgHb4WLb4R5OQuz2er25OgCwx80XAEFWA0CK+ZwQpPkAJjCfA4I0G4A234+ZzDyeKjFKcwGMtTzjYke3cPScLse4tzVzT5BmArDTWjYGILN85QA4Db+ZZiYBQDKEht+sJADGvVZaS54CYAzCEvfuVRKANqJ/vOOKlaRunAJgWPefebuqAFKVAWA6SQIA6gGShgAoB8hzmwQBOwjRaius6O9TJcGMupUAIAdoRp779eNGTgWgzSv0h9cHyF5VmQggCNEaecoag5AIIG7+OLJXVcYOATVqJgphDEBG+WouhABbKmzFTO32gLkRAMdjfjvW8ju6nFX5lSCSWzbr2KSWz78UxnhPSAnjWr6YvQAmgmCs+WI2Q0iFYLT54naDSIRgvPlit8P4mxg39Vsi+tPEhFf6/wFVFAHg1ANAQ4BTDgAlQV7DWWCJ+5cjzwq/W3UT4/7qCQDv0KqTbrpikXHxZTgNuv6TUm7EGncXmOuvOVysR0Of09dmqZsrXO+5w8Vr5orfkTXAxxvLyxdKAeBw70PKWxhHs9ctKFzvK7t1+3op5isA4E1WL8wth9+ZZ1x0Gfc2RkN09bXZ6uYJ8czh4kHpxkkkEsk6Z/oDa82SviKjS8IAAAAASUVORK5CYII="
      />
    </button>
  );
}
