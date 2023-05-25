"use client";
import axios from "axios";
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
    ch = ch.slice(0, -1);
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
    <div className="min-h-screen flex justify-center items-center">
      <div className="text-xl p-3 mt-[60px] w-full max-w-xl rounded-xl border border-gray-900 bg-gray-900">
        <form>
          <input
            className="outline-none h-[100px] w-full bg-gray-900 text-white text-right text-[25px] font-medium tracking-[1px] border-0"
            type="text"
            value={result}
          />
        </form>

        <div className="grid grid-cols-4">
          <button
            className="h-[90px] outline-none cursor-pointer font-medium m-1 rounded-xl border-none bg-cyan-600 hover:bg-cyan-500 col-span-2 text-white"
            onClick={clear}
            id="clear"
          >
            Clear
          </button>
          <button
            className="h-[90px] outline-none cursor-pointer font-medium m-1 rounded-xl border-none bg-cyan-600 hover:bg-cyan-500 text-white"
            onClick={backspace}
            id="backspace"
          >
            C
          </button>
          <button
            className="h-[90px] outline-none cursor-pointer text-white font-medium m-1 rounded-xl border-none bg-cyan-600 hover:bg-cyan-500"
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
            className="h-[90px] outline-none cursor-pointer text-white font-medium m-1 rounded-xl border-none bg-cyan-600 hover:bg-cyan-500"
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
            className="h-[90px] outline-none cursor-pointer text-white font-medium m-1 rounded-xl border-none bg-cyan-600 hover:bg-cyan-500"
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
            className="h-[90px] outline-none cursor-pointer text-white font-medium m-1 rounded-xl border-none bg-cyan-600 hover:bg-cyan-500"
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
            className="h-[90px] outline-none cursor-pointer font-medium m-1 rounded-xl border-none bg-cyan-600 hover:bg-cyan-500 col-span-2 text-white"
            onClick={calculate}
            id="result"
          >
            =
          </button>
        </div>
      </div>
    </div>
  );
}
