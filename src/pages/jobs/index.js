import { useEffect, useState } from "react";

export default function Jobs() {
  const [jobs, setJobs] = useState(null);

  useEffect(() => {
    async function fetchJobs() {
      let response = await fetch("/api/job");
      if (response.status == 200) 
        setJobs(await response.json());
    }

    fetchJobs();
  
  }, []);

  return (
    <div className="container mx-auto px-8">
      <main className="flex flex-col gap-8 row-start-2">
        {jobs == null ? (
          <div>Loading...</div>
        ) : (
          <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr className="border-b-2 border-gray-800 text-left">
                  <th className="px-6 py-3">Date</th>
                  <th className="px-6 py-3">Title</th>
                  <th className="px-6 py-3">Employer</th>
                </tr> 
              </thead>
              <tbody>
                {jobs.map(job => (
                  <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                    <td className="px-6 py-3">{job.date}</td>
                    <td className="px-6 py-3">{job.title}</td>
                    <td className="px-6 py-3">{job.employer}</td>
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
