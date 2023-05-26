"use client";
import Link from "next/link";
import React from "react";
import { useRef, useEffect } from "react";

export default function UploadWidget() {
  const cloudinaryRef = useRef(null);
  const widgetRef = useRef(null);

  useEffect(() => {
    // @ts-ignore
    cloudinaryRef.current = window.cloudinary;
    // @ts-ignore
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      { cloudName: "drxe0t2yg", uploadPreset: "my_uploads" },
      (error: any, result: any) => {
        console.log("result", result);
      }
    );
  }, []);

  return (
    <button
      onClick={() => {
        // @ts-ignore
        widgetRef.current.open();
      }}
      type="button"
      className="inline-flex justify-center p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100"
    >
      <img
        className="w-5"
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAACz0lEQVR4nO2Zz29MURTHP7rRMkSlNi3dof4MOmNlwWwJxbLRWEiRJigLlI34O6iF1MZKWDAdEkFH7XSvP236w5Mr35u8TN7E+3HfnWnyTvJNXubNPfd+5p533jl3oLDCCmuH7QSuAd+ATSCIqU3gq8YaH221XcDrBItvpTdAqZ0gTx1ABNKTrIt5958J3rYYNwisOwRZl8/UFmeSKLvtECKQbqUBGADu57AYV1oDPgL3gAOtIM4Bqx2w2CCmloFqM8RZ4E8HLC5IqK0wjAmnlQ5YVFot2TDz8Uw0gAfAMDAE7JbMdRl4CHzP4H/SgHyOuPFSO3UQmMkwQQ04kSDZDAOzKeYxCYDfETcMgLVDKfP/KLBDPvYDl4AX2p01yVxPAxeBXn3XjLkCbCSYzzwakTeygPwCjmtsDzChDBMn1m9qjN2dxQTzRn44IxgD8SrhTliIgZRhUtNYCxN3Z1LHf5RGQxALGfwshGDGfIPUFN89KXeiWR+AbqALqPsEsdlpwqHP6/JZ9gXSCGWnJYcgi6FsNu8DxLxUjV12CBFII/I95QPEbD16T7gGeS7fFR8ghzXZjxxAGvJ91AeI7a3zaANW5bvkA2RPjiDL8r3XB8gRTZalgm2lOfke8vmwT+cA8ky+T/oAMf0EqmJdg5yX78c+QGxm6c3hhbjP5wsxUKWKSnFXPsdjhpVTkFkVjd0qILP6ex8qGj/5BAnU2bko438C/fJ1NeYYpyAboRDr16+apv8eDFW9bWms7ANqYUxo3IjZsprvjIf+Tqi4aHVd7MyY4ttmsxEVgHOqAFZ1bT67EMpOXQqnJIcP/0DyPJz7ApwivpVjdoORZUycjJBV8+onKio1StIxpdZHGSvnugG56wEkb91B56Zxzp06VUtAn43Nqk62g22mLeB084NWdVwn+diJM62yRp9Otusd+qfPitY2GQ6nwgorrDC2nf0FxZxxcblnBPsAAAAASUVORK5CYII="
      />
    </button>
  );
}
