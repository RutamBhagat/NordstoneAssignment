"use client";
import axios from "axios";
import { AuthenticationContext } from "@/app/context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import CreatePhoto from "./components/CreatePhoto";
import ErrorComponent from "../components/ErrorComponent";
import LoadingComponent from "../components/LoadingComponent";
import Photo from "./components/Photo";

export default function Home() {
  const auth = useContext(AuthenticationContext);

  if (!auth.data?.email) {
    return <LoadingComponent />;
  }

  const { data, error, isError, isLoading } = useQuery<PhotoType[]>({
    queryKey: ["photos"],
    queryFn: async () => {
      const response = await axios.post("/api/photos/getPhotos", { email: auth.data!.email! });
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
      <div className="flex flex-col flex-auto flex-shrink-0 bg-gray-100 h-full m-3 pt-[60px]">
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 600: 2, 900: 3 }}>
          <Masonry gutter="12px">
            {data?.map((photo) => (
              <Photo key={photo.id} photo={photo} />
            ))}
          </Masonry>
        </ResponsiveMasonry>
      </div>
      <CreatePhoto />
    </>
  );
}
