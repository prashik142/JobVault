const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// GET ALL JOBS
const getJobs = async (req, res) => {
  try {
    const jobs = await prisma.job.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json(jobs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch jobs" });
  }
};

// CREATE JOB
const createJob = async (req, res) => {
  try {
    const { company, title, location, status } = req.body;

    const job = await prisma.job.create({
      data: {
        company,
        title,
        location,
        status,
      },
    });

    res.status(201).json(job);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create job" });
  }
};
const updateJob = async (req, res) => {
  try {
    const { company, title, location, status } = req.body;

    const job = await prisma.job.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        company,
        title,
        location,
        status,
      },
    });

    res.json(job);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to update job",
    });
  }
};
// DELETE JOB
const deleteJob = async (req, res) => {
  try {
    await prisma.job.delete({
      where: {
        id: Number(req.params.id),
      },
    });

    res.json({
      message: "Job deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete job" });
  }
};

module.exports = {
  getJobs,
  createJob,
  updateJob,
  deleteJob,
};