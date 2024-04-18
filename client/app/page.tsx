"use client";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useSession } from "next-auth/react";
import AddIcon from "@mui/icons-material/Add";
import { useRouter } from "next/navigation";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ProtectedRoute from "../components/ProtectedRoute";
import Image from "next/image";

export default function Home() {
  const [topicsData, setTopicsData] = useState([]);
  const router = useRouter();

  const { data: session } = useSession();

  const fetchData = async () => {
    const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "topics", {
      method: "GET",
      headers: {
        authorization: `Bearer ${session?.backendTokens.accessToken}`,
        "Content-Type": "application/json",
      },
    });
    const { topicsData } = await response.json();
    setTopicsData(topicsData);
  };

  useEffect(() => {
    fetchData();
  }, [session?.backendTokens]);

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_BASE_URL + `topics/${id}`,
        {
          method: "DELETE",
          headers: {
            authorization: `Bearer ${session?.backendTokens.accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.warn("response: ", response);
      fetchData();
    } catch (error) {
      console.error("error: ", error);
    }
  };

  return (
    <ProtectedRoute>
      <Navbar />
      <div className="container mx-auto">
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white text-center p-4">
          Quora Clone
        </h1>
        <div className="flex justify-end mb-4">
          <AddIcon
            fontSize="large"
            onClick={() => router.push("/create-topic")}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          {topicsData?.map((topic: any, index: number) => (
            <div key={index}>
              <a className="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <div className="flex items-center mb-4">
                  <Image
                    className="w-10 h-10 rounded-full"
                    src={topic?.user?.profile_picture}
                    alt="Rounded avatar"
                    width={20}
                    height={20}
                  />
                  <h3 className=" ml-5 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {topic?.user?.username}
                  </h3>
                </div>
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {topic?.title}
                </h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                  {topic?.description}
                </p>
                <div className="flex justify-end mt-1">
                  {session?.user?._id === topic?.user._id && (
                    <>
                      <EditIcon
                        className="text-blue-500 me-3"
                        onClick={() =>
                          router.push(`/create-topic/${topic._id}`)
                        }
                      />
                      <DeleteIcon
                        className="text-red-700"
                        onClick={() => handleDelete(topic._id)}
                      />
                    </>
                  )}
                </div>
              </a>{" "}
            </div>
          ))}
        </div>
      </div>
    </ProtectedRoute>
  );
}
