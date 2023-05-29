"use client";

import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { toast } from "react-hot-toast";
import UploadWidget from "./UploadWidget";

export default function Photo({ photo }: { photo: PhotoType }) {
  const [fullscreen, setFullscreen] = useState(false);
  const toggleFullscreen = () => setFullscreen(!fullscreen);
  const queryClient = useQueryClient();
  let toastPostID: string;

  //delete a photo
  const { mutate } = useMutation(
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
      onMutate: () => {
        toastPostID = toast.loading("Uploading the photo...");
      },
      onSuccess: (data) => {
        toast.success("Photo deleted successfully.", { id: toastPostID });
        queryClient.invalidateQueries(["photos"]);
      },
      onError: (error) => {
        if (error instanceof AxiosError) {
          toast.error(error?.response?.data.message, { id: toastPostID });
        }
      },
    }
  );

  return (
    <>
      <img
        onClick={toggleFullscreen}
        src={photo.url}
        className="w-full h-full cursor-pointer object-cover object-center"
      />
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
                className="absolute top-5 right-5 flex flex-col gap-3"
              >
                <button
                  onClick={() => {
                    mutate(photo.id);
                  }}
                  type="button"
                  className="p-3 text-indigo-600 bg-indigo-50 rounded-lg duration-150 hover:bg-indigo-100 active:bg-indigo-200"
                >
                  <img
                    className="w-8 h-8"
                    src="data:image/png;base64,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"
                  />
                </button>
                <UploadWidget photoId={Number.parseInt(photo.id)} />
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
