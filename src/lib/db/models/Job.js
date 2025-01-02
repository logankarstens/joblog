import mongoose from  "mongoose";

const JobSchema = new mongoose.Schema({
  date: { type: Number, required: true },
  title: { type: String, required: true },
  employer: { type: String, required: true },
  postingURL: { type: String, required: false },
  user: { type: String, required: true }
});


const job = mongoose.models?.jobs || mongoose.model('jobs', JobSchema);
export default job;