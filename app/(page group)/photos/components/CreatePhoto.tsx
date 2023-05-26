"use client";
import React from "react";
import UploadWidget from "./UploadWidget";

export default function CreatePost() {
  return (
    <>
      <form className="fixed top-20 right-5 border border-gray-400 rounded-lg z-20">
        <UploadWidget command={"CREATE"} />
      </form>
    </>
  );
}
