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
  const { data, error, isError, isLoading } = useQuery<PostType[]>({
    queryKey: ["posts"],
    queryFn: async () => {
      const response = await axios.post("/api/posts/getPosts", { email: auth.data?.email });
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
    <main className="min-h-screen bg-gradient-to-t from-[#0a081a] to-[#1c1649]">
      <CreatePost />
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap justify-center -m-4">
            {data?.map((post) => (
              <Posts key={shortid.generate()} post={post} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
