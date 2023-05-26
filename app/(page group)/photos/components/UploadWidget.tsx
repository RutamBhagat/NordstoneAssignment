"use client";
import { AuthenticationContext } from "@/app/context/AuthContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import Link from "next/link";
import React, { useContext } from "react";
import { useRef, useEffect } from "react";
import { toast } from "react-hot-toast";

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
    cloudinaryRef.current = window.cloudinary;
    // @ts-ignore
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
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
  }, []);

  return command === "CREATE" ? (
    <button
      onClick={() => {
        // @ts-ignore
        widgetRef.current.open();
      }}
      type="button"
      className="inline-flex justify-center p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100"
    >
      <img
        className="w-5"
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAACz0lEQVR4nO2Zz29MURTHP7rRMkSlNi3dof4MOmNlwWwJxbLRWEiRJigLlI34O6iF1MZKWDAdEkFH7XSvP236w5Mr35u8TN7E+3HfnWnyTvJNXubNPfd+5p533jl3oLDCCmuH7QSuAd+ATSCIqU3gq8YaH221XcDrBItvpTdAqZ0gTx1ABNKTrIt5958J3rYYNwisOwRZl8/UFmeSKLvtECKQbqUBGADu57AYV1oDPgL3gAOtIM4Bqx2w2CCmloFqM8RZ4E8HLC5IqK0wjAmnlQ5YVFot2TDz8Uw0gAfAMDAE7JbMdRl4CHzP4H/SgHyOuPFSO3UQmMkwQQ04kSDZDAOzKeYxCYDfETcMgLVDKfP/KLBDPvYDl4AX2p01yVxPAxeBXn3XjLkCbCSYzzwakTeygPwCjmtsDzChDBMn1m9qjN2dxQTzRn44IxgD8SrhTliIgZRhUtNYCxN3Z1LHf5RGQxALGfwshGDGfIPUFN89KXeiWR+AbqALqPsEsdlpwqHP6/JZ9gXSCGWnJYcgi6FsNu8DxLxUjV12CBFII/I95QPEbD16T7gGeS7fFR8ghzXZjxxAGvJ91AeI7a3zaANW5bvkA2RPjiDL8r3XB8gRTZalgm2lOfke8vmwT+cA8ky+T/oAMf0EqmJdg5yX78c+QGxm6c3hhbjP5wsxUKWKSnFXPsdjhpVTkFkVjd0qILP6ex8qGj/5BAnU2bko438C/fJ1NeYYpyAboRDr16+apv8eDFW9bWms7ANqYUxo3IjZsprvjIf+Tqi4aHVd7MyY4ttmsxEVgHOqAFZ1bT67EMpOXQqnJIcP/0DyPJz7ApwivpVjdoORZUycjJBV8+onKio1StIxpdZHGSvnugG56wEkb91B56Zxzp06VUtAn43Nqk62g22mLeB084NWdVwn+diJM62yRp9Otusd+qfPitY2GQ6nwgorrDC2nf0FxZxxcblnBPsAAAAASUVORK5CYII="
      />
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
        src="data:image/png;base64,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"
      />
    </button>
  );
}
