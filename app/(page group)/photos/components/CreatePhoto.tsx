"use client";
import React, { useContext, useRef, useState } from "react";
import axios, { AxiosError } from "axios";
import { AuthenticationContext } from "@/app/context/AuthContext";
import { toast } from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function CreatePost() {
  const [imageSrc, setImageSrc] = useState();
  const [uploadData, setUploadData] = useState();
  const [isDisabled, setIsDisabled] = useState(false);
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
        className="fixed left-5 bottom-5 border border-gray-500 rounded-lg z-20"
      >
        <div className="flex justify-center items-center px-3 py-2 rounded-lg bg-gray-50 border">
          <button
            type="button"
            className="inline-flex justify-center p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100"
          >
            <img
              className="w-5"
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAACz0lEQVR4nO2Zz29MURTHP7rRMkSlNi3dof4MOmNlwWwJxbLRWEiRJigLlI34O6iF1MZKWDAdEkFH7XSvP236w5Mr35u8TN7E+3HfnWnyTvJNXubNPfd+5p533jl3oLDCCmuH7QSuAd+ATSCIqU3gq8YaH221XcDrBItvpTdAqZ0gTx1ABNKTrIt5958J3rYYNwisOwRZl8/UFmeSKLvtECKQbqUBGADu57AYV1oDPgL3gAOtIM4Bqx2w2CCmloFqM8RZ4E8HLC5IqK0wjAmnlQ5YVFot2TDz8Uw0gAfAMDAE7JbMdRl4CHzP4H/SgHyOuPFSO3UQmMkwQQ04kSDZDAOzKeYxCYDfETcMgLVDKfP/KLBDPvYDl4AX2p01yVxPAxeBXn3XjLkCbCSYzzwakTeygPwCjmtsDzChDBMn1m9qjN2dxQTzRn44IxgD8SrhTliIgZRhUtNYCxN3Z1LHf5RGQxALGfwshGDGfIPUFN89KXeiWR+AbqALqPsEsdlpwqHP6/JZ9gXSCGWnJYcgi6FsNu8DxLxUjV12CBFII/I95QPEbD16T7gGeS7fFR8ghzXZjxxAGvJ91AeI7a3zaANW5bvkA2RPjiDL8r3XB8gRTZalgm2lOfke8vmwT+cA8ky+T/oAMf0EqmJdg5yX78c+QGxm6c3hhbjP5wsxUKWKSnFXPsdjhpVTkFkVjd0qILP6ex8qGj/5BAnU2bko438C/fJ1NeYYpyAboRDr16+apv8eDFW9bWms7ANqYUxo3IjZsprvjIf+Tqi4aHVd7MyY4ttmsxEVgHOqAFZ1bT67EMpOXQqnJIcP/0DyPJz7ApwivpVjdoORZUycjJBV8+onKio1StIxpdZHGSvnugG56wEkb91B56Zxzp06VUtAn43Nqk62g22mLeB084NWdVwn+diJM62yRp9Otusd+qfPitY2GQ6nwgorrDC2nf0FxZxxcblnBPsAAAAASUVORK5CYII="
            />
          </button>
          <input
            ref={fileInputRef}
            type="file"
            name="file"
            className="hidden text-base p-4 rounded-[0.5em] border-[solid] border-[gray]"
          />
          <button
            onClick={handleButtonClick}
            type="button"
            className="inline-flex justify-center p-2 text-gray-900 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100"
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

          {!uploadData && imageSrc && (
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
        </div>
      </form>
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
    </>
  );
}
