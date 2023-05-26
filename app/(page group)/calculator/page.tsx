"use client";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";

export default function page() {
  const [result, setResult] = useState("0");

  const handleClick = (e: any) => {
    const num = e.target.name;

    if (result === "0" && !isNaN(parseInt(num))) {
      setResult(num);
      return;
    }

    let ch = result;
    if (isNaN(parseInt(ch[ch.length - 1])) && isNaN(parseInt(num))) {
      if (ch.length <= 1) {
        ch = "0";
      }
      ch = ch.slice(0, -1);
    }

    setResult(ch.concat(num));
  };

  const clear = () => {
    setResult("0");
  };

  const backspace = () => {
    if (result === "ERROR" || result === "NaN" || result === "MATHEMATICAL ERROR") {
      clear();
      return;
    }
    let ch = result;
    if (ch.length <= 1) {
      setResult("0");
      return;
    }
    const lastLetter = ch[ch.length - 1];
    if (lastLetter === "*") {
      ch = ch.slice(0, -2);
    } else {
      ch = ch.slice(0, -1);
    }
    if (ch.length === 1 && isNaN(parseInt(ch))) {
      ch = "0";
    }
    setResult(ch);
  };

  const calculate = async () => {
    try {
      const response = await axios.post("/api/calculator/evaluate", { equation: result });
      setResult(response.data.result);
    } catch (error) {
      setResult("ERROR SENDING DATA TO SERVER");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center gap-10">
      <div className="text-xl p-3 w-full max-w-xl rounded-xl bg-gray-900 mt-[60px]">
        <form>
          <input
            className="outline-none h-[100px] w-full bg-gray-900 text-white text-right text-[25px] font-medium tracking-[1px] border-0"
            type="text"
            onChange={(e) => {}}
            value={result}
          />
        </form>

        <div className="grid grid-cols-4">
          <button
            className="h-[90px] outline-none cursor-pointer font-medium m-1 rounded-xl border-none bg-[#ea580c] hover:bg-[#f97316] text-white"
            onClick={clear}
            id="clear"
          >
            Clear
          </button>
          <button
            className="h-[90px] outline-none cursor-pointer font-medium m-1 rounded-xl border-none bg-[#ea580c] hover:bg-[#f97316] text-white"
            onClick={backspace}
            id="backspace"
          >
            C
          </button>
          <button
            className="h-[90px] outline-none cursor-pointer text-white font-medium m-1 rounded-xl border-none bg-[#ea580c] hover:bg-[#f97316]"
            onClick={handleClick}
            name="**"
          >
            ^
          </button>
          <button
            className="h-[90px] outline-none cursor-pointer text-white font-medium m-1 rounded-xl border-none bg-[#ea580c] hover:bg-[#f97316]"
            onClick={handleClick}
            name="/"
          >
            &divide;
          </button>
          <button
            className="h-[90px] outline-none cursor-pointer text-white font-medium m-1 rounded-xl border-none bg-gray-800 hover:bg-gray-700"
            onClick={handleClick}
            name="7"
          >
            7
          </button>
          <button
            className="h-[90px] outline-none cursor-pointer text-white font-medium m-1 rounded-xl border-none bg-gray-800 hover:bg-gray-700"
            onClick={handleClick}
            name="8"
          >
            8
          </button>
          <button
            className="h-[90px] outline-none cursor-pointer text-white font-medium m-1 rounded-xl border-none bg-gray-800 hover:bg-gray-700"
            onClick={handleClick}
            name="9"
          >
            9
          </button>
          <button
            className="h-[90px] outline-none cursor-pointer text-white font-medium m-1 rounded-xl border-none bg-[#ea580c] hover:bg-[#f97316]"
            onClick={handleClick}
            name="*"
          >
            &times;
          </button>
          <button
            className="h-[90px] outline-none cursor-pointer text-white font-medium m-1 rounded-xl border-none bg-gray-800 hover:bg-gray-700"
            onClick={handleClick}
            name="4"
          >
            4
          </button>
          <button
            className="h-[90px] outline-none cursor-pointer text-white font-medium m-1 rounded-xl border-none bg-gray-800 hover:bg-gray-700"
            onClick={handleClick}
            name="5"
          >
            5
          </button>
          <button
            className="h-[90px] outline-none cursor-pointer text-white font-medium m-1 rounded-xl border-none bg-gray-800 hover:bg-gray-700"
            onClick={handleClick}
            name="6"
          >
            6
          </button>
          <button
            className="h-[90px] outline-none cursor-pointer text-white font-medium m-1 rounded-xl border-none bg-[#ea580c] hover:bg-[#f97316]"
            onClick={handleClick}
            name="-"
          >
            &ndash;
          </button>
          <button
            className="h-[90px] outline-none cursor-pointer text-white font-medium m-1 rounded-xl border-none bg-gray-800 hover:bg-gray-700"
            onClick={handleClick}
            name="1"
          >
            1
          </button>
          <button
            className="h-[90px] outline-none cursor-pointer text-white font-medium m-1 rounded-xl border-none bg-gray-800 hover:bg-gray-700"
            onClick={handleClick}
            name="2"
          >
            2
          </button>
          <button
            className="h-[90px] outline-none cursor-pointer text-white font-medium m-1 rounded-xl border-none bg-gray-800 hover:bg-gray-700"
            onClick={handleClick}
            name="3"
          >
            3
          </button>
          <button
            className="h-[90px] outline-none cursor-pointer text-white font-medium m-1 rounded-xl border-none bg-[#ea580c] hover:bg-[#f97316]"
            onClick={handleClick}
            name="+"
          >
            +
          </button>
          <button
            className="h-[90px] outline-none cursor-pointer text-white font-medium m-1 rounded-xl border-none bg-gray-800 hover:bg-gray-700"
            onClick={handleClick}
            name="0"
          >
            0
          </button>
          <button
            className="h-[90px] outline-none cursor-pointer text-white font-medium m-1 rounded-xl border-none bg-gray-800 hover:bg-gray-700"
            onClick={handleClick}
            name="."
          >
            .
          </button>
          <button
            className="h-[90px] outline-none cursor-pointer font-medium m-1 rounded-xl border-none bg-[#ea580c] hover:bg-[#f97316] col-span-2 text-white"
            onClick={calculate}
            id="result"
          >
            =
          </button>
        </div>
      </div>
      <Link
        href="/calculator/simple"
        className="absolute right-5 bottom-5 px-3 py-3 text-indigo-600 bg-indigo-50 rounded-lg duration-150 hover:bg-indigo-100 active:bg-indigo-200"
      >
        <img
          className="w-8"
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFGklEQVR4nO2a3W8UZRSHJ17wH0hQImg/tqVadbtbCmVraRtIS7eU2i5UUSrVLv2IiSaEVow0QauLhojBlMiHUowXJtUYJRJbu0VD4z294MK7LvW6ulzYq8ec7k67zDDsfO12E+eXPMm8v3PmnPPONsu8GxTFkydPnjx58uTJQE8O0r5liJtbB7m3dQjWhUHubRlk9okB2pR8qniAWPEAFBJFA4zlZfO+Y7T7+qG0n2XfMU6UDfG4sk6S3r4Bhldm6YeSfsI5b1oR5WZFFCqiDCsFIplFZtoWJZ7zZpVvkKzsg/IojykFoopBNslMlX38k/Nm/tdBUApMeZsr2AuC1q+IsCHYy5ngUf5Sc1znKIvBo8Skl9m5XNeO10DQ+T3E1FjO6SFmdi7XFeoBQecfYVH8oe/gnVu5YWgy1Vt6mZ3LddW/CoKRf/ZmbsnWP+cPoOkVEIz8q9Mp1LVTX0u2/jl/AHtfBsHIv34jhbp26mvJ1j/nD2BfNwhG/h8/usvkV/D2cejsSdV3xCHutXQz2/ySg7ND2yEQtH74IIvi//IF/Pm9O1z6CNq7U/3cJnzQ5tmhIwKC1j/QRUyNucmBCMvtXZzY3+38zCE1OiIMS82V2p02zg5dXSBo/UiEDV1dxDo7WVRz3KCz0/0zh9RM17d+duh+EQS3h9L16SApfQ536M8cZmcwyotE2JSOWT87HO5YGSrnD+BhfczO4EYNnXraQVByrIf1cWMG2zV694PgpLmdPuraCLt5lgeLhkHQ+fto7QtzV41nkOgL02I5T9PnAfn3YTfP8gMYaAVB6/e3klBjWvr3sWA1z6hPtpjTfWTVmy0g2PWd5mWLmc0zW0Ont5pBsOs7zcsWM5tntoZOx/eCYNd3mueWbNcf2QOCXd9pnluyXf/dJhC0/skmEmpMy8nGtS83s3lGfczovQYCo3vYqK7lWjwz+8iq0UYQdE0baTnVSEKNr9LAwmgTzVbzjPqY2nwDS6camZeNCyvXDSxlPgS79ZXTu0GwfGOe+siGT+9mPn3/fOZ15l+F7X18WA+C5Rsd9lHXRmTeOxbi0bF6bq/GX+DOx/VscmUfZ+pA0PqxOlpjddxV46uESMR2rb3hmc3T9tHla9A+gDMhbmfUvvNB3f2nSqN9ZNXZEAg6fxcJNaZj19qXm+k8gz7Z9MlONp4NMZ++fz7zWmJO6yvnakGw6zvNy6bPQgTO1bL0aW1qw4Jciycxp/WVz3eCYNc3m3d+B0lZn6+1/lPYeA2B8YxPW67FU9cXdrA53e9vq7WVCzUg2PXN5o1vZ1bW4zXu/yQ2XsNIut+M5ZsvVYNg1zedF6RN1herWb5YzfBlv/MfRaWG1JKaUvvydlotF/kyCILOD5BQY1quBNa+3Mzmia4EGDPKdcqVIO/beorXqkDQ+lefp2WiioQaX8XPwjX/2hue2TxVE1WEr/mJT1SR1N1jEakx4Wfm64CNT17VN34QlAJT3ub69jkQlAJT3uaafBYEpcCUt7l+eAYEpcCUt7muPw2CUmDK21w/l5O8sQ2mytbvP0hq9VMpm2WmG9tsvNlZ1VQ5s9PlMFX+4De0UYVHpsq4PF3GsuS5xL/TZVyU2g/qOV3OSDrP+pudVf1aQlvcB/FSluM+hrV/CTOlHFmJ5wCpndlLessM6VlkJvv/vlvRbyWM/V4KBUWJzTc7u5p7ivBcEfG5IpJzxbAuFJG8VczMXFGePnlPnjx58uTJk/J/0H98gqWx+2dXOQAAAABJRU5ErkJggg=="
        />
      </Link>
    </div>
  );
}
