"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import shortid from "shortid";
import CreatePost from "./components/CreatePost";
import ErrorComponent from "./components/ErrorComponent";
import LoadingComponent from "./components/LoadingComponent";
import Posts from "./components/Posts";
import { type PostType } from "./components/Posts";
import { useContext } from "react";
import { AuthenticationContext } from "@/app/context/AuthContext";

export default function page() {
  const auth = useContext(AuthenticationContext);
  let { data, error, isError, isLoading } = useQuery<PostType[]>({
    queryKey: ["posts"],
    queryFn: async () => {
      const response = await axios.post("/api/posts/getPosts", { email: auth.data?.email || "" });
      return response.data;
    },
    enabled: true, // Fetch the data every time the component mounts
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
                    <Posts key={shortid.generate()} post={post} />
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
