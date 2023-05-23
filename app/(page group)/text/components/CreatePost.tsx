"use client";
import React, { useContext, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { toast } from "react-hot-toast";
import { AuthenticationContext } from "@/app/context/AuthContext";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const { data } = useContext(AuthenticationContext);
  const queryClient = useQueryClient();
  let toastPostID: string;

  //create a post
  const { mutate } = useMutation(
    async (title: string) => {
      await axios.post("/api/posts/addPost", { title: title, email: data?.email });
    },
    {
      onError: (error) => {
        if (error instanceof AxiosError) {
          toast.error(error?.response?.data.message, { id: toastPostID });
        }
        setIsDisabled(false);
      },
      onSuccess: (data) => {
        toast.success("Post created successfully.", { id: toastPostID });
        setTitle("");
        setIsDisabled(false);
        queryClient.invalidateQueries(["posts"]);
      },
    }
  );

  const submitPost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toastPostID = toast.loading("Creating post...", { id: toastPostID });
    setIsDisabled(true);
    mutate(title);
  };

  return (
    <>
      <form className="flex pt-10 justify-center items-center" onSubmit={submitPost}>
        <div className="w-full max-w-xl mx-10 lg:mx-24 lg:max-w-3xl mb-4 border border-gray-200 rounded-lg bg-gray-50">
          <div className="px-4 py-2 bg-white rounded-t-lg">
            <label htmlFor="comment" className="sr-only">
              Your comment
            </label>
            <textarea
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              name="title"
              value={title}
              className="w-full p-4 my-2 text-sm text-gray-900 bg-white border-0 focus:outline-0"
              placeholder="Write a post..."
            ></textarea>
          </div>
          <div className="flex items-center justify-between px-3 py-2 border-t">
            <div className="flex pl-0 space-x-1 sm:pl-2">
              <p
                className={`font-bold text-sm ${title.length > 300 ? "text-red-700" : "text-gray-700"}`}
              >{`${title.length}/300`}</p>
            </div>
            <button
              disabled={isDisabled}
              type="submit"
              className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800"
            >
              Post
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
