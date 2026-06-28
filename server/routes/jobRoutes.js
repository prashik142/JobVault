const express = require("express");

const {
    getJobs,
    createJob,
    deleteJob,
} = require("../controllers/jobController");

const router = express.Router();

router.get("/", getJobs);

router.post("/", createJob);

router.delete("/:id", deleteJob);

module.exports = router;