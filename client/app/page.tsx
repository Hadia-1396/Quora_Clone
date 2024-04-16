"use client";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useSession } from "next-auth/react";

export default function Home() {
  const [topicsData, setTopicsData] = useState([]);

  const { data: session } = useSession();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        process.env.NEXT_PUBLIC_BASE_URL + "topics",
        {
          method: "GET",
          headers: {
            authorization: `Bearer ${session?.backendTokens.accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      const { topicsData } = await response.json();
      setTopicsData(topicsData);
    };
    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <div className="text-center text-blue-600/100">
        <h1>Quora Clone</h1>
        {topicsData?.map((topic: any, index: number) => (
          <>
            <p>
              <strong>username: </strong> {topic.user?.username}
            </p>
            <h2 key={index}>{topic.title}</h2>
            <p>{topic.description}</p>
          </>
        ))}
      </div>
    </>
  );
}
