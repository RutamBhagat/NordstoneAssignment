"use client";
import React, { useContext, useRef, useEffect } from "react";
import axios, { AxiosError } from "axios";
import { AuthenticationContext } from "@/app/context/AuthContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import CreateButton from "./CreateButton";
import UpdateButton from "./UpdateButton";

export default function UploadWidget({ command, photoId }: { command?: string; photoId?: string }) {
  const auth = useContext(AuthenticationContext);
  const queryClient = useQueryClient();
  const cloudinaryRef = useRef(null);
  const widgetRef = useRef(null);
  const toastPostID = useRef<string | undefined>();

  const uploadMutation = useMutation(
    async ({ public_id, secure_url }: { public_id: string; secure_url: string }) => {
      axios.post("/api/photos/upload", {
        public_id: public_id,
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
    async ({ id, newId, secure_url }: { id: string; newId: string; secure_url: string }) => {
      try {
        const response = await axios.post("/api/photos/update", {
          id: id,
          newId: newId,
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
              console.log("result.info", result.info);
              if (command === "CREATE") {
                uploadMutation.mutate({
                  public_id: result.info.public_id,
                  secure_url: result.info.secure_url,
                });
              } else {
                if (photoId) {
                  updateMutation.mutate({
                    id: photoId,
                    newId: `${result.info.public_id}`,
                    secure_url: `${result.info.secure_url}`,
                  });
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
