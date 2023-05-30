"use client";
import React, { useContext, useRef, useEffect } from "react";
import axios, { AxiosError } from "axios";
import { AuthenticationContext } from "@/app/context/AuthContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import CreateButton from "./CreateButton";
import UpdateButton from "./UpdateButton";

export default function UploadWidget({ command, photoId }: { command?: string; photoId?: number }) {
  const auth = useContext(AuthenticationContext);
  const queryClient = useQueryClient();
  const cloudinaryRef = useRef(null);
  const widgetRef = useRef(null);
  const toastPostID = useRef<string | undefined>();

  const uploadMutation = useMutation(
    async (secure_url: string) => {
      axios.post("/api/photos/upload", {
        email: auth?.data?.email,
        url: secure_url,
      });
    },
    {
      onMutate: () => {
        toastPostID.current = toast.loading("Uploading photo...");
      },
      onSuccess: (data) => {
        toast.success("Photo uploaded successfully.", { id: toastPostID.current });
        queryClient.invalidateQueries(["photos"]);
      },
      onError: (error) => {
        if (error instanceof AxiosError) {
          toast.error(error?.response?.data.message, { id: toastPostID.current });
        }
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
      onMutate: () => {
        toastPostID.current = toast.loading("Updating photo...");
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries(["photos"]);
        toast.success("Photo updated successfully.", { id: toastPostID.current });
      },
      onError: (error) => {
        if (error instanceof AxiosError) {
          toast.error(error?.response?.data.message, { id: toastPostID.current });
        }
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
    <CreateButton
      clickHandler={() => {
        // @ts-ignore
        widgetRef.current.open();
      }}
    />
  ) : (
    <UpdateButton
      clickHandler={() => {
        // @ts-ignore
        widgetRef.current.open();
      }}
    />
  );
}
