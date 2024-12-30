import mongoose from  "mongoose";

const JobSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  employer: {
    type: String,
    required: true
  }
});


const job = mongoose.models?.jobs || mongoose.model('jobs', JobSchema);
export default job;