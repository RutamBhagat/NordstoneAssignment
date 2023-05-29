"use client";
import React, { useContext, useRef } from "react";
import { AuthenticationContext } from "@/app/context/AuthContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-hot-toast";
import getFormattedIST from "@/lib/getFormattedIST";
import deletePost from "@/lib/deletePost";

export default function Post({ post }: { post: PostType }) {
  const { data } = useContext(AuthenticationContext);
  const queryClient = useQueryClient();
  const toastPostID = useRef<string | undefined>(undefined);

  //delete a post
  const { mutate } = useMutation(deletePost, {
    onMutate: () => {
      toastPostID.current = toast.loading("Deleting the text...");
    },
    onSuccess: () => {
      toast.success("Text deleted successfully.", { id: toastPostID.current });
      toastPostID.current = undefined; // Reset toastPostID after successful deletion
      queryClient.invalidateQueries(["posts"]);
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error?.response?.data.message, { id: toastPostID.current });
        toastPostID.current = undefined; // Reset toastPostID after error
      }
    },
  });

  return (
    <>
      <div className="col-start-6 col-end-13 p-3 rounded-lg">
        <div className="flex items-center justify-start flex-row-reverse">
          <button
            onClick={() => {
              mutate(post.id);
            }}
            className="group relative flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0"
          >
            {data?.email.substring(0, 2).toUpperCase() || "user"}
            <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 rounded-full border border-gray-900 transition-opacity duration-300 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="64" height="64" viewBox="0 0 64 64">
                <linearGradient
                  id="RkUIzUhPq0cp3m~uPRtTga_44054_gr1"
                  x1="41"
                  x2="41"
                  y1="33.333"
                  y2="42.667"
                  gradientUnits="userSpaceOnUse"
                  spreadMethod="reflect"
                >
                  <stop offset="0" stop-color="#6dc7ff"></stop>
                  <stop offset="1" stop-color="#e6abff"></stop>
                </linearGradient>
                <path fill="url(#RkUIzUhPq0cp3m~uPRtTga_44054_gr1)" d="M41 34A4 4 0 1 0 41 42A4 4 0 1 0 41 34Z"></path>
                <linearGradient
                  id="RkUIzUhPq0cp3m~uPRtTgb_44054_gr2"
                  x1="23"
                  x2="23"
                  y1="33.333"
                  y2="42.667"
                  gradientUnits="userSpaceOnUse"
                  spreadMethod="reflect"
                >
                  <stop offset="0" stop-color="#6dc7ff"></stop>
                  <stop offset="1" stop-color="#e6abff"></stop>
                </linearGradient>
                <path fill="url(#RkUIzUhPq0cp3m~uPRtTgb_44054_gr2)" d="M23 34A4 4 0 1 0 23 42A4 4 0 1 0 23 34Z"></path>
                <linearGradient
                  id="RkUIzUhPq0cp3m~uPRtTgc_44054_gr3"
                  x1="32"
                  x2="32"
                  y1="7.25"
                  y2="56.501"
                  gradientUnits="userSpaceOnUse"
                  spreadMethod="reflect"
                >
                  <stop offset="0" stop-color="#1a6dff"></stop>
                  <stop offset="1" stop-color="#c822ff"></stop>
                </linearGradient>
                <path
                  fill="url(#RkUIzUhPq0cp3m~uPRtTgc_44054_gr3)"
                  d="M51,10H40.618l-1.171-2.341C38.936,6.636,37.907,6,36.763,6h-9.525 c-1.145,0-2.173,0.636-2.685,1.659L23.382,10H13c-2.757,0-5,2.243-5,5v3h2c1.654,0,3,1.346,3,3v26c0,3.859,3.141,7,7,7h24 c3.859,0,7-3.141,7-7V21c0-1.654,1.346-3,3-3h2v-3C56,12.243,53.757,10,51,10z M26.342,8.554C26.513,8.212,26.855,8,27.237,8h9.525 c0.382,0,0.725,0.212,0.896,0.554L38.382,10H25.618L26.342,8.554z M49,21v26c0,2.757-2.243,5-5,5H20c-2.757,0-5-2.243-5-5V21 c0-1.13-0.391-2.162-1.026-3H19v4h2v-4h4v6h2v-6h4v9h2v-9h4v6h2v-6h4v4h2v-4h5.026C49.391,18.838,49,19.87,49,21z M54,16H10v-1 c0-1.654,1.346-3,3-3h38c1.654,0,3,1.346,3,3V16z"
                ></path>
                <linearGradient
                  id="RkUIzUhPq0cp3m~uPRtTgd_44054_gr4"
                  x1="32"
                  x2="32"
                  y1="41.667"
                  y2="59.001"
                  gradientUnits="userSpaceOnUse"
                  spreadMethod="reflect"
                >
                  <stop offset="0" stop-color="#6dc7ff"></stop>
                  <stop offset="1" stop-color="#e6abff"></stop>
                </linearGradient>
                <path
                  fill="url(#RkUIzUhPq0cp3m~uPRtTgd_44054_gr4)"
                  d="M32,42c-2.761,0-5,2.239-5,5v9c0,1.105,0.895,2,2,2h6c1.105,0,2-0.895,2-2v-9 C37,44.239,34.761,42,32,42z"
                ></path>
              </svg>
            </span>
          </button>
          <div className="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
            <div>{post.title}</div>
            <div className="absolute text-xs bottom-0 right-0 -mb-5 mr-2 text-gray-500">
              {getFormattedIST(post.createdAt)}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
