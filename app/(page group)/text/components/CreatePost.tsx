"use client";
import React, { useContext, useState } from "react";
import axios, { AxiosError } from "axios";
import { AuthenticationContext } from "@/app/context/AuthContext";
import { toast } from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

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
        toast.success("Text created successfully.", { id: toastPostID });
        setTitle("");
        setIsDisabled(false);
        queryClient.invalidateQueries(["posts"]);
      },
    }
  );

  const submitPost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsDisabled(true);
    mutate(title);
  };

  return (
    <>
      <form onSubmit={submitPost}>
        <div className="flex items-center px-3 py-2 rounded-lg bg-gray-50 border">
          {/* You can implement the gallery here afterwords */}
          {/* <button
            type="button"
            className="inline-flex justify-center p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100"
          >
            <svg
              aria-hidden="true"
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button> */}
          <textarea
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            value={title}
            id="chat"
            rows={1}
            className="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:outline-none"
            placeholder="Your message..."
          ></textarea>
          <div className="flex pl-0 space-x-1 sm:pl-2">
            <p
              className={`font-bold text-sm mr-2 ${title.length > 300 ? "text-red-700" : "text-gray-700"}`}
            >{`${title.length}/300`}</p>
          </div>
          <button
            disabled={isDisabled}
            type="submit"
            className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100"
          >
            <svg
              aria-hidden="true"
              className="w-6 h-6 rotate-90"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
            </svg>
          </button>
        </div>
      </form>
    </>
  );
}
