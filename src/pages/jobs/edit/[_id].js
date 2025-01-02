import { useEffect, useState } from "react";
import JobEditor from "@/components/Content/JobEditor";
import { useRouter } from "next/router";

export default function EditJob() {
  const router = useRouter();
  const [jobID, setJobID] = useState(null); 

  useEffect(() => {
    if (router.isReady && router.query._id)
      setJobID(router.query._id);
  }, [router.isReady, router.query._id]);

  return (
    <div className="container mx-auto px-8 max-w-4xl">
      <main>
        {jobID ? (<JobEditor _id={jobID.length ? jobID : null}></JobEditor>) : <span>Loading...</span>}
      </main>
    </div>
  );
}