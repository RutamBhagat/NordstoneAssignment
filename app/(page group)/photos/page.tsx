"use client";
import { AuthenticationContext } from "@/app/context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import LoadingComponent from "../text/components/LoadingComponent";
import ErrorComponent from "../text/components/ErrorComponent";
import CreatePhoto from "./components/CreatePhoto";
import Photo from "./components/Photo";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

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
    return <LoadingComponent />;
  }

  if (isError) {
    const { message } = error as Error;
    return <ErrorComponent message={message} />;
  }

  return (
    <>
      <div className="flex h-screen text-gray-800">
        <div className="flex flex-row h-full w-full overflow-x-hidden">
          <div className="flex flex-col flex-auto pt-[60px]">
            <div className="flex flex-col flex-auto flex-shrink-0 bg-gray-100 h-full">
              <div className="flex flex-col h-full overflow-x-auto">
                <div className="flex flex-col h-full p-3">
                  <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
                    <Masonry gutter="12px">
                      {data?.map((photo) => (
                        <Photo key={photo.id} photo={photo} />
                      ))}
                    </Masonry>
                  </ResponsiveMasonry>
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
