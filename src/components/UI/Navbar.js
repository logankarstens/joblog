import Link from 'next/link'

export default function Navbar() {
  return (
    <div className="w-full py-3 bg-slate-700">
      <div className="container mx-auto px-8 flex gap-5">
        <Link href="/" className="font-bold">JOBLOG</Link>
        <Link href="/jobs/list" className="pl-4">List</Link>
        <Link href="/jobs/calendar">Calendar</Link>
      </div>
    </div>
  );
}