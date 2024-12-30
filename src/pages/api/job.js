import { connect } from "@/db/db";
import Job from "@/db/models/Job";

export default async function handler(req, res) {
  try {
    switch (req.method) {
      case "GET":
        let test;
        if (await connect())
          test = await Job.find();
        console.log(test)  
        res.status(200).json(test)
        break;
      default:
        res.status(500).json("No method found");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json("Error");
  }
}