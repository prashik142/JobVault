const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

const {
    getJobs,
    createJob,
    updateJob,
    deleteJob,
    checkJob,
    updateStatus
} = require("../controllers/jobController");

router.get("/", authMiddleware, getJobs);

router.post("/", authMiddleware, createJob);

router.get("/check", authMiddleware, checkJob);

router.put("/:id", authMiddleware, updateJob);

router.put("/:id/status", authMiddleware, updateStatus);

router.delete("/:id", authMiddleware, deleteJob);

module.exports = router;