let jobs = [];

const getJobs = (req, res) => {
    res.json(jobs);
};

const createJob = (req, res) => {
    const job = {
        id: Date.now(),
        ...req.body,
    };

    jobs.push(job);

    res.status(201).json(job);
};

const deleteJob = (req, res) => {
    const id = Number(req.params.id);

    jobs = jobs.filter(job => job.id !== id);

    res.json({
        message: "Job deleted successfully"
    });
};

module.exports = {
    getJobs,
    createJob,
    deleteJob,
};