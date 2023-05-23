"use client";

import { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import axios from "axios";
import { AuthenticationContext } from "@/app/context/AuthContext";

const fetchData = async () => {
  const res = await axios.get("/api/dummy");
  return res.data.data;
};

export default function Home() {
  const [data, setData] = useState([]);
  const auth = useContext(AuthenticationContext);

  useEffect(() => {
    const getData = async () => {
      const data = await fetchData();
      setData(data);
    };
    getData();
  }, []);

  return (
    <main className="bg-gradient-to-t from-[#0a081a] to-[#1c1649]">
      <div className="text-white text-lg font-semibold flex justify-center items-center">{auth?.data?.email}</div>
      <div className="py-3 px-36 pt-10 flex flex-wrap justify-center">
        {data.map((user: any) => {
          return (
            <div key={user.id} className="w-full py-10">
              <div className="flex flex-col items-center justify-center">
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
