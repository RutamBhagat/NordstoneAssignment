"use client";
import axios from "axios";
import { AuthenticationContext } from "@/app/context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import CreatePost from "./components/CreatePost";
import ErrorComponent from "../components/ErrorComponent";
import LoadingComponent from "../components/LoadingComponent";
import Posts from "./components/Posts";

export default function page() {
  const auth = useContext(AuthenticationContext);

  if (!auth.data?.email) {
    return <LoadingComponent />;
  }

  const { data, error, isError, isLoading } = useQuery<PostType[]>({
    queryKey: ["posts"],
    queryFn: async () => {
      const response = await axios.post("/api/posts/getPosts", { email: auth.data!.email! });
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
    <div className="flex h-screen text-gray-800">
      <div className="flex flex-row h-full w-full overflow-x-hidden">
        <div className="flex flex-col flex-auto pt-[60px]">
          <div className="flex flex-col flex-auto flex-shrink-0 bg-gray-100 h-full p-4">
            <div className="flex flex-col h-full overflow-x-auto mb-4">
              <div className="flex flex-col h-full">
                <div className="grid grid-cols-12 gap-y-2">
                  {data?.map((post) => (
                    <Posts key={post.id} post={post} />
                  ))}
                </div>
              </div>
            </div>
            <CreatePost />
          </div>
        </div>
      </div>
    </div>
  );
}
