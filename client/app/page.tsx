import { authOptions } from "./api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession(authOptions);
  const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "topics", {
    method: "GET",
    headers: {
      authorization: `Bearer ${session?.backendTokens.accessToken}`,
      "Content-Type": "application/json",
    },
  });
  const { topicsData } = await response.json();
  return (
    <div className="text-center">
      <h1>Quora Clone</h1>
      {topicsData.map((topic: any, index: number) => (
        <>
          <p>
            <strong>username: </strong> {topic.user?.username}
          </p>
          <h2 key={index}>{topic.title}</h2>
          <p>{topic.description}</p>
        </>
      ))}
    </div>
  );
}
