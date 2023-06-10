import React from "react";

type Props = {
  changeHandler: any;
  numValue: string;
};

export default function Slider({ changeHandler, numValue }: Props) {
  return (
    <input
      type="text"
      onChange={changeHandler}
      value={numValue}
      onKeyPress={(event) => {
        const pattern = /[0-9.]|\./;
        const inputChar = String.fromCharCode(event.charCode);

        if (!pattern.test(inputChar)) {
          event.preventDefault();
        }
      }}
      className="w-[150px] px-4 py-2 appearance-none outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
    />
  );
}
