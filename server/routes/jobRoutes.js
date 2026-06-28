const express = require("express");

const router = express.Router();
const {
  getJobs,
  createJob,
  updateJob,
  deleteJob,
} = require("../controllers/jobController");;

router.get("/", getJobs);
router.post("/", createJob);
router.delete("/:id", deleteJob);
router.put("/:id", updateJob);
module.exports = router;