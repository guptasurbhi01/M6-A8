const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = 3000;

app.use(bodyParser.json());

let jobs = [];
let idCounter = 1;

app.post("/jobs", (req, res) => {
  const { title, description, company } = req.body;
  const newJob = {
    id: idCounter++,
    title,
    description,
    company,
    createdAt: new Date(),
  };
  jobs.push(newJob);
  res.status(201).json(newJob);
});

app.put("/jobs/:id", (req, res) => {
  const { id } = req.params;
  const { title, description, company } = req.body;
  const jobIndex = jobs.findIndex((job) => job.id === parseInt(id));

  if (jobIndex === -1) {
    return res.status(404).json({ message: "Job not found" });
  }

  jobs[jobIndex] = {
    ...jobs[jobIndex],
    title,
    description,
    company,
    updatedAt: new Date(),
  };

  res.json(jobs[jobIndex]);
});

app.delete("/jobs/:id", (req, res) => {
  const { id } = req.params;
  const jobIndex = jobs.findIndex((job) => job.id === parseInt(id));

  if (jobIndex === -1) {
    return res.status(404).json({ message: "Job not found" });
  }

  const deletedJob = jobs.splice(jobIndex, 1);
  res.json(deletedJob[0]);
});

app.get("/jobs", (req, res) => {
  res.json(jobs);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
