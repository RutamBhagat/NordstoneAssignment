"use client";
import axios from "axios";
import { AuthenticationContext } from "@/app/context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import ErrorComponent from "../components/ErrorComponent";
import Posts from "./components/Posts";

export default function page() {
  const auth = useContext(AuthenticationContext);

  if (!auth.data?.email) {
    return <></>;
  }

  const { data, error, isError, isLoading } = useQuery<PostType[]>({
    queryKey: ["posts"],
    queryFn: async () => {
      const response = await axios.post("/api/posts/getPosts", { email: auth.data!.email! });
      return response.data;
    },
  });

  if (isLoading) {
    return <></>;
  }

  if (isError) {
    const { message } = error as Error;
    return <ErrorComponent message={message} />;
  }

  return (
    <>
      {data?.map((post) => (
        <Posts key={post.id} post={post} />
      ))}
    </>
  );
}
