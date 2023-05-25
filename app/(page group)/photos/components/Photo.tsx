"use client";

import React, { useContext, useRef, useState } from "react";
import { type PhotoType } from "../page";
import { AuthenticationContext } from "@/app/context/AuthContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { toast } from "react-hot-toast";
import Link from "next/link";

export default function Photo({ photo }: { photo: PhotoType }) {
  const [imageSrc, setImageSrc] = useState();
  const [uploadData, setUploadData] = useState();
  const [isDisabled, setIsDisabled] = useState(false);
  const fileInputRef2 = useRef<HTMLInputElement | null>(null);
  const [fullscreen, setFullscreen] = useState(false);
  const toggleFullscreen = () => setFullscreen(!fullscreen);
  const auth = useContext(AuthenticationContext);
  const queryClient = useQueryClient();
  let toastPostID: string;

  const handleButtonClick = (event: any) => {
    if (fileInputRef2.current) {
      fileInputRef2.current.click();
    }
  };

  /**
   * handleOnChange
   * @description Triggers when the file input changes (ex: when a file is selected)
   */

  function handleOnChange(changeEvent: any) {
    const reader = new FileReader();

    reader.onload = function (onLoadEvent) {
      // @ts-ignore
      setImageSrc(onLoadEvent.target.result);
      setUploadData(undefined);
    };

    reader.readAsDataURL(changeEvent.target.files[0]);
  }

  /**
   * handleOnSubmit
   * @description Triggers when the main form is submitted
   */

  async function handleOnSubmit(event: any) {
    event.preventDefault();
    toggleFullscreen();

    const form = event.currentTarget;
    // @ts-ignore
    const fileInput = Array.from(form.elements).find(({ name }) => name === "file");

    const formData = new FormData();

    // @ts-ignore
    for (const file of fileInput.files) {
      formData.append("file", file);
    }

    formData.append("upload_preset", "my_uploads");

    const response = await fetch("https://api.cloudinary.com/v1_1/drxe0t2yg/image/upload", {
      method: "POST",
      body: formData,
    }).then((r) => r.json());

    setIsDisabled(true);
    updateMutation.mutate({ id: Number.parseInt(photo.id), secure_url: response.secure_url });

    setImageSrc(response.secure_url);
    setUploadData(response);
  }

  //delete a photo
  const deleteMutation = useMutation(
    async (id: string) => {
      try {
        const response = await axios.post("/api/photos/delete", {
          id: id,
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
        toast.success("Photo deleted successfully.", { id: toastPostID });
        queryClient.invalidateQueries(["photos"]);
      },
    }
  );

  //update a photo
  const updateMutation = useMutation(
    async ({ id, secure_url }: { id: number; secure_url: string }) => {
      try {
        const response = await axios.post("/api/photos/update", {
          id: id,
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
        setIsDisabled(false);
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries(["photos"]);
        toast.success("Photo updated successfully.", { id: toastPostID });
        setImageSrc(undefined);
        setUploadData(undefined);
        setIsDisabled(false);
      },
    }
  );

  return (
    <>
      <img onClick={toggleFullscreen} src={photo.url} className="h-64 cursor-pointer" />
      {fullscreen && (
        <div onClick={toggleFullscreen} className="fixed z-50 inset-0 bg-black bg-opacity-75">
          <div className="w-full h-full flex justify-center items-center cursor-pointer">
            <div className="relative">
              <img
                onClick={(e) => {
                  e.stopPropagation();
                }}
                src={photo.url}
                className="relative max-w-[75vw] max-h-[90vh] cursor-default"
              />
              <form
                onClick={(e) => {
                  e.stopPropagation();
                }}
                onChange={handleOnChange}
                onSubmit={handleOnSubmit}
                className="absolute top-5 right-5 flex flex-col gap-3"
              >
                <button
                  onClick={() => {
                    deleteMutation.mutate(photo.id);
                  }}
                  type="button"
                  className="p-3 text-indigo-600 bg-indigo-50 rounded-lg duration-150 hover:bg-indigo-100 active:bg-indigo-200"
                >
                  <img
                    className="w-8 h-8"
                    src="data:image/png;base64,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"
                  />
                </button>
                <Link
                  href="/uppy"
                  type="button"
                  className="p-3 text-indigo-600 bg-indigo-50 rounded-lg duration-150 hover:bg-indigo-100 active:bg-indigo-200"
                >
                  <img
                    className="w-8 h-8"
                    src="data:image/png;base64,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"
                  />
                </Link>
                <input
                  ref={fileInputRef2}
                  type="file"
                  name="file"
                  className="hidden text-base p-4 rounded-[0.5em] border-[solid] border-[gray]"
                />
                <button
                  onClick={handleButtonClick}
                  type="button"
                  className="p-3 text-indigo-600 bg-indigo-50 rounded-lg duration-150 hover:bg-indigo-100 active:bg-indigo-200"
                >
                  <img
                    className="w-8 h-8"
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAACvUlEQVR4nO2aT2vUQBjGk971LHhu0btS8NiJh81IQSdBu3sUe9PNLJYKsqx4Klg8tbDQfgrxJtjN1EOh+A3qSfDmP/Sm8MhY3WazabK7SeikeR942U0yQ/b5zcw7M5tYFolEIpEmV3uAq8E+VuU+1o2JEGsdhQWrTHX2cCVQeCsVYGIEIY5KM99WWAwUvp21yTMB8PAAF6XCp+GNFH7JEK+kwosgxIYh0X00wHwpADoKTyOUPwfvcM2qk6TC+2FXC3Hfqpukwo//AB7v4ZJVN8lIorHqKEkAQD1A0hAA5QBJSRBVmQVsh3svGRc/mSs29XGdZgHb4WLb4R5OQuz2er25OgCwx80XAEFWA0CK+ZwQpPkAJjCfA4I0G4A234+ZzDyeKjFKcwGMtTzjYke3cPScLse4tzVzT5BmArDTWjYGILN85QA4Db+ZZiYBQDKEht+sJADGvVZaS54CYAzCEvfuVRKANqJ/vOOKlaRunAJgWPefebuqAFKVAWA6SQIA6gGShgAoB8hzmwQBOwjRaius6O9TJcGMupUAIAdoRp779eNGTgWgzSv0h9cHyF5VmQggCNEaecoag5AIIG7+OLJXVcYOATVqJgphDEBG+WouhABbKmzFTO32gLkRAMdjfjvW8ju6nFX5lSCSWzbr2KSWz78UxnhPSAnjWr6YvQAmgmCs+WI2Q0iFYLT54naDSIRgvPlit8P4mxg39Vsi+tPEhFf6/wFVFAHg1ANAQ4BTDgAlQV7DWWCJ+5cjzwq/W3UT4/7qCQDv0KqTbrpikXHxZTgNuv6TUm7EGncXmOuvOVysR0Of09dmqZsrXO+5w8Vr5orfkTXAxxvLyxdKAeBw70PKWxhHs9ctKFzvK7t1+3op5isA4E1WL8wth9+ZZ1x0Gfc2RkN09bXZ6uYJ8czh4kHpxkkkEsk6Z/oDa82SviKjS8IAAAAASUVORK5CYII="
                  />
                </button>
                {!uploadData && imageSrc && (
                  <button
                    disabled={isDisabled}
                    type="submit"
                    className={`${
                      imageSrc ? "text-blue-600" : "text-red-600"
                    } p-3 py-4 flex justify-center items-center bg-indigo-50 rounded-lg duration-150 hover:bg-indigo-100 active:bg-indigo-200`}
                  >
                    <svg
                      aria-hidden="true"
                      className="w-6 h-6 rotate-90"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                    </svg>
                  </button>
                )}
              </form>
            </div>
          </div>
          <div
            onClick={(event) => {
              event.stopPropagation();
              setImageSrc(undefined);
            }}
            className={`${
              imageSrc ? "" : "hidden"
            } max-w-[40vw] max-h-screen fixed left-0 bottom-0 z-10 bg-gradient-to-tr from-black`}
          >
            <img src={imageSrc} className="p-5" />
          </div>
        </div>
      )}
    </>
  );
}
