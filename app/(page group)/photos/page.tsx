"use client";
import axios from "axios";
import { useState } from "react";

export default function Home() {
  const [imageSrc, setImageSrc] = useState();
  const [uploadData, setUploadData] = useState();

  /**
   * handleOnChange
   * @description Triggers when the file input changes (ex: when a file is selected)
   */

  function handleOnChange(changeEvent: any) {
    const reader = new FileReader();

    reader.onload = function (onLoadEvent) {
      // @ts-ignore
      setImageSrc(onLoadEvent.target.result);
      setUploadData(undefined);
    };

    reader.readAsDataURL(changeEvent.target.files[0]);
  }

  /**
   * handleOnSubmit
   * @description Triggers when the main form is submitted
   */

  async function handleOnSubmit(event: any) {
    event.preventDefault();

    const form = event.currentTarget;
    // @ts-ignore
    const fileInput = Array.from(form.elements).find(({ name }) => name === "file");

    const formData = new FormData();

    // @ts-ignore
    for (const file of fileInput.files) {
      formData.append("file", file);
    }

    formData.append("upload_preset", "my_uploads");

    const response = await fetch("https://api.cloudinary.com/v1_1/drxe0t2yg/image/upload", {
      method: "POST",
      body: formData,
    }).then((r) => r.json());
    setImageSrc(response.secure_url);
    setUploadData(response);
  }

  return (
    <div className="grid grid-rows-[1fr_auto] max-w-screen-xl min-h-screen mx-auto my-0 px-8 py-0">
      <main className="flex flex-col justify-center items-center text-center px-0 py-8">
        <h1 className="leading-[1.15] text-[4rem] m-0">Image Uploader</h1>

        <p className="leading-normal text-2xl mx-0 my-16">Upload your image to Cloudinary!</p>

        <form className="" method="post" onChange={handleOnChange} onSubmit={handleOnSubmit}>
          <p>
            <input type="file" name="file" className="text-base p-4 rounded-[0.5em] border-[solid] border-[gray]" />
          </p>

          <img src={imageSrc} />

          {imageSrc && !uploadData && (
            <p>
              <button className="text-[white] text-[1em] bg-[blueviolet] px-[0.8em] py-[0.5em] rounded-[0.2em] border-[none]">
                Upload Files
              </button>
            </p>
          )}
        </form>
      </main>
    </div>
  );
}
