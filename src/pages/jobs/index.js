import { useEffect, useState } from "react";
import Link from "next/link";

export default function Jobs() {
  const [jobs, setJobs] = useState(null);

  //Methods
  async function loadJobs() {
    let response = await fetch("/api/jobs");
    if (response.status == 200) 
      setJobs(await response.json());
  }

  async function deleteJob(job) {
    let response = await fetch(`/api/jobs/${job._id}`, {
      method: "DELETE"
    });

    if (response.status == 200) 
      loadJobs();
  }

  //Effects
  useEffect(() => { loadJobs(); }, []);

  return (
    <div className="container mx-auto px-8">
      <main className="flex flex-col gap-8 row-start-2 mt-5">
        {jobs == null ? (
          <div>Loading...</div>
        ) : (
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr className="border-b-2 border-gray-800 text-left">
                  <th className="px-6 py-3">Date</th>
                  <th className="px-6 py-3">Title</th>
                  <th className="px-6 py-3">Employer</th>
                  <th className="px-6 py-3 text-end" style={{width: "150px"}}>Actions</th>
                </tr> 
              </thead>
              <tbody>
                {jobs.map(job => (
                  <tr key={job._id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                    <td className="px-6 py-3">{new Date(job.date).toLocaleDateString()}</td>
                    <td className="px-6 py-3">{job.title}</td>
                    <td className="px-6 py-3">{job.employer}</td>
                    <td className="px-6 py-3 font-bold text-end">
                      <Link href={"/jobs/edit/" + job._id}>Edit</Link> &nbsp;&nbsp;
                      <button onClick={() => deleteJob(job)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
