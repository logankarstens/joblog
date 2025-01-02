import { useContext } from "react";
import UserContext from "@/context/userContext";

export default function Home() {
  const ctx = useContext(UserContext);
  return (
    <div className={`container mx-auto px-8`}>
      <main className="flex flex-col gap-8 row-start-2 mt-20">
        <h1 className="font-semibold text-5xl m-0">
          Welcome back to job log,
          <span className="font-extrabold"> {ctx.user.username}.</span>
        </h1>
      </main>
    </div>
  );
}
