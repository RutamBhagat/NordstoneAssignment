"use client";

import { useEffect, useState } from "react";
import Header from "../components/Header";
import axios from "axios";

const fetchData = async () => {
  const res = await axios.get("/api/dummy");
  return res.data.data;
};

export default function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const data = await fetchData();
      setData(data);
    };
    getData();
  }, []);

  return (
    <main>
      <Header />
      <div className="py-3 px-36 pt-10 flex flex-wrap justify-center bg-[#0a081a]">
        {data.map((user: any) => {
          return (
            <div key={user.id} className="w-full py-10">
              <div className="flex flex-col items-center justify-center bg-[#0a081a]">
                <h1 className="text-white">{user.id}</h1>
                <h1 className="text-white">{user.userId}</h1>
                <h1 className="text-white">{user.title}</h1>
                <h1 className="text-white">{user.completed}</h1>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
