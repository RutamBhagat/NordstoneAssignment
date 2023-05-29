"use client";
import addNotification from "react-push-notification";

export default function Home() {
  const clickToNotify = () => {
    addNotification({
      title: "Nordstone Assignment",
      message: "You have clicked the big red button",
      duration: 2000,
      icon: "@/pages/images/icons8-commercial-40.png",
      native: true,
    });
  };

  return (
    <div className="relative mt-[60px] min-h-screen pt-5 flex justify-center items-center">
      <div
        onClick={clickToNotify}
        className="flex justify-center items-center cursor-pointer gap-5 text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
      >
        <div className="inline-block bg-white rounded-full p-2">
          <img
            className="w-8"
            src="data:image/png;base64,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"
          />
        </div>
        <div className="">
          <p>Click here</p>
          <p>to send</p>
          <p>notification</p>
        </div>
      </div>
    </div>
  );
}
