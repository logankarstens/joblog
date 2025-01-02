import { getSession } from "@/lib/session";

import { connect } from "@/lib/db/db";
import Job from "@/lib/db/models/Job";


export default async function handler(req, res) {
  const session = await getSession(req, res);
  let connected = await connect();
  if (!connected)
    res.status(500).json("Error connecting to database");

  try {
    switch (req.method) {
      case "GET":
        let jobs = await Job.find({ user: session.user.username });
        res.status(200).json(jobs);
        break;
      case "POST":
        const newJob = JSON.parse(req.body);

        console.log ({
          ...newJob,
          user: session.user.username
        });
        const result = await Job.create({
          ...newJob,
          user: session.user.username
        });
        res.status(200).json(result);
        break;
      default:
        res.status(500).json("Method not supported");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json("Error");
  }
};