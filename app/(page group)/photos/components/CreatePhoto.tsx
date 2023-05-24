"use client";
import React, { useContext, useRef, useState } from "react";
import axios, { AxiosError } from "axios";
import { AuthenticationContext } from "@/app/context/AuthContext";
import { toast } from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ts from "typescript";

export default function CreatePost() {
  const [imageSrc, setImageSrc] = useState();
  const [uploadData, setUploadData] = useState();
  const [isDisabled, setIsDisabled] = useState(false);
  const { data } = useContext(AuthenticationContext);
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const auth = useContext(AuthenticationContext);
  let toastPostID: string;

  //upload a photo
  const { mutate } = useMutation(
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
        setIsDisabled(false);
      },
      onSuccess: (data) => {
        toast.success("Photo uploaded successfully.", { id: toastPostID });
        setImageSrc(undefined);
        setUploadData(undefined);
        setIsDisabled(false);
        queryClient.invalidateQueries(["photos"]);
      },
    }
  );

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
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
    mutate(response.secure_url);

    setImageSrc(response.secure_url);
    setUploadData(response);
  }

  return (
    <>
      <form
        onChange={handleOnChange}
        onSubmit={handleOnSubmit}
        className="fixed left-5 bottom-5 border border-gray-500 rounded-lg z-50"
      >
        <div className="flex justify-center items-center px-3 py-2 rounded-lg bg-gray-50 border">
          <input
            ref={fileInputRef}
            type="file"
            name="file"
            className="hidden text-base p-4 rounded-[0.5em] border-[solid] border-[gray]"
          />
          <button
            onClick={handleButtonClick}
            type="button"
            className="inline-flex justify-center p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100"
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

          {!uploadData && (
            <p>
              <button
                disabled={isDisabled}
                type="submit"
                className={`${
                  imageSrc ? "text-blue-600" : "text-red-600"
                } inline-flex justify-center p-2 rounded-full cursor-pointer hover:bg-blue-100`}
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
            </p>
          )}
          {imageSrc && (
            <p>
              <button
                onClick={() => {
                  // @ts-ignore
                  setImageSrc("");
                }}
                disabled={isDisabled}
                type="submit"
                className="inline-flex justify-center p-2 text-red-600 rounded-full cursor-pointer hover:bg-blue-100"
              >
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 64 64">
                  <linearGradient
                    id="fbsFAcPTNuInJg1GESjdha_52134_gr1"
                    x1="32"
                    x2="32"
                    y1="7.001"
                    y2="56.998"
                    gradientUnits="userSpaceOnUse"
                    spreadMethod="reflect"
                  >
                    <stop offset="0" stop-color="#1a6dff"></stop>
                    <stop offset="1" stop-color="#c822ff"></stop>
                  </linearGradient>
                  <path
                    fill="url(#fbsFAcPTNuInJg1GESjdha_52134_gr1)"
                    d="M49.757,56.999c-0.768,0-1.536-0.292-2.121-0.877L32,40.485L16.364,56.121 c-1.17,1.169-3.073,1.169-4.243,0l-4.243-4.243c-1.17-1.17-1.17-3.073,0-4.243L23.515,32L7.879,16.364 c-1.17-1.17-1.17-3.073,0-4.243l4.243-4.243c1.169-1.17,3.072-1.171,4.243,0L32,23.515L47.636,7.879c1.17-1.171,3.073-1.17,4.243,0 l4.243,4.243c1.17,1.17,1.17,3.073,0,4.243L40.485,32l15.636,15.636c1.17,1.17,1.17,3.073,0,4.243l-4.243,4.243 C51.293,56.706,50.525,56.999,49.757,56.999z M32,37.657l17.05,17.05c0.39,0.39,1.025,0.389,1.415,0l4.243-4.243 c0.39-0.39,0.39-1.024,0-1.415L37.657,32l17.05-17.05c0.39-0.39,0.39-1.024,0-1.415l-4.243-4.243c-0.39-0.39-1.025-0.391-1.415,0 L32,26.343L14.95,9.293c-0.39-0.39-1.025-0.389-1.415,0l-4.243,4.243c-0.39,0.39-0.39,1.024,0,1.415L26.343,32L9.293,49.05 c-0.39,0.39-0.39,1.024,0,1.415l4.243,4.243c0.389,0.389,1.024,0.39,1.415,0L32,37.657z"
                  ></path>
                  <linearGradient
                    id="fbsFAcPTNuInJg1GESjdhb_52134_gr2"
                    x1="32"
                    x2="32"
                    y1="11.94"
                    y2="52.06"
                    gradientUnits="userSpaceOnUse"
                    spreadMethod="reflect"
                  >
                    <stop offset="0" stop-color="#6dc7ff"></stop>
                    <stop offset="1" stop-color="#e6abff"></stop>
                  </linearGradient>
                  <path
                    fill="url(#fbsFAcPTNuInJg1GESjdhb_52134_gr2)"
                    d="M52.061 14.061L49.939 11.939 32 29.879 14.061 11.939 11.939 14.061 29.879 32 11.939 49.939 14.061 52.061 32 34.121 49.939 52.061 52.061 49.939 34.121 32z"
                  ></path>
                </svg>
              </button>
            </p>
          )}
        </div>
      </form>
      <div
        className={`${
          imageSrc ? "" : "hidden"
        } max-w-[40vw] max-h-screen fixed left-0 bottom-0 z-40 bg-gradient-to-tr from-black`}
      >
        <img src={imageSrc} className="p-5" />
      </div>
    </>
  );
}
