"use client";
import React, { useEffect } from "react";
import { Dashboard } from "@uppy/react";
// @ts-ignore
import uppy from "./utils/uppyConfig";

// Don't forget the CSS: core and the UI components + plugins you are using.
import "@uppy/core/dist/style.min.css";
import "@uppy/dashboard/dist/style.min.css";
import "@uppy/webcam/dist/style.min.css";

export default function page() {
  return (
    <div className="min-h-screen flex justify-center items-center pt-[60px]">
      {/* @ts-ignore */}
      <Dashboard uppy={uppy} plugins={["Webcam"]} />
    </div>
  );
}
