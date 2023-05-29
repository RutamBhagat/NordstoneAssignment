"use client";
import addNotification from "react-push-notification";

export default function Home() {
  return (
    <div className="relative mt-[60px] min-h-screen pt-5 flex justify-center items-center">
      <div
        onClick={() => {
          addNotification({
            title: "Nordstone Assignment",
            message: "You have clicked the big red button",
            duration: 3000,
            icon: "https://media.licdn.com/dms/image/C4D0BAQHGSg1Bni4TYw/company-logo_200_200/0/1616853744387?e=2147483647&v=beta&t=tF_3p6OZKkNd0TyC9oXS45JkkyuVm6nLO6TIC1ilIqw",
            native: true,
          });
        }}
        className="flex justify-center items-center cursor-pointer gap-5 text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
      >
        <div className="inline-block bg-white rounded-full p-2">
          <img
            className="w-8"
            src="https://photos.wellfound.com/startups/i/8323263-74d2bac371f5f34b7d05369dc4296767-medium_jpg.jpg?buster=1620211704"
          />
        </div>
        <div>
          <p>Click here</p>
          <p>to send</p>
          <p>notification</p>
        </div>
      </div>
    </div>
  );
}
