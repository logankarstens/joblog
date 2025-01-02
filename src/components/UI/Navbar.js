import { useContext, useMemo } from "react";
import Link from "next/link"
import UserContext from "@/context/userContext";

export default function Navbar() {
  const ctx = useContext(UserContext);

  const users = useMemo(() => [
    { username: "fleud" },
    { username: "kt" } 
  ]);

  return (
    <div className="w-full py-3 bg-slate-700">
      <div className="container mx-auto px-8 flex gap-5 items-center">
        <Link href="/" className="font-bold">JOBLOG</Link>
        <Link href="/jobs/list" className="pl-4">List</Link>
        <Link href="/jobs/calendar">Calendar</Link>
        <Link href="/jobs/new">New</Link>
        <div className="ml-auto flex gap-3">
          {users.map(user => (
              <button
                key={user.username}
                className={`${ctx.user.username == user.username ? "font-semibold bg-slate-500" : "bg-slate-800"} px-2 py-1 rounded-md`} 
                onClick={() => ctx.setUser(user)}
              >
                {user.username}
              </button>
          ))}
        </div>
      </div>
    </div>
  );
}