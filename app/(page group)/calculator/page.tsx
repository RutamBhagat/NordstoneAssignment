"use client";
import React, { useState } from "react";

export default function page() {
  const [result, setResult] = useState("");

  const handleClick = (e: any) => {
    setResult(result.concat(e.target.name));
  };
  const clear = () => {
    setResult("");
  };
  const backspace = () => {
    setResult(result.slice(0, -1)); // Or -1
  };
  const calculate = () => {
    try {
      setResult(eval(result).toString());
    } catch (err) {
      setResult("Error");
    }
  };
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="absolute -translate-x-2/4 -translate-y-2/4 w-64 text-center mx-auto my-0 rounded-[5px] border-[10px] border-solid border-[#101116] left-2/4 top-2/4 bg[#101116]">
        <form>
          <input
            className="outline-none h-[75px] w-full bg-[#101116] text-white text-right text-[25px] font-medium tracking-[1px] border-0"
            type="text"
            value={result}
          />
        </form>

        <div className="grid grid-cols-4 bg-[#101116] auto-rows-[minmax(60px,auto)]">
          <button
            className="outline-none cursor-pointer font-medium m-[5px] rounded-[5px] border-[none] bg-[#56cbdb] col-span-2 text-white"
            onClick={clear}
            id="clear"
          >
            Clear
          </button>
          <button
            className="outline-none cursor-pointer font-medium m-[5px] rounded-[5px] border-[none] bg-[#56cbdb] text-white"
            onClick={backspace}
            id="backspace"
          >
            C
          </button>
          <button
            className="outline-none cursor-pointer text-white font-medium m-[5px] rounded-[5px] border-[none] bg-[#56cbdb]"
            onClick={handleClick}
            name="/"
          >
            &divide;
          </button>
          <button
            className="outline-none cursor-pointer text-white font-medium m-[5px] rounded-[5px] border-[none] bg-[#262834]"
            onClick={handleClick}
            name="7"
          >
            7
          </button>
          <button
            className="outline-none cursor-pointer text-white font-medium m-[5px] rounded-[5px] border-[none] bg-[#262834]"
            onClick={handleClick}
            name="8"
          >
            8
          </button>
          <button
            className="outline-none cursor-pointer text-white font-medium m-[5px] rounded-[5px] border-[none] bg-[#262834]"
            onClick={handleClick}
            name="9"
          >
            9
          </button>
          <button
            className="outline-none cursor-pointer text-white font-medium m-[5px] rounded-[5px] border-[none] bg-[#56cbdb]"
            onClick={handleClick}
            name="*"
          >
            &times;
          </button>
          <button
            className="outline-none cursor-pointer text-white font-medium m-[5px] rounded-[5px] border-[none] bg-[#262834]"
            onClick={handleClick}
            name="4"
          >
            4
          </button>
          <button
            className="outline-none cursor-pointer text-white font-medium m-[5px] rounded-[5px] border-[none] bg-[#262834]"
            onClick={handleClick}
            name="5"
          >
            5
          </button>
          <button
            className="outline-none cursor-pointer text-white font-medium m-[5px] rounded-[5px] border-[none] bg-[#262834]"
            onClick={handleClick}
            name="6"
          >
            6
          </button>
          <button
            className="outline-none cursor-pointer text-white font-medium m-[5px] rounded-[5px] border-[none] bg-[#56cbdb]"
            onClick={handleClick}
            name="-"
          >
            &ndash;
          </button>
          <button
            className="outline-none cursor-pointer text-white font-medium m-[5px] rounded-[5px] border-[none] bg-[#262834]"
            onClick={handleClick}
            name="1"
          >
            1
          </button>
          <button
            className="outline-none cursor-pointer text-white font-medium m-[5px] rounded-[5px] border-[none] bg-[#262834]"
            onClick={handleClick}
            name="2"
          >
            2
          </button>
          <button
            className="outline-none cursor-pointer text-white font-medium m-[5px] rounded-[5px] border-[none] bg-[#262834]"
            onClick={handleClick}
            name="3"
          >
            3
          </button>
          <button
            className="outline-none cursor-pointer text-white font-medium m-[5px] rounded-[5px] border-[none] bg-[#56cbdb]"
            onClick={handleClick}
            name="+"
          >
            +
          </button>
          <button
            className="outline-none cursor-pointer text-white font-medium m-[5px] rounded-[5px] border-[none] bg-[#262834]"
            onClick={handleClick}
            name="0"
          >
            @
          </button>
          <button
            className="outline-none cursor-pointer text-white font-medium m-[5px] rounded-[5px] border-[none] bg-[#262834]"
            onClick={handleClick}
            name="."
          >
            .
          </button>
          <button
            className="outline-none cursor-pointer font-medium m-[5px] rounded-[5px] border-[none] bg-[#56cbdb] col-span-2 text-white"
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
