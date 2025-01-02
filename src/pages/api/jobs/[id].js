import { connect } from "@/lib/db/db";
import Job from "@/lib/db/models/Job";

export default async function handler(req, res) {
  //Connect to database
  let connected = await connect();
  if (!connected)
    res.status(500).json("Error connecting to database");

  try {
    switch (req.method) {
      //Get the job with the requested ID
      case "GET":
        let jobs = await Job.findOne({ _id: req.query.id });
        res.status(200).json(jobs);
        break;
      //Update the job with the requested ID
      case "PUT":
        const newJob = JSON.parse(req.body);
        const updateResult = await Job.findOneAndUpdate({ _id: req.query.id }, newJob);
        res.status(200).json(updateResult);
        break;
      //Delete the job with the requested ID
      case "DELETE":
        const deleteResult = await Job.findOneAndDelete({ _id: req.query.id });
        res.status(200).json(deleteResult);
        break;
      default:
        res.status(500).json("Method not supported");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json("Error");
  }
}