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
        <div className="flex justify-end items-center cursor-default outline-none h-[100px] w-full bg-gray-900 text-white text-right text-[25px] font-medium tracking-[1px] border-0">
          {result}
        </div>

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
        <img className="w-8" src="https://img.icons8.com/nolan/64/calculator--v1.png" alt="calculator--v1" />
      </Link>
    </div>
  );
}
