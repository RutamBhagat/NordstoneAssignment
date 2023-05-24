"use client";
import { AuthenticationContext } from "@/app/context/AuthContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import React, { useContext } from "react";
import { toast } from "react-hot-toast";

export type PostType = {
  id: string;
  title: string;
  createdAt: string;
  user: {
    id: string;
    email: string;
  };
  published: boolean;
  updatedAt: string;
  userId: string;
};

export default function Post({ post }: { post: PostType }) {
  const { data } = useContext(AuthenticationContext);
  const queryClient = useQueryClient();
  let toastPostID: string;

  //create a post
  const { mutate } = useMutation(
    async (id: string) => {
      try {
        const response = await axios.post("/api/posts/deletePost", {
          id: id,
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
        toast.success("Text deleted successfully.", { id: toastPostID });
        queryClient.invalidateQueries(["posts"]);
      },
    }
  );

  const deletePost = async (id: string) => {
    mutate(id);
  };

  return (
    <>
      <div className="col-start-6 col-end-13 p-3 rounded-lg">
        <div className="flex items-center justify-start flex-row-reverse">
          <button
            onClick={() => {
              deletePost(post.id);
            }}
            className="group flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0"
          >
            {data?.email.substring(0, 2).toUpperCase() || "user"}
          </button>
          <div className="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
            <div>{post.title}</div>
          </div>
        </div>
      </div>
    </>
  );
}
