import { useEffect, useMemo, useState } from 'react';

export default function JobEditor({ _id }) {
  
  //Job field states
  const [id, setID] = useState(null);
  const [title, setTitle] = useState("");
  const [employer, setEmployer] = useState("");
  const [postingURL, setPostingURL] = useState("");

  //Save progress states
  const [currentError, setCurrentError] = useState(null);
  const [saveState, setSaveState] = useState(null); //null, "saving", "saved"

  //Methods
  const getValidationError = () => {
    let result = null;
    if (title.length < 1)
      result = "Please enter a valid job title.";
    else if (employer.length < 1)
      result = "Please enter a valid job employer.";

    setCurrentError(result)
    return result;
  }

  const loadJob = async (_id) => {
    let response = await fetch(`/api/jobs/${_id}`);
      if (response.status == 200) {
        let job = await response.json();
        setID(job._id);
        setTitle(job.title);
        setEmployer(job.employer);
        setPostingURL(job.postingURL ?? "");
      } else {
        setCurrentError("Error loading job. Please refresh the page.");
      }
  }

  const saveJob = async () => {
    if (getValidationError() != null) return;

    setSaveState("saving");

    let route = id ? `/api/jobs/${id}` : "/api/jobs",
        method = id ? "PUT" : "POST";

    const response = await fetch(route, {
      method: method,
      body: JSON.stringify({
        _id: id,
        date: Date.now(),
        title: title,
        employer: employer,
        postingURL: postingURL.length ? postingURL : null
      })
    });

    if (response.status == 200) {
      setSaveState("saved");
    } else {
      setCurrentError("An error occured while saving the job.");
      setSaveState(null);
    }
  }

  //Effects
  useEffect(() => {
    if (_id != null)
      loadJob(_id)
  }, [id])

  //Memos
  const saveButtonText = useMemo(() => {
    switch (saveState) {
      case "saving": return "Saving...";
      case "saved": return "Saved!";
      default: return "Save";
    }
  }, [saveState]);

  return (
    <div className="flex flex-col gap-6 row-start-2 mt-6">
      <h1 className="font-semibold text-xl">{id ? "Edit" : "New"} Job</h1>

      <hr className="mb-1" />

      <div>
        {(currentError != null) && (
          <div className="bg-red-800 bg-opacity-30 text-red-200 px-4 py-2 mb-4 rounded-lg">
            {currentError}
          </div>
        )}

        <div className="flex flex-wrap gap-3 mb-4">
          <div className="flex flex-grow gap-3">
          <label>Title: </label>
          <input value={title} onInput={e => setTitle(e.target.value)} className="flex-grow px-2 bg-zinc-800 focus:bg-gray-800 focus:outline-none"></input>
          </div>
          <div className="flex flex-grow gap-3">
          <label>Employer: </label>
          <input value={employer} onInput={e => setEmployer(e.target.value)} className="flex-grow px-2 bg-zinc-800 focus:bg-gray-800 focus:outline-none"></input>
          </div>
        </div>

        <div className="flex gap-3">
          <label>Link to job posting: </label>
          <input value={postingURL} onInput={e => setPostingURL(e.target.value)} className="flex-grow px-2 bg-zinc-800 focus:bg-gray-800 focus:outline-none"></input>
        </div>
      </div>

      <hr className="my-1" />

      <button 
        onClick={saveJob}
        disabled={saveState}
        className="bg-slate-700 hover:bg-slate-600 disabled:bg-zinc-600 disabled:cursor-not-allowed transition-all rounded-lg px-4 py-1 w-fit"
      >
        {saveButtonText}
      </button>
    </div>
  );
}