"use client";
import { AuthenticationContext } from "@/app/context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState, useRef, useContext } from "react";
import LoadingComponent from "../text/components/LoadingComponent";
import ErrorComponent from "../text/components/ErrorComponent";
import CreatePhoto from "./components/CreatePhoto";
import Photo from "./components/Photo";

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
      <div className="flex h-screen text-gray-800">
        <div className="flex flex-row h-full w-full overflow-x-hidden">
          <div className="flex flex-col flex-auto pt-[60px]">
            <div className="flex flex-col flex-auto flex-shrink-0 bg-gray-100 h-full p-4">
              <div className="flex flex-col h-full overflow-x-auto mb-4">
                <div className="flex flex-col h-full">
                  <div className="flex flex-wrap justify-center gap-3">
                    {data?.map((photo) => (
                      <Photo key={photo.id} photo={photo} />
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
