"use client";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";

export default function page() {
  const [result, setResult] = useState("0");
  const [num1, setNum1] = useState("0");
  const [num2, setNum2] = useState("0");
  const [operation, setOperation] = useState("+");

  function sanitizeNum1(numberString: string) {
    let sanitizedNumber = numberString;

    sanitizedNumber = sanitizedNumber.replace(/^\.+|\.+$/g, "");
    sanitizedNumber = sanitizedNumber.replace(/^0+(?!$)/, "");

    setNum1(sanitizedNumber);
    return sanitizedNumber;
  }
  function sanitizeNum2(numberString: string) {
    let sanitizedNumber = numberString;

    sanitizedNumber = sanitizedNumber.replace(/^\.+|\.+$/g, "");
    sanitizedNumber = sanitizedNumber.replace(/^0+(?!$)/, "");

    setNum2(sanitizedNumber);
    return sanitizedNumber;
  }

  const calculate = async () => {
    try {
      const response = await axios.post("/api/calculator/evaluate", {
        equation: `${sanitizeNum1(num1)}${operation}${sanitizeNum2(num2)}`,
      });
      setResult(response.data.result);
    } catch (error) {
      setResult("ERROR SENDING DATA TO SERVER");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center gap-10">
      <div className="text-xl w-full max-w-xl rounded-xl bg-gray-900 mt-[60px]">
        <div className="flex flex-col justify-center items-center min-h-[600px] w-full">
          <div className="border border-t-0 border-l-0 border-r-0 border-b-2 border-gray-600 w-[500px]">
            <div className="flex justify-between items-center gap-10 m-5">
              <label className="text-gray-600">Number 1</label>
              <input
                type="text"
                onChange={(e) => {
                  let value = e.target.value;
                  setNum1(value);
                }}
                value={num1}
                onKeyPress={(event) => {
                  const pattern = /[0-9.]|\./;
                  const inputChar = String.fromCharCode(event.charCode);

                  if (!pattern.test(inputChar)) {
                    event.preventDefault();
                  }
                }}
                className="w-[150px] px-4 py-2 appearance-none outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
            </div>
            <div className="flex justify-between items-center gap-10 m-5">
              <label className="text-gray-600">Operation</label>
              <div className="inline-block">
                <div className="relative w-[150px] max-w-xs">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400 right-2.5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <select
                    onChange={(e) => {
                      const selectedOperation = e.target.value;
                      setOperation(selectedOperation);
                    }}
                    className="w-full p-2 text-gray-500 bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600"
                  >
                    <option value="+">+</option>
                    <option value="-">&ndash;</option>
                    <option value="*">&times;</option>
                    <option value="/">&divide;</option>
                    <option value="**">^</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center gap-10 m-5">
              <label className="text-gray-600">Number 2</label>
              <input
                type="text"
                onChange={(e) => {
                  let value = e.target.value;
                  setNum2(value);
                }}
                value={num2}
                onKeyPress={(event) => {
                  const pattern = /[0-9.]|\./;
                  const inputChar = String.fromCharCode(event.charCode);

                  if (!pattern.test(inputChar)) {
                    event.preventDefault();
                  }
                }}
                className="w-[150px] px-4 py-2 appearance-none outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
            </div>
          </div>
          <div className="w-[500px]">
            <div className="flex justify-between items-center gap-10 m-5">
              <h1 className="text-gray-300 text-2xl pl-10">{result}</h1>
              <button
                onClick={calculate}
                className="w-[150px] px-4 py-2 text-indigo-600 bg-indigo-50 rounded-lg duration-150 hover:bg-indigo-100 active:bg-indigo-200"
              >
                Calculate
              </button>
            </div>
          </div>
        </div>
        <div></div>
      </div>
      <Link
        href="/calculator"
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
