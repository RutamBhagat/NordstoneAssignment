"use client";
import { AuthenticationContext } from "@/app/context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState, useRef, useContext } from "react";
import LoadingComponent from "../text/components/LoadingComponent";
import ErrorComponent from "../text/components/ErrorComponent";
import CreatePhoto from "./components/CreatePhoto";

export type PhotoType = {
  id: string;
  url: string;
  createdAt: string;
  user: {
    id: string;
    email: string;
  };
  updatedAt: string;
  userId: string;
};

export default function Home() {
  const auth = useContext(AuthenticationContext);

  const { data, error, isError, isLoading } = useQuery<PhotoType[]>({
    queryKey: ["photos"],
    queryFn: async () => {
      const response = await axios.post("/api/photos/getPhotos", { email: auth?.data?.email || "" });
      return response.data;
    },
  });

  if (isLoading) {
    <LoadingComponent />;
  }

  if (isError) {
    const { message } = error as Error;
    <ErrorComponent message={message} />;
  }

  return (
    <>
      {/* <div className="grid grid-rows-[1fr_auto] max-w-screen-xl min-h-screen mx-auto my-0 px-8 pt-[60px]">
        <main className="flex flex-col justify-center items-center text-center px-0 py-8">
          <h1 className="leading-[1.15] text-[4rem] m-0">Image Uploader</h1>

          <p className="leading-normal text-2xl mx-0 my-16">Upload your image to Cloudinary!</p>

          <form className="" method="post" onChange={handleOnChange} onSubmit={handleOnSubmit}>
            <p>
              <input
                ref={fileInputRef}
                type="file"
                name="file"
                className="hidden text-base p-4 rounded-[0.5em] border-[solid] border-[gray]"
              />
              <button
                type="button"
                onClick={handleButtonClick}
                className="inline-flex justify-center p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
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
            </p>

            <img src={imageSrc} />

            {imageSrc && !uploadData && (
              <p>
                <button className="text-[white] text-[1em] bg-[blueviolet] px-[0.8em] py-[0.5em] rounded-[0.2em] border-[none]">
                  Upload Files
                </button>
              </p>
            )}
          </form>
        </main>
      </div> */}

      <div className="flex h-screen text-gray-800">
        <div className="flex flex-row h-full w-full overflow-x-hidden">
          <div className="flex flex-col flex-auto pt-[60px]">
            <div className="flex flex-col flex-auto flex-shrink-0 bg-gray-100 h-full p-4">
              <div className="flex flex-col h-full overflow-x-auto mb-4">
                <div className="flex flex-col h-full">
                  <div className="flex flex-wrap justify-center gap-3">
                    {data?.map((photo) => (
                      <>
                        <img src={photo.url} className="h-64" />
                      </>
                    ))}
                  </div>
                </div>
              </div>
              <CreatePhoto />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
