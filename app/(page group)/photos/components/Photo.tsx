"use client";

import React, { useRef, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import UploadWidget from "./UploadWidget";
import { toast } from "react-hot-toast";
import deletePhoto from "@/lib/deletePhoto";

export default function Photo({ photo }: { photo: PhotoType }) {
  const [fullscreen, setFullscreen] = useState(false);
  const toggleFullscreen = () => setFullscreen(!fullscreen);
  const queryClient = useQueryClient();
  const toastPostID = useRef<string | undefined>();

  // delete a photo
  const { mutate } = useMutation(deletePhoto, {
    onMutate: () => {
      toastPostID.current = toast.loading("Deleting the photo...");
    },
    onSuccess: (data) => {
      toast.success("Photo deleted successfully.", { id: toastPostID.current });
      queryClient.invalidateQueries(["photos"]);
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error?.response?.data.message, { id: toastPostID.current });
      }
    },
  });

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
                    src="https://img.icons8.com/nolan/64/delete-forever.png"
                    alt="delete-forever"
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
