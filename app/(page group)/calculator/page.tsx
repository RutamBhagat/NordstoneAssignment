"use client";
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

  const calculate = () => {
    let ch = result;
    if (isNaN(parseInt(ch[ch.length - 1]))) {
      if (ch.length <= 1) {
        ch = "0";
      }
      ch = ch.slice(0, -1);
    }

    try {
      let evaluation = eval(ch).toString();
      if (evaluation === "NaN") {
        evaluation = "Cannot divide by zero";
      }
      setResult(evaluation);
    } catch (err) {
      setResult("Error");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="text-xl p-3 mt-[60px] w-full max-w-xl rounded-[5px] border border-gray-900 bg-gray-900">
        <form>
          <input
            className="outline-none h-[100px] w-full bg-gray-900 text-white text-right text-[25px] font-medium tracking-[1px] border-0"
            type="text"
            value={result}
          />
        </form>

        <div className="grid grid-cols-4 auto-rows-[minmax(90px,auto)]">
          <button
            className="outline-none cursor-pointer font-medium m-[5px] rounded-[5px] border-[none] bg-cyan-600 col-span-2 text-white"
            onClick={clear}
            id="clear"
          >
            Clear
          </button>
          <button
            className="outline-none cursor-pointer font-medium m-[5px] rounded-[5px] border-[none] bg-cyan-600 text-white"
            onClick={backspace}
            id="backspace"
          >
            C
          </button>
          <button
            className="outline-none cursor-pointer text-white font-medium m-[5px] rounded-[5px] border-[none] bg-cyan-600"
            onClick={handleClick}
            name="/"
          >
            &divide;
          </button>
          <button
            className="outline-none cursor-pointer text-white font-medium m-[5px] rounded-[5px] border-[none] bg-gray-800"
            onClick={handleClick}
            name="7"
          >
            7
          </button>
          <button
            className="outline-none cursor-pointer text-white font-medium m-[5px] rounded-[5px] border-[none] bg-gray-800"
            onClick={handleClick}
            name="8"
          >
            8
          </button>
          <button
            className="outline-none cursor-pointer text-white font-medium m-[5px] rounded-[5px] border-[none] bg-gray-800"
            onClick={handleClick}
            name="9"
          >
            9
          </button>
          <button
            className="outline-none cursor-pointer text-white font-medium m-[5px] rounded-[5px] border-[none] bg-cyan-600"
            onClick={handleClick}
            name="*"
          >
            &times;
          </button>
          <button
            className="outline-none cursor-pointer text-white font-medium m-[5px] rounded-[5px] border-[none] bg-gray-800"
            onClick={handleClick}
            name="4"
          >
            4
          </button>
          <button
            className="outline-none cursor-pointer text-white font-medium m-[5px] rounded-[5px] border-[none] bg-gray-800"
            onClick={handleClick}
            name="5"
          >
            5
          </button>
          <button
            className="outline-none cursor-pointer text-white font-medium m-[5px] rounded-[5px] border-[none] bg-gray-800"
            onClick={handleClick}
            name="6"
          >
            6
          </button>
          <button
            className="outline-none cursor-pointer text-white font-medium m-[5px] rounded-[5px] border-[none] bg-cyan-600"
            onClick={handleClick}
            name="-"
          >
            &ndash;
          </button>
          <button
            className="outline-none cursor-pointer text-white font-medium m-[5px] rounded-[5px] border-[none] bg-gray-800"
            onClick={handleClick}
            name="1"
          >
            1
          </button>
          <button
            className="outline-none cursor-pointer text-white font-medium m-[5px] rounded-[5px] border-[none] bg-gray-800"
            onClick={handleClick}
            name="2"
          >
            2
          </button>
          <button
            className="outline-none cursor-pointer text-white font-medium m-[5px] rounded-[5px] border-[none] bg-gray-800"
            onClick={handleClick}
            name="3"
          >
            3
          </button>
          <button
            className="outline-none cursor-pointer text-white font-medium m-[5px] rounded-[5px] border-[none] bg-cyan-600"
            onClick={handleClick}
            name="+"
          >
            +
          </button>
          <button
            className="outline-none cursor-pointer text-white font-medium m-[5px] rounded-[5px] border-[none] bg-gray-800"
            onClick={handleClick}
            name="0"
          >
            0
          </button>
          <button
            className="outline-none cursor-pointer text-white font-medium m-[5px] rounded-[5px] border-[none] bg-gray-800"
            onClick={handleClick}
            name="."
          >
            .
          </button>
          <button
            className="outline-none cursor-pointer font-medium m-[5px] rounded-[5px] border-[none] bg-cyan-600 col-span-2 text-white"
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
